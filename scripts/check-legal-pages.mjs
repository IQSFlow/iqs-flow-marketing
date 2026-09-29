#!/usr/bin/env node
/**
 * Checks the public legal pages that the App Store and Google Play listings link to:
 *   /privacy/          privacy policy (with the mobile app section)
 *   /subprocessors/    service providers that process personal data
 *   /delete-account/   account deletion instructions (Google Play requirement)
 * plus the site footer they render (assets/shared.js), the /terms/ page they link to,
 * every page's own copyright line, and the third-party hosts any page loads (each must
 * be listed on /subprocessors/).
 *
 * No dependencies. The site has no build step, so this is its lint for these pages.
 *
 *   node scripts/check-legal-pages.mjs                  # check ./site
 *   node scripts/check-legal-pages.mjs <site-root>      # check another copy of site/
 *   node scripts/check-legal-pages.mjs --publish        # also fail on any TODO(Josh), draft notice or missing sign-off
 *   node scripts/check-legal-pages.mjs --signoff=<file> # read sign-off facts from another file (the tests use this)
 *   node scripts/check-legal-pages.mjs --app-locales=<dir>
 *       # also compare the pages with the app's own text: <dir> is the locales/ folder
 *       # (en.json, es.json, fr.json) of the iqs-flow-mobile release that will be on
 *       # every phone. --publish requires it.
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
const appLocalesArg = args.find((a) => a.startsWith("--app-locales="))?.slice("--app-locales=".length);
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
  deletionProcessLive: "in-app deletion requests must reach privacy@iqsflow.com and a written deletion runbook must exist that covers the audit history and deleted work orders",
  appVersionWithGates: "the app version on every phone with the scheduled-shift location gate and the Delete my account option",
};
// Named in the old policy but not used anywhere in the IQS Flow code.
const UNUSED_VENDORS = /\bAWS\b|Amazon Web Services|\bSentry\b|\bTwilio\b/i;
// Entity and DPO in the old policy that do not match the App Store seller.
const STALE_IDENTITY = /IQS Flow, Inc\.|Marta Halverson/i;
// The old entity alone, for the rest of the site. (The blog lists a contributor
// named Marta Halverson; that is blog content, not a legal identity claim.)
const STALE_ENTITY = /IQS Flow, Inc\./i;
// A copyright line and the holder it names, e.g. "© 2026 INTEGRITY QUALITY SOLUTIONS".
const COPYRIGHT = /(?:©|&copy;)\s*\d{4}\s+([^<\n`]+)/g;
// "Only during scheduled shifts" is false: event locations (clock-in, task, checklist,
// inspection, issue report, area lookup, map) are recorded for every role at any hour.
// Only the cleaner 3-minute check-in is limited to the scheduled window.
const LOCATION_OVERCLAIM = /\b(?:(?<!not )only|location|phone) during (?:your |a |the |their )?scheduled shifts?/i;
// Coworkers (every WORKER in the tenant) can see a worker's name and latest position.
const COWORKER_LOCATION = /\bco-?workers?\b[^.]*\blocation\b/i;
// Clients see the GPS coordinates where each inspection was submitted.
const CLIENT_LOCATION = /location where (?:the|an|each) inspection was submitted/i;
// Clients also get live worker positions at their sites: GET /api/live/facility-status
// is open to CLIENT and returns each worker's latest ping from the last 30 minutes
// (lat/lon, capturedAt, userId, and the name unless the vendor turned crewNamesOn off)
// for pings tied to the site (iqs-flow-api src/routes/live.ts).
const CLIENT_LIVE_LOCATION = /\bclients?\b[^.]*\bcan (?:also )?see\b[^.]*\blive positions? of workers\b/i;
// The crew-name setting hides names on inspection results and live positions, never
// the positions or the inspection locations themselves. (Section 07 must not say the
// employer can hide names everywhere: see CLIENT_REQUEST_ASSIGNEE.)
const CLIENT_CANNOT_HIDE_LOCATION = /\b(?:cannot|can not|can(?:&rsquo;|'|’)t) hide (?:the |their )?locations\b|\bbut not locations\b/i;
// The crew-name setting does not reach the client service-request and complaint
// register: GET /api/client/service-requests and /:id return assignee { id, name }
// without reading crewNamesOn (iqs-flow-api src/routes/client-requests.ts LIST_SELECT,
// toListItem), and the client portal shows that name on /client-portal/tickets, each
// request and each site's open requests. Remove this rule if the api starts applying
// the setting there.
const CLIENT_REQUEST_ASSIGNEE =
  /\b(?:cannot|can not|can(?:&rsquo;|'|’)t) hide the name of the (?:person|worker) assigned to (?:a|each|their) service requests?\b/i;
// The audit log is append-only in the database (migration 20260602182654_audit_log_immutable)
// and holds names, emails and phone numbers, so a deletion cannot remove them.
const AUDIT_HISTORY = /audit history/i;
// The audit history is not the only store kept after deletion. Deleting any work order
// writes a full copy of the row (GPS, description, notes, the people's user IDs) to
// work_order_deletions, which is append-only and has no FK, so it survives even the
// tenant delete; a non-test EMERGENCY work order cannot be deleted at all without a
// break-glass setting (iqs-flow-api migration 20260928150000_next_batch, live since
// prod-v6.3.0). Per language: deleted work orders are kept, emergency reports cannot be
// deleted, and no wording that presents one store as the only exception.
const KEPT_AFTER_DELETION = {
  en: {
    tombstone: /deleted work orders/i,
    emergency: /emergency reports cannot be deleted/i,
    soleException: /\bone exception\b|\bis the exception\b|\bthe only exception\b/i,
  },
  es: {
    tombstone: /(?:&oacute;|ó)rdenes de trabajo eliminadas/i,
    emergency: /reportes de emergencia no se pueden eliminar/i,
    soleException: /\buna excepci(?:&oacute;|ó)n\b|\bla (?:&uacute;|ú)nica excepci(?:&oacute;|ó)n\b/i,
  },
  fr: {
    tombstone: /ordres de travail supprim(?:&eacute;|é)s/i,
    emergency: /signalements d(?:&rsquo;|'|’)urgence ne peuvent pas (?:&ecirc;|ê)tre supprim/i,
    soleException: /\bune exception\b|\bla seule exception\b/i,
  },
};
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

/**
 * What the page will say once published: TODO(Josh) notes are removed before then, so
 * a disclosure that only appears inside one does not count.
 */
