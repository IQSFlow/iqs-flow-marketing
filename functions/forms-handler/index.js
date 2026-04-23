/**
 * Cloud Function: marketing-forms-handler
 *
 * Single HTTP endpoint that accepts form submissions from iqsflow.com,
 * verifies reCAPTCHA v3, validates the payload, and emails sales@iqsflow.com
 * via the Gmail API using domain-wide delegation.
 *
 * Routing: the LB URL map routes iqsflow.com/api/forms/submit here.
 *
 * Required env vars:
 *   IMPERSONATE_USER    - Workspace user the SA impersonates to send mail
 *                         (e.g. jhinton@iqsflow.com or noreply@iqsflow.com)
 *   TO_EMAIL            - Destination (sales@iqsflow.com)
 *   RECAPTCHA_SECRET    - Loaded from Secret Manager via deploy, injected as env
 *
 * No persistent DB. Each submission is:
 *   1. emailed to TO_EMAIL as primary record
 *   2. logged as structured JSON to Cloud Logging as searchable backup
 */

const functions = require("@google-cloud/functions-framework");
const { google } = require("googleapis");
const { z } = require("zod");

// ---------- Zod schema ------------------------------------------------------
// One permissive schema for every form type. Every form must supply `email`.
// Any other fields are passed through as strings (length-capped for safety).
// Per-form required fields are enforced client-side via HTML `required` attrs;
// the server only guarantees the shape is safe and the email is valid.

const submissionSchema = z
  .object({
    email: z.string().trim().email().max(200),
  })
  .catchall(z.string().trim().max(5000));

const FORM_LABEL = {
  contact: "Contact request",
  newsletter: "Newsletter signup",
  "job-intern": "Job application (Intern)",
  "job-junior": "Job application (Junior)",
  "job-sales": "Job application (Sales)",
};

const ALLOWED_FORM_TYPES = new Set(Object.keys(FORM_LABEL));

// Pretty labels for the email body. Anything not listed falls back to a
// camelCase-to-spaced-Title-Case humanization.
const FIELD_LABEL = {
  email: "Email",
  firstName: "First name",
  lastName: "Last name",
  organization: "Organization",
  role: "Role",
  message: "Message",
  position: "Position",
  resumeUrl: "Resume URL",
  portfolioUrl: "Portfolio URL",
  linkedin: "LinkedIn",
  github: "GitHub",
};

function humanizeFieldKey(key) {
  if (FIELD_LABEL[key]) return FIELD_LABEL[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

const ALLOWED_ORIGINS = new Set([
  "https://iqsflow.com",
  "https://www.iqsflow.com",
]);

// ---------- Per-IP rate limiter --------------------------------------------
// In-memory window; each Cloud Function instance keeps its own map. With
// max-instances=10 the worst-case effective ceiling is ~10x the per-instance
// limit, which is still an order of magnitude below any legitimate use.
// Cleanup runs opportunistically to keep memory bounded.

const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX_PER_IP = 5; // per instance per window
const rateLimits = new Map();

function checkRateLimit(ip) {
  if (!ip) return { allowed: true, remaining: RATE_MAX_PER_IP };
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimits.set(ip, { count: 1, windowStart: now });
    cleanupRateMap(now);
    return { allowed: true, remaining: RATE_MAX_PER_IP - 1 };
  }
  if (entry.count >= RATE_MAX_PER_IP) {
    const retryAfterMs = RATE_WINDOW_MS - (now - entry.windowStart);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }
  entry.count++;
  return { allowed: true, remaining: RATE_MAX_PER_IP - entry.count };
}

function cleanupRateMap(now) {
  if (rateLimits.size < 1000) return;
  for (const [key, entry] of rateLimits.entries()) {
    if (now - entry.windowStart > RATE_WINDOW_MS) rateLimits.delete(key);
  }
}

// ---------- reCAPTCHA v3 ----------------------------------------------------

async function verifyRecaptcha(token, remoteIp) {
  if (!process.env.RECAPTCHA_SECRET) {
    throw new Error("RECAPTCHA_SECRET not configured");
  }
  const body = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET,
    response: token,
  });
  if (remoteIp) body.append("remoteip", remoteIp);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json();
  return {
    success: data.success === true,
    score: typeof data.score === "number" ? data.score : 0,
    action: data.action || "",
    hostname: data.hostname || "",
    errorCodes: data["error-codes"] || [],
  };
}

// ---------- Gmail send via DWD (IAM Credentials signJwt flow) --------------
//
// Cloud Functions Gen 2 gets ADC from the metadata server, which doesn't
// expose the SA's private key. google-auth-library's `clientOptions.subject`
// silently produces a non-impersonated SA token in that environment instead
// of a DWD-impersonated user token, which made gmail.users.messages.send
// fail with a bare `failedPrecondition` (SAs can't have Gmail mailboxes).
//
// To impersonate a Workspace user without a downloaded key, sign a DWD JWT
// via the IAM Credentials API, then exchange it at the OAuth2 token endpoint.
// Required IAM: SA must hold roles/iam.serviceAccountTokenCreator on itself.

const SA_EMAIL =
  "marketing-forms@crested-booking-488922-f7.iam.gserviceaccount.com";
