/**
 * Tests for scripts/check-legal-pages.mjs. No dependencies:
 *
 *   node --test scripts/check-legal-pages.test.mjs
 *
 * Each regression test copies site/ to a temp folder, puts back one statement the
 * fact-check found to be false, and expects the check to fail with a clear message.
 */
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(here, "..", "site");
const SCRIPT = path.join(here, "check-legal-pages.mjs");
// The link check only needs these to exist, so they are copied as empty files.
const BINARY = /\.(png|jpe?g|gif|webp|ico|pdf|woff2?|mp4)$/i;

const PRIVACY = "privacy/index.html";
const DELETE = "delete-account/index.html";
const SUBS = "subprocessors/index.html";
const SHARED_JS = "assets/shared.js";
const TERMS = "terms/index.html";

const temps = [];
after(() => {
  for (const dir of temps) rmSync(dir, { recursive: true, force: true });
});

function copySite(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copySite(from, to);
    else if (BINARY.test(entry.name)) writeFileSync(to, "");
    else copyFileSync(from, to);
  }
}

/** A temp copy of site/ with `edits` ({ relPath: (text) => text }) applied. */
function fixture(edits = {}) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "legal-check-"));
  temps.push(dir);
  const site = path.join(dir, "site");
  copySite(SITE, site);
  for (const [rel, edit] of Object.entries(edits)) {
    const file = path.join(site, rel);
    const before = readFileSync(file, "utf8");
    const changed = edit(before);
    assert.notEqual(changed, before, `fixture edit to ${rel} changed nothing (the page text moved?)`);
    writeFileSync(file, changed);
  }
  return { dir, site };
}

function writeSignoff(dir, values) {
  const file = path.join(dir, "signoff.json");
  writeFileSync(file, JSON.stringify(values));
  return file;
}

function check(site, ...flags) {
  const r = spawnSync(process.execPath, [SCRIPT, site, ...flags], { encoding: "utf8" });
  return { code: r.status, out: `${r.stdout}${r.stderr}` };
}

const swap = (from, to) => (text) => text.split(from).join(to);
const pipe = (...fns) => (text) => fns.reduce((t, fn) => fn(t), text);

function expectFailure(result, pattern) {
  assert.equal(result.code, 1, `expected the check to fail, got:\n${result.out}`);
  assert.match(result.out, pattern);
}

// ---- the committed pages ---------------------------------------------------------

test("the pages in site/ pass the everyday check", () => {
  const r = check(SITE);
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /All legal page checks passed\./);
});

test("--publish fails while TODOs, draft notices and sign-offs are open", () => {
  const r = check(SITE, "--publish");
  expectFailure(r, /privacy: \d+ TODO\(Josh\) item\(s\) must be resolved/);
  assert.match(r.out, /delete-account: draft notice must be removed/);
  assert.match(r.out, /shared\.js: 1 TODO\(Josh\) item\(s\) must be resolved/);
  for (const key of ["legalEntity", "counselReviewedOn", "deletionProcessLive", "appVersionWithGates"]) {
    assert.match(r.out, new RegExp(`sign-off: ${key} is not set`));
  }
});

// ---- finding: location "only during scheduled shifts" ---------------------------------

test("fails when the policy says location is used only during scheduled shifts", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      "<li>Only while the app is open on your screen.</li>",
      "<li>Only during your scheduled shifts, and only while the app is open on your screen.</li>",
    ),
  });
  expectFailure(check(site), /privacy: claims location is used only during scheduled shifts/);
});

test("fails when the summary says the app collects location during scheduled shifts", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      "photos, and the location of your phone when you use the app for work.",
      "photos, and location during scheduled shifts.",
    ),
  });
  expectFailure(check(site), /privacy: claims location is used only during scheduled shifts/);
});

test("fails when the policy drops that work-event locations are recorded outside scheduled shifts", () => {
  const { site } = fixture({ [PRIVACY]: swap(", not only during a scheduled shift.", ".") });
  expectFailure(check(site), /privacy: does not say that work-event locations are recorded outside scheduled shifts/);
});

test("fails when the policy drops that the app never collects location when closed", () => {
  const { site } = fixture({
    [PRIVACY]: swap("never collects location when the app is closed", "does not track you when the app is closed"),
  });
  expectFailure(check(site), /privacy: does not say the app never collects location when it is closed/);
});

// ---- finding: "Profile" is not a label the app shows ---------------------------------