const withoutTodos = (html) => html.replace(/<span class="todo">[\s\S]*?<\/span>/g, "");

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
  // Clients get live worker positions (GET /api/live/facility-status, open to CLIENT).
  // Each place a reader looks for "who sees my location" must say so.
  const claims = withoutTodos(privacy);
  const clientLiveSpots = [
    ["section 01", sectionBetween(claims, "summary", "who")],
    ["section 04's Location permission row", claims.match(/<tr><td>Location \(while using the app\)<\/td>[\s\S]*?<\/tr>/)?.[0] ?? ""],
    ["section 04's \"Who can see it\"", claims.match(/<li><b>Who can see it\.<\/b>[\s\S]*?<\/li>/)?.[0] ?? ""],
    ["section 07", sectionBetween(claims, "share", "retain")],
  ];
  for (const [where, text] of clientLiveSpots) {
    if (!CLIENT_LIVE_LOCATION.test(text)) {
      fail("privacy", `${where} does not say your employer's clients can see the live position of workers at their sites`);
    }
  }
  const shareClaims = sectionBetween(claims, "share", "retain");
  if (!CLIENT_CANNOT_HIDE_LOCATION.test(shareClaims)) {
    fail("privacy", "section 07 does not say your employer cannot hide locations from clients");
  }
  if (!CLIENT_REQUEST_ASSIGNEE.test(shareClaims)) {
    fail(
      "privacy",
      "section 07 does not say your employer cannot hide the name of the person assigned to a client's service request or complaint (clients see it whatever the crew-name setting says)",
    );
  }

  // Nothing strips photo EXIF: expo-image-picker copies the GPS tags on Android and
  // the API stores and serves the original file (and sends its bytes to Gemini).
  if (!/location stays in the photo file/i.test(mobileSection)) {
    fail("privacy", "section 04 does not say a location saved by the phone's camera stays in uploaded photos");
  }
  // The session token and photo-queue list are in expo-secure-store, which is the
  // iOS Keychain and survives uninstall.
  if (/Deleting the app removes these from your phone/i.test(privacy)) {
    fail("privacy", "says deleting the app removes everything from the phone, but on iPhone the secure storage (Keychain) remains");
  }
  if (!/On iPhone,[^.]*\bremain/i.test(mobileSection)) {
    fail("privacy", "section 04 does not say what can remain on an iPhone after the app is deleted");
  }
  // expo-updates sends a persistent EAS-Client-ID with every update check.
  if (!/installation ID/i.test(mobileSection)) {
    fail("privacy", "section 04 does not say Expo receives the app's installation ID");
  }

  // Gemini: photos are scored on upload as well as on submit (attachments.ts), and
  // the client portal assistant sends an assembled data summary (ai.ts /api/ai/chat).
  const aiSection = sectionBetween(privacy, "ai", "use");
  if (!/\buploaded\b/i.test(aiSection)) fail("privacy", "section 05 does not say photos are scored when they are uploaded");
  if (!/client portal assistant/i.test(aiSection)) {
    fail("privacy", "section 05 does not describe the client portal assistant and the data summary it sends to Gemini");
  }

  // Deletion: the in-app path and a completion commitment, not just a reply.
  const deletion = sectionBetween(privacy, "delete", "rights");
  if (!/within 30 days/.test(privacy)) fail("privacy", "does not state the 30-day deletion response time");
  if (!/complete deletion within 30 days/i.test(privacy)) fail("privacy", "does not say when deletion is complete (\"complete deletion within 30 days\")");
  if (/respond within 30 days/i.test(privacy)) fail("privacy", "gives only a response time (\"respond within 30 days\"); say when deletion is complete");
  if (/<b>Profile<\/b>|\(Profile,/.test(privacy)) fail("privacy", "tells people to tap Profile, but the app's tab is labelled More");
  if (!/tap <b>More<\/b>/i.test(deletion)) fail("privacy", "section 09 does not tell people to tap More");
  if (!/client account/i.test(deletion)) fail("privacy", "section 09 does not tell client accounts to use email");

  const retention = sectionBetween(privacy, "retain", "delete");
  // The daily cleanup deletes location_events older than 30 days (src/routes/cron.ts).
  if (!/<tr><td>Location check-ins<\/td>\s*<td>[^<]*\b30 days\b/i.test(retention)) {
    fail("privacy", "section 08 does not give the 30-day period for location check-ins");
  }
  // A row in the retention table, not just a passing mention.
  if (!/<tr><td>[^<]*audit history[^<]*<\/td>/i.test(retention)) {
    fail("privacy", "section 08 has no row for the security audit history, which keeps names and contact details after deletion");
  }
  // Deleting a work order keeps a permanent copy of it (work_order_deletions).
  const retentionClaims = withoutTodos(retention);
  if (!/<tr><td>[^<]*deleted work orders[^<]*<\/td>/i.test(retentionClaims)) {
    fail("privacy", "section 08 has no row for copies of deleted work orders, which keep their location and notes with no end date");
  }
  const recordRow = retentionClaims.match(/<tr><td>Locations saved with a record[\s\S]*?<\/tr>/i)?.[0];
  if (recordRow && !/<\/td>\s*<td>[\s\S]*deleted work orders/i.test(recordRow)) {
    fail("privacy", "section 08 says a location saved with a record is kept only as long as the record, but deleting a work order keeps a copy of it");
  }
  if (!KEPT_AFTER_DELETION.en.emergency.test(retentionClaims)) {
    fail("privacy", "section 08 does not say emergency reports cannot be deleted");
  }
  if (KEPT_AFTER_DELETION.en.soleException.test(withoutTodos(privacy))) {
    fail("privacy", "presents one store as the only thing kept after deletion, but the audit history and copies of deleted work orders are both kept");
  }
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
  for (const required of [
    "Cloud Run", "Cloud SQL", "Cloud Storage", "Gemini", "Gmail", "Firebase Cloud Messaging", "Expo Push Service", "Google Maps",
    // iPhone maps use MapKit (map.tsx provider is Google on Android only).
    "Apple Maps",
    // EAS Update receives a persistent EAS-Client-ID.
    "installation ID",
    // The client portal assistant sends Gemini an assembled data summary.
    "client portal assistant",
  ]) {
    if (!listed.includes(required)) fail("subprocessors", `does not list ${required}`);
  }
  // Directions send the phone's current coordinates to the Google Routes API
  // (map.tsx /api/routes/between?origin=..., map-routes.ts).
  if (!/<td>Google Maps Platform<\/td><td>[^<]*current location/i.test(listed)) {
    fail("subprocessors", "the Google Maps Platform row does not say directions start from the phone's current location");
  }
}

