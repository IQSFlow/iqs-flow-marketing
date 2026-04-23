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

const ALLOWED_ORIGINS = new Set([
  "https://iqsflow.com",
  "https://www.iqsflow.com",
]);

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

// ---------- Gmail send via DWD ---------------------------------------------

let gmailClientCache = null;

async function getGmailClient() {
  if (gmailClientCache) return gmailClientCache;
  const impersonate = process.env.IMPERSONATE_USER;
  if (!impersonate) throw new Error("IMPERSONATE_USER not configured");
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
    clientOptions: { subject: impersonate },
  });
  const authClient = await auth.getClient();
  gmailClientCache = google.gmail({ version: "v1", auth: authClient });
  return gmailClientCache;
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

  // Build email
  const label = FORM_LABEL[formType] || formType;
  const subject = `[iqsflow.com] ${label} — ${data.email}`;
  const bodyLines = [
    `New ${label.toLowerCase()} from iqsflow.com`,
    "",
    ...Object.entries(data).map(([k, v]) => `${k}: ${v || "(empty)"}`),
    "",
    "---",
    `reCAPTCHA score: ${recaptcha.score.toFixed(2)}`,
    `reCAPTCHA action: ${recaptcha.action}`,
    `IP: ${ip}`,
    `User-Agent: ${req.headers["user-agent"] || "(unknown)"}`,
    `Timestamp: ${new Date().toISOString()}`,
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
    console.error("email_send_failed", err, { formType });
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