test("fails when the English deletion steps say Profile instead of More", () => {
  const { site } = fixture({
    [DELETE]: swap("<li>Tap <b>More</b> (the menu tab at the bottom right).</li>", "<li>Tap <b>Profile</b>.</li>"),
  });
  const r = check(site);
  expectFailure(r, /delete-account: English steps say <b>Profile<\/b>, a label the app does not show/);
  assert.match(r.out, /delete-account: English steps do not say to tap <b>More<\/b>/);
});

test("fails when the Spanish deletion steps say Perfil instead of Más", () => {
  const { site } = fixture({
    [DELETE]: swap("Toca <b>M&aacute;s</b> (la pesta&ntilde;a del men&uacute;, abajo a la derecha).", "Toca <b>Perfil</b>."),
  });
  expectFailure(check(site), /delete-account: Spanish steps say <b>Perfil<\/b>/);
});

test("fails when the French deletion steps say Profil instead of Plus", () => {
  const { site } = fixture({
    [DELETE]: swap("Touchez <b>Plus</b> (l&rsquo;onglet du menu, en bas &agrave; droite).", "Touchez <b>Profil</b>."),
  });
  expectFailure(check(site), /delete-account: French steps say <b>Profil<\/b>/);
});

test("fails when the privacy policy deletion steps say Profile", () => {
  const { site } = fixture({
    [PRIVACY]: pipe(
      swap("tap <b>More</b> (the menu tab at the bottom right)", "tap <b>Profile</b>"),
      swap("(More, then Delete my account)", "(Profile, then Delete my account)"),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: tells people to tap Profile/);
  assert.match(r.out, /privacy: section 09 does not tell people to tap More/);
});

test("fails when client accounts are not told to use email", () => {
  const { site } = fixture({
    [DELETE]: swap("<p>If you sign in with a client account, the app does not offer these steps. Use Option 2 instead.</p>", ""),
    [PRIVACY]: swap(
      "<li><b>Client accounts:</b> if you sign in with a client account, the app does not offer these steps. Use email instead.</li>",
      "",
    ),
  });
  const r = check(site);
  expectFailure(r, /delete-account: English section does not tell client accounts to use email/);
  assert.match(r.out, /privacy: section 09 does not tell client accounts to use email/);
});

// ---- finding: a response time is not a completion time --------------------------------

test("fails when the deletion page promises only a response within 30 days", () => {
  const { site } = fixture({
    [DELETE]: pipe(
      swap("<b>We complete deletion within 30 days and tell you when it is done.</b>", "<b>We respond within 30 days.</b>"),
      swap(
        "<b>Completamos la eliminaci&oacute;n en un plazo de 30 d&iacute;as y te avisamos cuando est&eacute; hecha.</b>",
        "<b>Respondemos en un plazo de 30 d&iacute;as.</b>",
      ),
      swap(
        "<b>Nous terminons la suppression sous 30 jours et vous pr&eacute;venons lorsqu&rsquo;elle est faite.</b>",
        "<b>Nous r&eacute;pondons sous 30 jours.</b>",
      ),
    ),
  });
  const r = check(site);
  for (const lang of ["English", "Spanish", "French"]) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section gives only a response time`));
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say when deletion is complete`));
  }
  assert.equal(r.code, 1);
});

test("fails when the privacy policy promises only a response within 30 days", () => {
  const { site } = fixture({
    [PRIVACY]: swap("We complete deletion within 30 days and tell you when it is done.", "We respond within 30 days."),
  });
  const r = check(site);
  expectFailure(r, /privacy: gives only a response time/);
  assert.match(r.out, /privacy: does not say when deletion is complete/);
});

// ---- finding: unconfirmed legal entity ---------------------------------------------------

test("fails when a page names an entity type that is not confirmed", () => {
  const { site } = fixture({
    [DELETE]: swap("published by <b>Integrity Quality Solutions</b>.", "published by <b>Integrity Quality Solutions LLC</b>."),
  });
  expectFailure(check(site), /delete-account: names the entity as "Integrity Quality Solutions LLC", which is not the confirmed legalEntity/);
});

test("fails when the subprocessors page names an unconfirmed entity type", () => {
  const { site } = fixture({ [SUBS]: swap("<p>Integrity Quality Solutions <span", "<p>Integrity Quality Solutions, Inc. <span") });
  expectFailure(check(site), /subprocessors: names the entity as "Integrity Quality Solutions, Inc\."/);
});