// ---- account deletion ---------------------------------------------------------
/** The English, Spanish and French sections of /delete-account/, for the app-text check. */
let deleteSections = {};
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
      name: "English", lang: "en", text: en,
      tab: "<b>More</b>", wrongTab: "<b>Profile</b>", client: /client account/i,
      complete: /complete deletion within 30 days/i, replyOnly: /respond within 30 days/i,
      audit: AUDIT_HISTORY,
    },
    {
      name: "Spanish", lang: "es", text: es,
      tab: "<b>M&aacute;s</b>", wrongTab: "<b>Perfil</b>", client: /cuenta de cliente/i,
      complete: /Completamos la eliminaci&oacute;n en un plazo de 30 d&iacute;as/, replyOnly: /Respondemos en un plazo de 30/,
      audit: /historial de auditor(?:&iacute;|í)a/i,
    },
    {
      name: "French", lang: "fr", text: fr,
      tab: "<b>Plus</b>", wrongTab: "<b>Profil</b>", client: /compte client/i,
      complete: /Nous terminons la suppression sous 30 jours/, replyOnly: /Nous r&eacute;pondons sous 30 jours/,
      audit: /historique d(?:&rsquo;|'|’)audit/i,
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
    if (!l.audit.test(l.text)) {
      fail("delete-account", `${l.name} section does not say the security audit history keeps some details (it cannot be changed or deleted)`);
    }
    const kept = KEPT_AFTER_DELETION[l.lang];
    const claims = withoutTodos(l.text);
    if (!kept.tombstone.test(claims)) {
      fail("delete-account", `${l.name} section does not say copies of deleted work orders are kept (with their location and notes)`);
    }
    if (!kept.emergency.test(claims)) fail("delete-account", `${l.name} section does not say emergency reports cannot be deleted`);
    if (kept.soleException.test(claims)) {
      fail("delete-account", `${l.name} section presents one store as the only thing kept after deletion, but deleted work orders are kept too`);
    }
  }
  deleteSections = { en, es, fr };
}

