#!/usr/bin/env node
/**
 * Checks the public legal pages that the App Store and Google Play listings link to:
 *   /privacy/          privacy policy (with the mobile app section)
 *   /subprocessors/    service providers that process personal data
 *   /delete-account/   account deletion instructions (Google Play requirement)
 * plus the site footer they render (assets/shared.js) and the /terms/ page they link to.
 *
 * No dependencies. The site has no build step, so this is its lint for these pages.
 *
 *   node scripts/check-legal-pages.mjs                  # check ./site
 *   node scripts/check-legal-pages.mjs <site-root>      # check another copy of site/
 *   node scripts/check-legal-pages.mjs --publish        # also fail on any TODO(Josh), draft notice or missing sign-off
 *   node scripts/check-legal-pages.mjs --signoff=<file> # read sign-off facts from another file (the tests use this)
 *
 * Facts that nothing in the code can confirm (the legal entity, counsel review, the
 * deletion process, the app version on the fleet) live in scripts/legal-signoff.json.
 * --publish fails while any of them is null.
 *
 * Run it with --publish before pushing a v3.x tag that ships these pages.
 * Tests: node --test scripts/check-legal-pages.test.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const publishMode = args.includes("--publish");
const signoffArg = args.find((a) => a.startsWith("--signoff="))?.slice("--signoff=".length);
const rootArg = args.find((a) => !a.startsWith("--"));
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.resolve(rootArg ?? path.join(repoRoot, "site"));
const signoffFile = path.resolve(signoffArg ?? path.join(repoRoot, "scripts", "legal-signoff.json"));
const signoffName = path.basename(signoffFile);

const PAGES = {
  privacy: "privacy/index.html",
  subprocessors: "subprocessors/index.html",
  deleteAccount: "delete-account/index.html",
};

// The company name every repo uses (iqs-flow-shared BRAND.company). Nothing in the
// code confirms the entity type (LLC, Inc.), so the full legal name comes only from
// legalEntity in the sign-off file.
const COMPANY = "Integrity Quality Solutions";
// The company name followed by an entity type.
const TYPED_ENTITY =
  /Integrity Quality Solutions,?\s+(?:L\.?L\.?C\.?|L\.?L\.?P\.?|L\.?P\.?|Inc(?:orporated)?\.?|Corp(?:oration)?\.?|Co\.|Ltd\.?|Limited)(?![A-Za-z])/gi;
const SIGNOFF_KEYS = {
  legalEntity: "the exact legal name and entity type on the Apple seller record and Google Play developer account",
  counselReviewedOn: "the date counsel approved the privacy, subprocessors and delete-account pages",
  deletionProcessLive: "in-app deletion requests must reach privacy@iqsflow.com and a written deletion runbook must exist",
  appVersionWithGates: "the app version on every phone with the scheduled-shift location gate and the Delete my account option",
};
// Named in the old policy but not used anywhere in the IQS Flow code.
const UNUSED_VENDORS = /\bAWS\b|Amazon Web Services|\bSentry\b|\bTwilio\b/i;
// Entity and DPO in the old policy that do not match the App Store seller.
const STALE_IDENTITY = /IQS Flow, Inc\.|Marta Halverson/i;
// "Only during scheduled shifts" is false: event locations (clock-in, task, checklist,
// inspection, issue report, area lookup, map) are recorded for every role at any hour.
// Only the cleaner 3-minute check-in is limited to the scheduled window.
const LOCATION_OVERCLAIM = /\b(?:(?<!not )only|location|phone) during (?:your |a |the |their )?scheduled shifts?/i;
// Coworkers (every WORKER in the tenant) can see a worker's name and latest position.
const COWORKER_LOCATION = /\bco-?workers?\b[^.]*\blocation\b/i;
// Clients see the GPS coordinates where each inspection was submitted.
const CLIENT_LOCATION = /location where (?:the|an|each) inspection was submitted/i;
const EM_DASH = /—|&mdash;|&#8212;|&#x2014;/i;
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

const failures = [];
const notes = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);
const note = (page, msg) => notes.push(`${page}: ${msg}`);

function read(rel) {
  const file = path.join(siteRoot, rel);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

function loadSignoff() {
  if (!existsSync(signoffFile)) {
    fail("sign-off", `missing ${signoffFile}`);
    return {};
  }
  try {
    return JSON.parse(readFileSync(signoffFile, "utf8"));
  } catch (err) {
    fail("sign-off", `${signoffName} is not valid JSON (${err.message})`);
    return {};
  }
}
const signoff = loadSignoff();
const isSet = (v) => v !== null && v !== undefined && !(typeof v === "string" && !v.trim());
const legalEntity = typeof signoff.legalEntity === "string" && signoff.legalEntity.trim() ? signoff.legalEntity.trim() : null;

/** Resolve a root-relative href to a file under siteRoot, the way the static host serves it. */
function resolvesToFile(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return existsSync(path.join(siteRoot, "index.html"));
  const target = path.join(siteRoot, decodeURIComponent(clean));
  if (clean.endsWith("/")) return existsSync(path.join(target, "index.html"));
  if (existsSync(target) && statSync(target).isFile()) return true;
  return existsSync(path.join(target, "index.html"));
}

