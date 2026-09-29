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

// The app's own strings (iqs-flow-mobile locales/*.json), written the way the pages
// need them to read. Tests override single keys to put back what the app says today.
const APP_TEXT = {
  en: {
    tabs: { more: "More" },
    profile: {
      privacyData: "Privacy & data",
      deleteAccount: "Delete my account",
      sendDeleteRequest: "Send request",
      deleteRequested: "Request sent",
      deleteTimeframe: "We complete deletion within 30 days and tell you when it is done.",
    },
    locationPermission: {
      body: "While IQS Flow is open, it records your location when you do work. Your supervisor, and coworkers who use the app, can see your location on the map.",
    },
  },
  es: {
    tabs: { more: "Más" },
    profile: {
      privacyData: "Privacidad y datos",
      deleteAccount: "Eliminar mi cuenta",
      sendDeleteRequest: "Enviar solicitud",
      deleteRequested: "Solicitud enviada",
      deleteTimeframe: "Completamos la eliminación en un plazo de 30 días y te avisamos cuando esté hecha.",
    },
    locationPermission: {
      body: "Mientras IQS Flow está abierta, registra tu ubicación cuando trabajas. Tu supervisor y tus compañeros que usan la app pueden ver tu ubicación en el mapa.",
    },
  },
  fr: {
    tabs: { more: "Plus" },
    profile: {
      privacyData: "Confidentialité et données",
      deleteAccount: "Supprimer mon compte",
      sendDeleteRequest: "Envoyer la demande",
      deleteRequested: "Demande envoyée",
      deleteTimeframe: "Nous terminons la suppression sous 30 jours et vous prévenons lorsqu'elle est faite.",
    },
    locationPermission: {
      body: "Quand IQS Flow est ouverte, elle enregistre votre position pendant le travail. Votre superviseur et vos collègues qui utilisent l'application peuvent voir votre position sur la carte.",
    },
  },
};

/** Write en/es/fr locale files; `overrides` is { lang: { "a.b": value } }. Returns the folder. */
function writeLocales(dir, overrides = {}) {
  const folder = path.join(dir, "locales");
  mkdirSync(folder, { recursive: true });
  for (const [lang, strings] of Object.entries(APP_TEXT)) {
    const copy = structuredClone(strings);
    for (const [key, value] of Object.entries(overrides[lang] ?? {})) {
      const parts = key.split(".");
      parts.slice(0, -1).reduce((o, k) => o[k], copy)[parts.at(-1)] = value;
    }
    writeFileSync(path.join(folder, `${lang}.json`), JSON.stringify(copy, null, 2));
  }
  return folder;
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

// ---- finding: who can see a worker's location ------------------------------------------

test("fails when the policy says only supervisors and managers can see your location", () => {
  const { site } = fixture({
    [PRIVACY]: pipe(
      swap(
        " Coworkers at your employer who use the app, including other cleaners, can see your name and the most recent location the app recorded for you today on the app&rsquo;s map.",
        "",
      ),
      swap(
        "<li><b>Coworkers.</b> Coworkers at your employer who use the IQS Flow app, including other cleaners, can see your name and the most recent location the app recorded for you today on the app&rsquo;s map. See <a href=\"#mobile\">section 04</a>.</li>",
        "",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 04 does not say coworkers can see your name and location/);
  assert.match(r.out, /privacy: section 07 does not say coworkers can see your name and location/);
});

test("fails when the policy leaves out that clients see where an inspection was submitted", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      "These can include photos, the name of the person who did the inspection, and the location where the inspection was submitted (its GPS coordinates).",
      "These can include photos and the name of the person who did the inspection.",
    ),
  });
  expectFailure(check(site), /privacy: section 07 does not say clients can see the location where an inspection was submitted/);
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

// ---- finding: the audit history cannot be de-identified ---------------------------------

test("fails when the pages promise de-identification without the audit history exception", () => {
  const { site } = fixture({
    [PRIVACY]: (t) => t.replace(/\s*<tr><td>Security audit history<\/td>[\s\S]*?<\/tr>/, ""),
    [DELETE]: pipe(
      (t) => t.replace(/\s*<li>One exception: our security audit history[\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li>Una excepci&oacute;n: nuestro historial de auditor&iacute;a[\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li>Une exception&nbsp;: notre historique d&rsquo;audit[\s\S]*?<\/li>/, ""),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 08 has no row for the security audit history/);
  for (const lang of ["English", "Spanish", "French"]) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say the security audit history keeps some details`));
  }
});

// ---- finding: the app's own deletion and location text must match the pages -------------

test("--app-locales passes when the app's text matches the pages", () => {
  const { dir, site } = fixture();
  const r = check(site, `--app-locales=${writeLocales(dir)}`);
  assert.equal(r.code, 0, r.out);
});

test("--app-locales fails when the app promises only a review and reply within 30 days", () => {
  const { dir, site } = fixture();
  // The 1.1.0 strings on iqs-flow-mobile origin/claude/sdk57-store-release.
  const locales = writeLocales(dir, {
    en: { "profile.deleteTimeframe": "We will review your request and respond within 30 days." },
    es: { "profile.deleteTimeframe": "Revisaremos tu solicitud y responderemos en un plazo de 30 días." },
    fr: { "profile.deleteTimeframe": "Nous examinerons votre demande et répondrons sous 30 jours." },
  });
  const r = check(site, `--app-locales=${locales}`);
  expectFailure(r, /app en\.json: profile\.deleteTimeframe \("We will review your request and respond within 30 days\."\) does not promise/);
  assert.match(r.out, /app es\.json: profile\.deleteTimeframe/);
  assert.match(r.out, /app fr\.json: profile\.deleteTimeframe/);
});

test("--app-locales fails when the app's location notice does not mention coworkers", () => {
  const { dir, site } = fixture();
  // The 1.1.0 English notice says only the supervisor can see it.
  const locales = writeLocales(dir, {
    en: {
      "locationPermission.body":
        "During an active shift it also updates your location every few minutes so your supervisor can see where work is happening.",
    },
  });
  expectFailure(check(site, `--app-locales=${locales}`), /app en\.json: locationPermission\.body does not say coworkers can see your location/);
});

test("--app-locales fails when a deletion step label differs from the app", () => {
  const { dir, site } = fixture();
  const locales = writeLocales(dir, {
    en: { "profile.deleteAccount": "Delete account" },
    es: { "tabs.more": "Menú" },
  });
  const r = check(site, `--app-locales=${locales}`);
  expectFailure(r, /delete-account: English steps do not show the app's label "Delete account" \(profile\.deleteAccount\)/);
  assert.match(r.out, /privacy: section 09 does not show the app's label "Delete account"/);
  assert.match(r.out, /delete-account: Spanish steps do not show the app's label "Menú" \(tabs\.more\)/);
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

test("--publish passes once every TODO is answered, every sign-off is set and the app text matches", () => {
  const { dir, site } = publishReady();
  const r = check(site, "--publish", `--signoff=${writeSignoff(dir, ALL_SIGNED)}`, `--app-locales=${writeLocales(dir)}`);
  assert.equal(r.code, 0, r.out);
});

test("--publish fails when the app's text is not compared", () => {
  const { dir, site } = publishReady();
  const r = check(site, "--publish", `--signoff=${writeSignoff(dir, ALL_SIGNED)}`);
  expectFailure(r, /app: pass --app-locales=/);
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