// ---- the app's own text (--app-locales) -----------------------------------------
// The pages quote the app's labels and repeat its promises, so they must match the
// strings on the release that is on every phone (iqs-flow-mobile locales/*.json).
const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", middot: "·",
  rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', laquo: "«", raquo: "»",
  aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú",
  Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú",
  agrave: "à", egrave: "è", ugrave: "ù", Agrave: "À", Egrave: "È",
  acirc: "â", ecirc: "ê", icirc: "î", ocirc: "ô", ucirc: "û",
  euml: "ë", iuml: "ï", uuml: "ü", ntilde: "ñ", Ntilde: "Ñ", ccedil: "ç", Ccedil: "Ç",
  iexcl: "¡", iquest: "¿",
};
/** Page HTML (or an app string) as plain text: tags dropped, entities decoded, quotes straightened. */
function plainText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, e) => {
      if (e[0] === "#") return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
      return NAMED_ENTITIES[e] ?? whole;
    })
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/ /g, " ")
    .replace(/\s+/g, " ");
}
const APP_LANGS = {
  en: {
    name: "English",
    complete: /\b(?:delet|complet)\w*\b[^.]*\bwithin 30 days\b/i,
    replyOnly: /\brespond within 30 days\b/i,
    coworkers: /\bco-?workers?\b/i,
    clients: /\bclients?\b/i,
  },
  es: {
    name: "Spanish",
    complete: /(?:elimin|complet)\w*[^.]*30 d[ií]as/i,
    replyOnly: /responderemos en un plazo de 30/i,
    coworkers: /compa[ñn]er[oa]s/i,
    clients: /\bclientes?\b/i,
  },
  fr: {
    name: "French",
    complete: /(?:supprim|termin)\w*[^.]*30 jours/i,
    replyOnly: /r[ée]pondrons sous 30 jours/i,
    coworkers: /coll[èe]gues/i,
    clients: /\bclients?\b/i,
  },
};
// Labels a person follows to delete their account, as the app shows them.
const APP_LABEL_KEYS = ["tabs.more", "profile.privacyData", "profile.deleteAccount", "profile.sendDeleteRequest", "profile.deleteRequested"];
const lookup = (obj, key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), obj);