const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.send";

async function getImpersonatedAccessToken(impersonate) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/iam"],
  });
  const authClient = await auth.getClient();

  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: SA_EMAIL,
    sub: impersonate,
    scope: GMAIL_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const signRes = await authClient.request({
    url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${encodeURIComponent(SA_EMAIL)}:signJwt`,
    method: "POST",
    data: { payload: JSON.stringify(claims) },
  });
  const signedJwt = signRes.data.signedJwt;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error(
      `dwd_token_exchange_failed: ${JSON.stringify(tokenData)}`
    );
  }
  return tokenData.access_token;
}

async function getGmailClient() {
  const impersonate = process.env.IMPERSONATE_USER;
  if (!impersonate) throw new Error("IMPERSONATE_USER not configured");
  const accessToken = await getImpersonatedAccessToken(impersonate);
  const oauth2 = new google.auth.OAuth2();
  oauth2.setCredentials({ access_token: accessToken });
  return google.gmail({ version: "v1", auth: oauth2 });
}

function base64urlEncode(str) {
  return Buffer.from(str, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendEmail({ to, replyTo, subject, body }) {
  const gmail = await getGmailClient();
  const from = process.env.IMPERSONATE_USER;
  const lines = [
    `From: IQS Flow <${from}>`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    body,
  ].filter(Boolean);
  const raw = base64urlEncode(lines.join("\r\n"));
  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}

// ---------- Handler ---------------------------------------------------------

functions.http("handler", async (req, res) => {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.has(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  // Extract payload
  const body = typeof req.body === "object" && req.body !== null ? req.body : {};
  const { form_type: formType, token, ...fields } = body;

  if (!formType || typeof formType !== "string") {
    res.status(400).json({ error: "missing_form_type" });
    return;
  }
  if (!ALLOWED_FORM_TYPES.has(formType)) {
    res.status(400).json({ error: "unknown_form_type" });
    return;
  }
  if (!token || typeof token !== "string") {
    res.status(400).json({ error: "missing_recaptcha_token" });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() ||
    req.ip ||
    "";

  // Rate limit per IP (before spending a reCAPTCHA API call)
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    console.warn("rate_limited", { ip, retryAfterSeconds: rl.retryAfterSeconds });
    res.set("Retry-After", String(rl.retryAfterSeconds));
    res.status(429).json({ error: "rate_limited", retry_after_seconds: rl.retryAfterSeconds });
    return;
  }

  // Verify reCAPTCHA
  let recaptcha;
  try {
    recaptcha = await verifyRecaptcha(token, ip);
  } catch (err) {
    console.error("recaptcha_verify_failed", err);
    res.status(500).json({ error: "recaptcha_unavailable" });
    return;
  }
  if (!recaptcha.success || recaptcha.score < 0.5) {
    console.warn("recaptcha_rejected", {
      formType,
      score: recaptcha.score,
      action: recaptcha.action,
      errorCodes: recaptcha.errorCodes,
    });
    res.status(400).json({ error: "failed_bot_check" });
    return;
  }

  // Validate payload
  const parsed = submissionSchema.safeParse(fields);
  if (!parsed.success) {
    res.status(400).json({
      error: "invalid_payload",
      details: parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
    return;
  }
  const data = parsed.data;

  // Build email — keep subject ASCII so we don't need RFC 2047 encoding.
  const label = FORM_LABEL[formType] || formType;
  const rolePrefix = data.role
    ? `[${data.role.charAt(0).toUpperCase()}${data.role.slice(1)}] `
    : "";
  const subject = `${rolePrefix}${label} from ${data.email}`;
  // Sales-facing body. Audit metadata (reCAPTCHA score, IP, UA, timestamp)
  // stays in Cloud Logging via the structured `form_submission` log below.
  const bodyLines = [
    `New ${label.toLowerCase()} from iqsflow.com.`,
    "",
    ...Object.entries(data).map(
      ([k, v]) => `${humanizeFieldKey(k)}: ${v || "(empty)"}`
    ),
  ];

  // Send
  try {
    await sendEmail({
      to: process.env.TO_EMAIL || "sales@iqsflow.com",
      replyTo: data.email,
      subject,
      body: bodyLines.join("\n"),
    });
  } catch (err) {
    // Dump the full Gmail error response — Node's util.inspect truncates
    // err.response.data to `[Object]` at depth 2, hiding the details[] array
    // that names the actual precondition (e.g. "Mail service not enabled").
    const gmailErrorDetails = err?.response?.data
      ? JSON.stringify(err.response.data, null, 2)
      : null;
    console.error("email_send_failed", {
      formType,
      impersonate: process.env.IMPERSONATE_USER,
      message: err?.message,
      code: err?.code,
      status: err?.response?.status,
      gmailError: gmailErrorDetails,
    });
    // Still log the submission so it's not lost
    console.log("form_submission_unsent", {
      formType,
      fields: data,
      recaptchaScore: recaptcha.score,
    });
    res.status(500).json({ error: "email_failed" });
    return;
  }

  // Structured backup log
  console.log("form_submission", {
    formType,
    fields: data,
    recaptchaScore: recaptcha.score,
    ip,
  });

  res.status(200).json({ ok: true });
});