test("fails when the site footer names IQS Flow, Inc.", () => {
  const { site } = fixture({ [SHARED_JS]: swap("© 2026 INTEGRITY QUALITY SOLUTIONS", "© 2026 IQS FLOW, INC.") });
  const r = check(site);
  expectFailure(r, /shared\.js: footer still names IQS Flow, Inc\./);
  assert.match(r.out, /shared\.js footer: does not name the company "Integrity Quality Solutions"/);
});

test("fails when the site footer names an unconfirmed entity type", () => {
  const { site } = fixture({ [SHARED_JS]: swap("© 2026 INTEGRITY QUALITY SOLUTIONS", "© 2026 INTEGRITY QUALITY SOLUTIONS LLC") });
  expectFailure(check(site), /shared\.js footer: names the entity as "INTEGRITY QUALITY SOLUTIONS LLC"/);
});

// ---- finding: counsel review and the other sign-offs gate publishing ---------------------

const ENTITY = "Integrity Quality Solutions LLC";
const ALL_SIGNED = {
  legalEntity: ENTITY,
  counselReviewedOn: "2026-10-01",
  deletionProcessLive: "2026-10-01",
  appVersionWithGates: "1.1.0",
};
const stripTodos = pipe(
  (t) => t.replace(/<div class="legal-draft"[^>]*>[\s\S]*?<\/div>/, ""),
  (t) => t.replace(/\s*<span class="todo">TODO\(Josh\)[^<]*<\/span>/g, ""),
);
const nameEntity = swap("Integrity Quality Solutions", ENTITY);
/** Every TODO answered and the entity confirmed everywhere: only the sign-off file differs. */
function publishReady(termsEdit = swap("IQS Flow, Inc.", ENTITY)) {
  const f = fixture({
    [PRIVACY]: pipe(stripTodos, nameEntity),
    [SUBS]: pipe(stripTodos, nameEntity),
    [DELETE]: pipe(stripTodos, nameEntity),
    [SHARED_JS]: pipe(swap("TODO(Josh)", "NOTE"), swap("INTEGRITY QUALITY SOLUTIONS", ENTITY.toUpperCase())),
    [TERMS]: termsEdit,
  });
  for (const rel of [PRIVACY, SUBS, DELETE, SHARED_JS]) {
    assert.doesNotMatch(readFileSync(path.join(f.site, rel), "utf8"), /TODO\(Josh\)/, `${rel} still has a TODO in the fixture`);
  }
  return f;
}

test("--publish passes once every TODO is answered and every sign-off is set", () => {
  const { dir, site } = publishReady();
  const r = check(site, "--publish", `--signoff=${writeSignoff(dir, ALL_SIGNED)}`);
  assert.equal(r.code, 0, r.out);
});

for (const key of Object.keys(ALL_SIGNED)) {
  test(`--publish fails when ${key} is not signed off, even with every TODO answered`, () => {
    const { dir, site } = publishReady();
    const r = check(site, "--publish", `--signoff=${writeSignoff(dir, { ...ALL_SIGNED, [key]: null })}`);
    expectFailure(r, new RegExp(`sign-off: ${key} is not set`));
  });
}

test("--publish fails when a page does not name the confirmed legal entity", () => {
  const { dir, site } = publishReady();
  const signoff = writeSignoff(dir, { ...ALL_SIGNED, legalEntity: "Integrity Quality Solutions Inc." });
  const r = check(site, "--publish", `--signoff=${signoff}`);
  expectFailure(r, /privacy: does not name the confirmed legal entity "Integrity Quality Solutions Inc\."/);
  assert.match(r.out, /privacy: names the entity as "Integrity Quality Solutions LLC", which is not the confirmed legalEntity/);
});

test("--publish fails while /terms/ still names IQS Flow, Inc.", () => {
  const { dir, site } = publishReady((t) => `${t}\n<!-- unchanged terms -->`);
  const r = check(site, "--publish", `--signoff=${writeSignoff(dir, ALL_SIGNED)}`);
  expectFailure(r, /terms: names IQS Flow, Inc\., a different entity/);
  assert.match(r.out, /terms: does not name the confirmed legal entity/);
});

// ---- existing checks still hold ---------------------------------------------------------

test("fails on an em dash in customer copy", () => {
  const { site } = fixture({ [SUBS]: swap("About this list.", "About this list — read me.") });
  expectFailure(check(site), /subprocessors: contains an em dash/);
});