function checkAppText(dir) {
  const privacyText = privacy ? plainText(privacy) : "";
  const pageSaysCoworkers = COWORKER_LOCATION.test(privacyText);
  const pageSaysClientsLive = privacy ? CLIENT_LIVE_LOCATION.test(plainText(withoutTodos(privacy))) : false;
  for (const [lang, rule] of Object.entries(APP_LANGS)) {
    const file = path.join(dir, `${lang}.json`);
    if (!existsSync(file)) {
      fail("app", `missing ${file}`);
      continue;
    }
    let strings;
    try {
      strings = JSON.parse(readFileSync(file, "utf8"));
    } catch (err) {
      fail("app", `${lang}.json is not valid JSON (${err.message})`);
      continue;
    }
    const where = `app ${lang}.json`;
    const text = (key) => {
      const v = lookup(strings, key);
      if (typeof v !== "string" || !v.trim()) {
        fail(where, `has no ${key} string`);
        return null;
      }
      return plainText(v).trim();
    };

    const section = deleteSections[lang] ? plainText(deleteSections[lang]) : null;
    for (const key of APP_LABEL_KEYS) {
      const label = text(key);
      if (label && section !== null && !section.includes(label)) {
        fail("delete-account", `${rule.name} steps do not show the app's label "${label}" (${key})`);
      }
    }
    if (lang === "en" && privacy) {
      const deletion = plainText(sectionBetween(privacy, "delete", "rights"));
      for (const key of ["tabs.more", "profile.deleteAccount", "profile.sendDeleteRequest"]) {
        const label = text(key);
        if (label && !deletion.includes(label)) fail("privacy", `section 09 does not show the app's label "${label}" (${key})`);
      }
    }

    const timeframe = text("profile.deleteTimeframe");
    if (timeframe && (!rule.complete.test(timeframe) || rule.replyOnly.test(timeframe))) {
      fail(where, `profile.deleteTimeframe ("${timeframe}") does not promise what /delete-account/ promises: deletion completed within 30 days`);
    }

    const notice = text("locationPermission.body");
    if (notice && pageSaysCoworkers && !rule.coworkers.test(notice)) {
      fail(where, "locationPermission.body does not say coworkers can see your location, but /privacy/ does");
    }
    if (notice && pageSaysClientsLive && !rule.clients.test(notice)) {
      fail(where, "locationPermission.body does not say your employer's clients can see your live position, but /privacy/ does");
    }
  }
}

