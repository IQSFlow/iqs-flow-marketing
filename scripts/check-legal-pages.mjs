#!/usr/bin/env node
/**
 * Checks the public legal pages that the App Store and Google Play listings link to:
 *   /privacy/          privacy policy (with the mobile app section)
 *   /subprocessors/    service providers that process personal data
 *   /delete-account/   account deletion instructions (Google Play requirement)
 *
 * No dependencies. The site has no build step, so this is its lint for these pages.
 *
 *   node scripts/check-legal-pages.mjs                  # check ./site
 *   node scripts/check-legal-pages.mjs <site-root>      # check another copy of site/
 *   node scripts/check-legal-pages.mjs --publish        # also fail on any TODO(Josh) or draft notice
 *
 * Run it with --publish before pushing a v3.x tag that ships these pages.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const publishMode = args.includes("--publish");
const rootArg = args.find((a) => !a.startsWith("--"));
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.resolve(rootArg ?? path.join(repoRoot, "site"));

const PAGES = {
  privacy: "privacy/index.html",
  subprocessors: "subprocessors/index.html",
  deleteAccount: "delete-account/index.html",
};

const ENTITY = "Integrity Quality Solutions LLC";
// Named in the old policy but not used anywhere in the IQS Flow code.
const UNUSED_VENDORS = /\bAWS\b|Amazon Web Services|\bSentry\b|\bTwilio\b/i;
// Entity and DPO in the old policy that do not match the App Store seller.
const STALE_IDENTITY = /IQS Flow, Inc\.|Marta Halverson/i;
const EM_DASH = /—|&mdash;|&#8212;|&#x2014;/i;
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

const failures = [];
const notes = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);

function read(rel) {
  const file = path.join(siteRoot, rel);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

/** Resolve a root-relative href to a file under siteRoot, the way the static host serves it. */
function resolvesToFile(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return existsSync(path.join(siteRoot, "index.html"));
  const target = path.join(siteRoot, decodeURIComponent(clean));
  if (clean.endsWith("/")) return existsSync(path.join(target, "index.html"));
  if (existsSync(target) && statSync(target).isFile()) return true;
  return existsSync(path.join(target, "index.html"));
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

function checkCommon(page, html) {
  if (EM_DASH.test(html)) fail(page, "contains an em dash (customer copy must not use them)");
  if (STALE_IDENTITY.test(html)) fail(page, "still names the old entity or DPO (IQS Flow, Inc. / Marta Halverson)");
  if (!html.includes(ENTITY)) fail(page, `does not name the legal entity "${ENTITY}"`);
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

  const todos = (html.match(/TODO\(Josh\)/g) ?? []).length;
  notes.push(`${page}: ${todos} TODO(Josh) item(s) open`);
  if (publishMode) {
    if (todos > 0) fail(page, `${todos} TODO(Josh) item(s) must be resolved before publishing`);
    if (html.includes('class="legal-draft"')) fail(page, "draft notice must be removed before publishing");
  }
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
  if (!/scheduled shift/i.test(privacy)) fail("privacy", "does not limit location to scheduled shifts");
  if (!/within 30 days/.test(privacy)) fail("privacy", "does not state the 30-day deletion response time");
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
  for (const required of ["IQS Flow", "Profile", "Delete my account", "Send request", "privacy@iqsflow.com", "within 30 days"]) {
    if (!del.includes(required)) fail("delete-account", `does not mention "${required}"`);
  }
  const es = del.match(/<section[^>]*lang="es"[^>]*>([\s\S]*?)<\/section>/);
  const fr = del.match(/<section[^>]*lang="fr"[^>]*>([\s\S]*?)<\/section>/);
  if (!es || !es[1].includes("Eliminar mi cuenta") || !es[1].includes("30 d&iacute;as")) {
    fail("delete-account", "missing the Spanish section with the in-app steps and 30-day timeframe");
  }
  if (!fr || !fr[1].includes("Supprimer mon compte") || !fr[1].includes("30 jours")) {
    fail("delete-account", "missing the French section with the in-app steps and 30-day timeframe");
  }
}

console.log(`Checked legal pages in ${siteRoot}${publishMode ? " (publish mode)" : ""}`);
for (const n of notes) console.log(`  note  ${n}`);
if (failures.length) {
  for (const f of failures) console.log(`  FAIL  ${f}`);
  console.log(`${failures.length} problem(s) found.`);
  process.exit(1);
}
console.log("All legal page checks passed.");