/** Text between two ids, e.g. one numbered section of the privacy policy. */
function sectionBetween(html, startId, endId) {
  const start = html.indexOf(`id="${startId}"`);
  if (start === -1) return "";
  const end = html.indexOf(`id="${endId}"`, start);
  return end === -1 ? html.slice(start) : html.slice(start, end);
}

/** Tiny tag-balance check: catches unclosed or crossed elements in hand-written HTML. */
function checkTagBalance(page, html) {
  const stripped = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  const stack = [];
  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/?)>/g;
  let m;
  while ((m = tagRe.exec(stripped))) {
    const [raw, nameRaw, selfClose] = m;
    const name = nameRaw.toLowerCase();
    if (name === "!doctype" || VOID.has(name) || selfClose === "/") continue;
    if (raw.startsWith("</")) {
      const open = stack.pop();
      if (open !== name) {
        fail(page, `tag mismatch: found </${name}> but <${open ?? "nothing"}> is open`);
        return;
      }
    } else {
      stack.push(name);
    }
  }
  if (stack.length) fail(page, `unclosed tags: ${stack.join(", ")}`);
}

/**
 * The company must be named; any entity type attached to it must be the confirmed
 * legalEntity; and in publish mode the confirmed legalEntity must appear.
 */
function checkEntity(page, text, { ignoreCase = false } = {}) {
  const norm = (s) => (ignoreCase ? s.toLowerCase() : s).replace(/\s+/g, " ");
  // A sentence can end right after the entity ("... Solutions LLC."), so a final
  // period is not part of the comparison.
  const bare = (s) => norm(s).replace(/\.$/, "");
  if (!norm(text).includes(norm(COMPANY))) fail(page, `does not name the company "${COMPANY}"`);
  for (const [typed] of text.matchAll(TYPED_ENTITY)) {
    if (!legalEntity || bare(typed) !== bare(legalEntity)) {
      fail(page, `names the entity as "${typed}", which is not the confirmed legalEntity in ${signoffName}`);
    }
  }
  if (publishMode && legalEntity && !norm(text).includes(norm(legalEntity))) {
    fail(page, `does not name the confirmed legal entity "${legalEntity}"`);
  }
}

function checkTodos(page, text) {
  const todos = (text.match(/TODO\(Josh\)/g) ?? []).length;
  note(page, `${todos} TODO(Josh) item(s) open`);
  if (publishMode && todos > 0) fail(page, `${todos} TODO(Josh) item(s) must be resolved before publishing`);
}

function checkCommon(page, html) {
  if (EM_DASH.test(html)) fail(page, "contains an em dash (customer copy must not use them)");
  if (STALE_IDENTITY.test(html)) fail(page, "still names the old entity or DPO (IQS Flow, Inc. / Marta Halverson)");
  checkEntity(page, html);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(page, "missing <title>");
  if (!/<meta name="viewport"/.test(html)) fail(page, "missing viewport meta");

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) fail(page, `duplicate id "${id}"`);
    seen.add(id);
  }
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!seen.has(anchor)) fail(page, `in-page link #${anchor} has no matching id`);
  }
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^/"][^"]*|\/)"/g)) {
    if (!resolvesToFile(href)) fail(page, `internal link ${href} does not resolve to a file in site/`);
  }
  checkTagBalance(page, html);

  checkTodos(page, html);
  if (publishMode && html.includes('class="legal-draft"')) fail(page, "draft notice must be removed before publishing");
}