if (appLocalesArg) checkAppText(path.resolve(appLocalesArg));
else if (publishMode) {
  fail("app", "pass --app-locales=<iqs-flow-mobile>/locales from the release on every phone, so the pages can be compared with the app's own text");
} else {
  note("app", "app text not compared (pass --app-locales=<iqs-flow-mobile>/locales)");
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

// ---- the rest of the site ---------------------------------------------------------
function siteFiles(dir, ext) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...siteFiles(full, ext));
    else if (ext.test(entry.name)) out.push(full);
  }
  return out;
}
const relToSite = (file) => path.relative(siteRoot, file).split(path.sep).join("/");
const allFiles = existsSync(siteRoot) ? siteFiles(siteRoot, /\.(?:html|js|css)$/i) : [];

// Every page's own copyright line must name the same company as the legal pages
// (and, in publish mode, the confirmed legal entity). A page that still names
// IQS Flow, Inc. anywhere fails in publish mode.
const checked = new Set([...Object.values(PAGES), "terms/index.html"].map((p) => path.join(siteRoot, p)));
for (const file of allFiles.filter((f) => f.endsWith(".html") && !checked.has(f))) {
  const rel = relToSite(file);
  const text = readFileSync(file, "utf8");
  if (STALE_ENTITY.test(text)) {
    (publishMode ? fail : note)(rel, "names IQS Flow, Inc., a different entity from the legal pages; use the confirmed legal entity");
  }
  for (const [, holder] of text.matchAll(COPYRIGHT)) checkEntity(`${rel} copyright`, holder.trim(), { ignoreCase: true });
}

// ---- third-party resources the website loads ----------------------------------------
// Each one sees visitors' IP addresses (and may set cookies), so each provider must
// be in the Website table on /subprocessors/. An unknown host fails until it is added
// to THIRD_PARTY_HOSTS and to that table.
const THIRD_PARTY_HOSTS = {
  "fonts.googleapis.com": "Google Fonts",
  "fonts.gstatic.com": "Google Fonts",
  "www.google.com": "reCAPTCHA",
  "www.gstatic.com": "reCAPTCHA",
  "www.recaptcha.net": "reCAPTCHA",
  "cdn.credly.com": "Credly",
  "www.credly.com": "Credly",
};
const RESOURCE_PATTERNS = [
  /<(?:script|iframe|img|link|source|video|audio|embed)\b[^>]*?\s(?:src|href)="https?:\/\/([^/"?#]+)/gi,
  /\sdata-[a-z-]*host="https?:\/\/([^/"?#]+)/gi,
  /\.src\s*=\s*["'`]https?:\/\/([^/"'`?#]+)/gi,
  /url\(\s*["']?https?:\/\/([^/"')?#\s]+)/gi,
  /@import\s+["']https?:\/\/([^/"'?#]+)/gi,
];
const FIRST_PARTY = /(?:^|\.)iqsflow\.com$/i;
const loadedFrom = new Map(); // host -> first file that loads it
for (const file of allFiles) {
  const text = readFileSync(file, "utf8");
  for (const re of RESOURCE_PATTERNS) {
    for (const [, rawHost] of text.matchAll(re)) {
      const host = rawHost.toLowerCase();
      if (!FIRST_PARTY.test(host) && !loadedFrom.has(host)) loadedFrom.set(host, relToSite(file));
    }
  }
}
if (subs) {
  const websiteTable = sectionBetween(subs, "website", "customer");
  for (const [host, file] of loadedFrom) {
    const vendor = THIRD_PARTY_HOSTS[host];
    if (!vendor) {
      fail("site", `${file} loads a resource from ${host}, which this check does not know; add the host to THIRD_PARTY_HOSTS and its provider to the Website table on /subprocessors/`);
    } else if (!websiteTable.includes(vendor)) {
      fail("subprocessors", `the Website table does not list ${vendor}, which ${file} loads from ${host}`);
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