// ---- privacy policy ---------------------------------------------------------
const privacy = read(PAGES.privacy);
if (!privacy) fail("privacy", `missing ${PAGES.privacy}`);
else {
  checkCommon("privacy", privacy);
  if (UNUSED_VENDORS.test(privacy)) fail("privacy", "names AWS, Sentry or Twilio, which IQS Flow does not use");
  if (!privacy.includes('href="/subprocessors/"')) fail("privacy", "does not link to /subprocessors/");
  if (!privacy.includes('href="/delete-account/"')) fail("privacy", "does not link to /delete-account/");
  if (!/id="mobile"/.test(privacy)) fail("privacy", "has no mobile app section");
  if (!/Gemini/.test(privacy)) fail("privacy", "does not disclose Gemini photo analysis");

  // Location: say what the code does, not a tidier story.
  if (!/scheduled shift/i.test(privacy)) fail("privacy", "does not limit the 3-minute check-in to scheduled shifts");
  if (LOCATION_OVERCLAIM.test(privacy)) {
    fail("privacy", "claims location is used only during scheduled shifts, but work-event locations are recorded for every role at any hour");
  }
  if (!/not only during a scheduled shift/i.test(privacy)) {
    fail("privacy", "does not say that work-event locations are recorded outside scheduled shifts too");
  }
  if (!/about every 3 minutes/.test(privacy)) fail("privacy", "does not describe the 3-minute location check-in");
  if (!/never collects location when (?:the app|it) is closed/i.test(privacy)) {
    fail("privacy", "does not say the app never collects location when it is closed");
  }

  // Who sees location. GET /api/live is open to WORKER and is tenant-wide for that
  // role (iqs-flow-api src/routes/live.ts), and the app's map plots every coworker's
  // name and latest position from it. Clients get each inspection's gpsCoordinates
  // with no visibility flag (src/routes/inspections.ts clientInspectionDTO).
  const mobileSection = sectionBetween(privacy, "mobile", "ai");
  const shareSection = sectionBetween(privacy, "share", "retain");
  if (!COWORKER_LOCATION.test(mobileSection)) {
    fail("privacy", "section 04 does not say coworkers can see your name and location on the app's map");
  }
  if (!COWORKER_LOCATION.test(shareSection)) {
    fail("privacy", "section 07 does not say coworkers can see your name and location on the app's map");
  }
  if (!CLIENT_LOCATION.test(shareSection)) {
    fail("privacy", "section 07 does not say clients can see the location where an inspection was submitted");
  }

  // Deletion: the in-app path and a completion commitment, not just a reply.
  const deletion = sectionBetween(privacy, "delete", "rights");
  if (!/within 30 days/.test(privacy)) fail("privacy", "does not state the 30-day deletion response time");
  if (!/complete deletion within 30 days/i.test(privacy)) fail("privacy", "does not say when deletion is complete (\"complete deletion within 30 days\")");
  if (/respond within 30 days/i.test(privacy)) fail("privacy", "gives only a response time (\"respond within 30 days\"); say when deletion is complete");
  if (/<b>Profile<\/b>|\(Profile,/.test(privacy)) fail("privacy", "tells people to tap Profile, but the app's tab is labelled More");
  if (!/tap <b>More<\/b>/i.test(deletion)) fail("privacy", "section 09 does not tell people to tap More");
  if (!/client account/i.test(deletion)) fail("privacy", "section 09 does not tell client accounts to use email");
}

// ---- subprocessors ----------------------------------------------------------
const subs = read(PAGES.subprocessors);
if (!subs) fail("subprocessors", `missing ${PAGES.subprocessors}`);
else {
  checkCommon("subprocessors", subs);
  // The change log may name the removed vendors; the lists above it may not.
  const changesAt = subs.indexOf('id="changes"');
  const listed = changesAt === -1 ? subs : subs.slice(0, changesAt);
  if (UNUSED_VENDORS.test(listed)) fail("subprocessors", "lists AWS, Sentry or Twilio as a subprocessor");
  for (const required of ["Cloud Run", "Cloud SQL", "Cloud Storage", "Gemini", "Gmail", "Firebase Cloud Messaging", "Expo Push Service", "Google Maps"]) {
    if (!listed.includes(required)) fail("subprocessors", `does not list ${required}`);
  }
}

// ---- account deletion ---------------------------------------------------------
const del = read(PAGES.deleteAccount);
if (!del) fail("delete-account", `missing ${PAGES.deleteAccount}`);
else {
  checkCommon("delete-account", del);
  // "More" is the tab label in the app (tabs.more); no screen shows "Profile".
  for (const required of ["IQS Flow", "<b>More</b>", "Delete my account", "Send request", "privacy@iqsflow.com", "within 30 days"]) {
    if (!del.includes(required)) fail("delete-account", `does not mention "${required}"`);
  }
  if (del.includes("<b>Profile</b>")) fail("delete-account", "tells people to tap Profile, but the app's tab is labelled More");

  const section = (lang) => del.match(new RegExp(`<section[^>]*lang="${lang}"[^>]*>([\\s\\S]*?)<\\/section>`))?.[1] ?? null;
  const en = section("en");
  const es = section("es");
  const fr = section("fr");
  if (!es || !es.includes("Eliminar mi cuenta") || !es.includes("30 d&iacute;as")) {
    fail("delete-account", "missing the Spanish section with the in-app steps and 30-day timeframe");
  }
  if (!fr || !fr.includes("Supprimer mon compte") || !fr.includes("30 jours")) {
    fail("delete-account", "missing the French section with the in-app steps and 30-day timeframe");
  }

  const LANGS = [
    {
      name: "English", text: en,
      tab: "<b>More</b>", wrongTab: "<b>Profile</b>", client: /client account/i,
      complete: /complete deletion within 30 days/i, replyOnly: /respond within 30 days/i,
    },
    {
      name: "Spanish", text: es,
      tab: "<b>M&aacute;s</b>", wrongTab: "<b>Perfil</b>", client: /cuenta de cliente/i,
      complete: /Completamos la eliminaci&oacute;n en un plazo de 30 d&iacute;as/, replyOnly: /Respondemos en un plazo de 30/,
    },
    {
      name: "French", text: fr,
      tab: "<b>Plus</b>", wrongTab: "<b>Profil</b>", client: /compte client/i,
      complete: /Nous terminons la suppression sous 30 jours/, replyOnly: /Nous r&eacute;pondons sous 30 jours/,
    },
  ];
  for (const l of LANGS) {
    if (!l.text) {
      fail("delete-account", `missing the ${l.name} section`);
      continue;
    }
    if (!l.text.includes(l.tab)) fail("delete-account", `${l.name} steps do not say to tap ${l.tab} (the app's tab label)`);
    if (l.text.includes(l.wrongTab)) fail("delete-account", `${l.name} steps say ${l.wrongTab}, a label the app does not show`);
    if (!l.client.test(l.text)) fail("delete-account", `${l.name} section does not tell client accounts to use email`);
    if (!l.complete.test(l.text)) fail("delete-account", `${l.name} section does not say when deletion is complete`);
    if (l.replyOnly.test(l.text)) fail("delete-account", `${l.name} section gives only a response time, not a completion time`);
  }
}

// ---- site footer (rendered on every legal page by assets/shared.js) ----------
const sharedJs = read("assets/shared.js");
if (!sharedJs) fail("shared.js", "missing assets/shared.js");
else {
  if (STALE_IDENTITY.test(sharedJs)) fail("shared.js", "footer still names IQS Flow, Inc., which nothing confirms");
  const copyright = sharedJs.match(/<div class="footer-bottom">\s*<div>([^<]*)<\/div>/)?.[1];
  if (!copyright) fail("shared.js", "cannot find the footer copyright line");
  else checkEntity("shared.js footer", copyright, { ignoreCase: true });
  checkTodos("shared.js", sharedJs);
}

// ---- terms (linked from the privacy policy) ----------------------------------
const terms = read("terms/index.html");
if (terms) {
  if (STALE_IDENTITY.test(terms)) {
    (publishMode ? fail : note)("terms", "names IQS Flow, Inc., a different entity from the legal pages; reconcile it with counsel");
  }
  if (publishMode && legalEntity && !terms.includes(legalEntity)) {
    fail("terms", `does not name the confirmed legal entity "${legalEntity}"`);
  }
}

// ---- other pages that still name the old entity (reported, not failed) -------
function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}
const checked = new Set([...Object.values(PAGES), "terms/index.html"].map((p) => path.join(siteRoot, p)));
if (existsSync(siteRoot)) {
  for (const file of htmlFiles(siteRoot)) {
    if (!checked.has(file) && STALE_IDENTITY.test(readFileSync(file, "utf8"))) {
      note(path.relative(siteRoot, file).split(path.sep).join("/"), "names IQS Flow, Inc.; update it with the confirmed legal entity");
    }
  }
}

// ---- sign-off facts -------------------------------------------------------------
for (const [key, why] of Object.entries(SIGNOFF_KEYS)) {
  if (isSet(signoff[key])) continue;
  if (publishMode) fail("sign-off", `${key} is not set in ${signoffName} (${why})`);
  else note("sign-off", `${key} not set yet`);
}

console.log(`Checked legal pages in ${siteRoot}${publishMode ? " (publish mode)" : ""}`);
for (const n of notes) console.log(`  note  ${n}`);
if (failures.length) {
  for (const f of failures) console.log(`  FAIL  ${f}`);
  console.log(`${failures.length} problem(s) found.`);
  process.exit(1);
}
console.log("All legal page checks passed.");
