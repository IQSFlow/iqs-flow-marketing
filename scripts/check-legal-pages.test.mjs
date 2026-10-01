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
const HOME = "index.html";
const ABOUT = "about/index.html";

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
// The app has no deletion strings here: accounts are the employer's (account policy of
// 2026-09-30), so the app shows an explanation instead of a Delete my account option.
const APP_TEXT = {
  en: {
    locationPermission: {
      body: "While IQS Flow is open, it records your location when you do work. Your supervisor, coworkers who use the app, and your employer's clients at their own sites can see your location.",
    },
  },
  es: {
    locationPermission: {
      body: "Mientras IQS Flow está abierta, registra tu ubicación cuando trabajas. Tu supervisor, tus compañeros que usan la app y los clientes de tu empleador en sus propios sitios pueden ver tu ubicación.",
    },
  },
  fr: {
    locationPermission: {
      body: "Quand IQS Flow est ouverte, elle enregistre votre position pendant le travail. Votre superviseur, vos collègues qui utilisent l'application et les clients de votre employeur sur leurs propres sites peuvent voir votre position.",
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
      parts.slice(0, -1).reduce((o, k) => (o[k] ??= {}), copy)[parts.at(-1)] = value;
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
      "photos, the location of your phone when you use the app for work, and the location of your browser when you start an inspection in the web dashboard.",
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

// GET /api/live/facility-status is open to CLIENT and returns live worker positions.
test("fails when the policy says the only location clients see is where inspections were submitted", () => {
  const { site } = fixture({
    [PRIVACY]: pipe(
      swap(
        "Your employer&rsquo;s clients can see where each inspection they view was submitted, and the live position of workers at their own sites from the last 30 minutes, with each worker&rsquo;s name unless your employer hides names.",
        "Your employer&rsquo;s clients can see where each inspection they view was submitted.",
      ),
      swap(" Your employer&rsquo;s clients can also see the live position of workers at their own sites (see &ldquo;Who can see it&rdquo; below).", ""),
      (t) => t.replace(/, and the live position of workers at their own sites: [\s\S]*?Your employer cannot hide the positions themselves \(see /, " (see "),
      swap(" Clients can also see the live position of workers at their sites from the last 30 minutes, as described in <a href=\"#mobile\">section 04</a>.", ""),
    ),
  });
  const r = check(site);
  for (const where of ["section 01", "section 04's Location permission row", "section 04's \"Who can see it\"", "section 07"]) {
    assert.match(r.out, new RegExp(`privacy: ${where} does not say your employer's clients can see the live position of workers at their sites`));
  }
  assert.equal(r.code, 1);
});

test("a live-position disclosure that appears only in a TODO(Josh) note does not count", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      " Clients can also see the live position of workers at their sites from the last 30 minutes, as described in <a href=\"#mobile\">section 04</a>.",
      " <span class=\"todo\">TODO(Josh): clients can also see the live position of workers at their sites.</span>",
    ),
  });
  expectFailure(check(site), /privacy: section 07 does not say your employer's clients can see the live position of workers/);
});

test("fails when the policy says the employer can hide locations from clients", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      "Your employer can hide names, scores, notes and photos on inspection results, and names on live positions, from its clients. It cannot hide locations:",
      "Your employer can hide names, scores, notes, photos and locations from its clients:",
    ),
  });
  expectFailure(check(site), /privacy: section 07 does not say your employer cannot hide locations from clients/);
});

// GET /api/client/service-requests (and /:id) returns the assigned person's name without
// reading crewNamesOn (iqs-flow-api src/routes/client-requests.ts), and the client portal
// shows it, so "your employer can hide names from its clients" is not true everywhere.
const SERVICE_REQUEST_NAME =
  " They can also see the service requests and complaints that they file, or that are logged for them, about their own sites, including the name of the person assigned to each one. Your employer can hide names, scores, notes and photos on inspection results, and names on live positions, from its clients. It cannot hide locations: the submitted location is shown with every inspection a client can see, and live positions are shown even when names are hidden. It also cannot hide the name of the person assigned to a service request or complaint: clients see that name whatever your employer&rsquo;s name setting says.";

test("fails when section 07 says the employer can hide names from clients everywhere", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      SERVICE_REQUEST_NAME,
      " Your employer can hide names, scores, notes and photos from its clients, but not locations: the submitted location is shown with every inspection a client can see, and live positions are shown even when names are hidden.",
    ),
  });
  expectFailure(
    check(site),
    /privacy: section 07 does not say your employer cannot hide the name of the person assigned to a client's service request or complaint/,
  );
});

test("a service-request name disclosure that appears only in a TODO(Josh) note does not count", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      " It also cannot hide the name of the person assigned to a service request or complaint: clients see that name whatever your employer&rsquo;s name setting says.",
      " <span class=\"todo\">TODO(Josh): your employer cannot hide the name of the person assigned to a service request.</span>",
    ),
  });
  expectFailure(check(site), /privacy: section 07 does not say your employer cannot hide the name of the person assigned/);
});

test("does not require section 07 to say the employer can hide names from clients", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      " Your employer can hide names, scores, notes and photos on inspection results, and names on live positions, from its clients. It cannot hide locations:",
      " Your employer cannot hide locations:",
    ),
  });
  const r = check(site);
  assert.equal(r.code, 0, r.out);
});

// ---- minor findings: photos, phone storage, updates, AI, maps, retention ---------------

test("fails when the policy does not say a camera-saved location stays in uploaded photos", () => {
  const { site } = fixture({
    [PRIVACY]: (t) => t.replace(/\s*<li><b>Location in photos\.<\/b>[\s\S]*?<\/li>/, ""),
  });
  expectFailure(check(site), /privacy: section 04 does not say a location saved by the phone's camera stays in uploaded photos/);
});

test("fails when the policy says deleting the app removes everything from an iPhone", () => {
  const { site } = fixture({
    [PRIVACY]: (t) =>
      t.replace(
        /Deleting the app removes most of this from your phone, including any work that has not uploaded yet\.[\s\S]*?Signing out before you delete the app removes the sign-in session\./,
        "Deleting the app removes these from your phone, including any work that has not uploaded yet.",
      ),
  });
  const r = check(site);
  expectFailure(r, /privacy: says deleting the app removes everything from the phone/);
  assert.match(r.out, /privacy: section 04 does not say what can remain on an iPhone/);
});

test("fails when the policy leaves out the app's installation ID", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      "Expo receives the app version, the platform, your IP address and the app&rsquo;s random installation ID.",
      "Expo receives the app version, the platform and your IP address.",
    ),
  });
  expectFailure(check(site), /privacy: section 04 does not say Expo receives the app's installation ID/);
});

test("fails when section 05 leaves out upload-time scoring or the client portal assistant", () => {
  const { site } = fixture({
    [PRIVACY]: pipe(
      swap(
        "When an evidence photo for an inspection is uploaded, and again when the inspection is submitted, we send the inspection&rsquo;s evidence photos to Gemini",
        "When an inspection is submitted, we send its evidence photos (one photo per checklist item) to Gemini",
      ),
      (t) => t.replace(/\s*<li><b>Client portal assistant\.<\/b>[\s\S]*?<\/li>/, ""),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 05 does not say photos are scored when they are uploaded/);
  assert.match(r.out, /privacy: section 05 does not describe the client portal assistant/);
});

test("fails when section 08 has no row for location check-ins", () => {
  const { site } = fixture({
    [PRIVACY]: (t) =>
      t.replace(
        /<tr><td>Location check-ins<\/td>[\s\S]*?<\/tr>/,
        '<tr><td>Location history</td><td><span class="todo">TODO(Josh): retention period</span></td></tr>',
      ),
  });
  expectFailure(check(site), /privacy: section 08 has no row for location check-ins/);
});

// ---- finding: location check-ins are not deleted on production ---------------------------
// The daily cleanup that deletes check-ins older than 30 days runs only against the
// development API, so section 08 may give that period only once a sign-off confirms a
// production job deletes them.

const LOCATION_ROW = /(<tr><td>Location check-ins<\/td><td>)[\s\S]*?(<\/td><\/tr>)/;
const locationRetention = (cell) => (t) => t.replace(LOCATION_ROW, `$1${cell}$2`);

test("fails when section 08 says location check-ins are deleted after 30 days and no production cleanup is confirmed", () => {
  const { site } = fixture({ [PRIVACY]: locationRetention("30 days, then deleted automatically.") });
  expectFailure(check(site), /sign-off: locationCleanupOnProd is not set in legal-signoff\.json, but \/privacy\/ section 08 says location check-ins are deleted/);
});

test("section 08 may give the 30-day period once locationCleanupOnProd confirms the production cleanup", () => {
  const { dir, site } = fixture({ [PRIVACY]: locationRetention("30 days, then deleted automatically.") });
  const r = check(site, `--signoff=${writeSignoff(dir, { locationCleanupOnProd: "2026-10-01" })}`);
  assert.equal(r.code, 0, r.out);
});

test("fails when the location check-ins row gives no period and no TODO(Josh) holds it open", () => {
  const { site } = fixture({ [PRIVACY]: locationRetention("") });
  expectFailure(check(site), /privacy: section 08 does not say how long location check-ins are kept/);
});

test("fails when the subprocessors page leaves out Apple Maps, the installation ID, the assistant or the directions origin", () => {
  const { site } = fixture({
    [SUBS]: pipe(
      (t) => t.replace(/\s*<tr><td>Apple<\/td><td>Apple Maps \(MapKit\)<\/td>[\s\S]*?<\/tr>/, ""),
      swap(" and a random installation ID the app creates for update checks", ""),
      (t) => t.replace(/ For the client portal assistant: [^<]*/, ""),
      swap(
        "<td>Address lookup, and directions from your phone&rsquo;s current location to a work site.</td><td>Addresses and map coordinates, including your phone&rsquo;s current location when the app asks for directions.</td>",
        "<td>Address lookup and directions between sites.</td><td>Addresses and map coordinates.</td>",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /subprocessors: does not list Apple Maps/);
  assert.match(r.out, /subprocessors: does not list installation ID/);
  assert.match(r.out, /subprocessors: does not list client portal assistant/);
  assert.match(r.out, /subprocessors: the Google Maps Platform row does not say directions start from the phone's current location/);
});

// ---- finding: the web dashboard saves the browser's location with an inspection --------
// iqs-flow-web StartInspectionForm.tsx asks the browser for its location on the Start
// inspection page and sends it as gpsLatitude/gpsLongitude when the run is created.

const WEB_LOCATION_ITEM = /\s*<li>In the web dashboard, the page for starting an inspection asks your browser for your location\.[\s\S]*?<\/li>/;

test("fails when the policy leaves out that the web dashboard saves the browser's location with an inspection", () => {
  const { site } = fixture({ [PRIVACY]: (t) => t.replace(WEB_LOCATION_ITEM, "") });
  expectFailure(
    check(site),
    /privacy: section 03 does not say the web dashboard asks your browser for your location when you start an inspection and saves it with the inspection/,
  );
});

test("a web dashboard location disclosure that appears only in a TODO(Josh) note does not count", () => {
  const { site } = fixture({
    [PRIVACY]: (t) =>
      t.replace(
        WEB_LOCATION_ITEM,
        '<li><span class="todo">TODO(Josh): in the web dashboard, the page for starting an inspection asks your browser for your location, and when you start an inspection it is saved with the inspection.</span></li>',
      ),
  });
  expectFailure(check(site), /privacy: section 03 does not say the web dashboard asks your browser for your location/);
});

// ---- finding: not every provider uses data only to provide its service to us -----------
// reCAPTCHA, Google Fonts, Google Maps, Apple Maps and the Credly badge work under the
// provider's own terms and privacy policy.

test("fails when a page says every service provider uses data only to provide its service to us", () => {
  const { site } = fixture({
    [PRIVACY]: (t) =>
      t.replace(/Most of them may use the data only to provide their service to us\.[\s\S]*?on our About page\./, "They may use the data only to provide their service to us."),
    [SUBS]: (t) =>
      t.replace(/Most of them may use the data only to provide their service to us\.[\s\S]*?on our About page\./, "Each one processes data only to provide its service to us."),
  });
  const r = check(site);
  expectFailure(r, /privacy: says service providers use data only to provide their service to us, but does not say that reCAPTCHA, Google Fonts, Google Maps, Apple Maps, Credly work under their own terms/);
  assert.match(r.out, /subprocessors: says service providers use data only to provide their service to us, but does not say that reCAPTCHA, Google Fonts, Google Maps, Apple Maps, Credly work under their own terms/);
});

test("fails when the own-terms exception leaves out one of those services", () => {
  const { site } = fixture({
    [PRIVACY]: swap("Google Maps and Apple Maps, and the Credly badge on our About page.", "Google Maps and Apple Maps."),
  });
  expectFailure(check(site), /privacy: says service providers use data only to provide their service to us, but does not say that Credly works under its own terms/);
});

// ---- account policy of 2026-09-30: the employer manages every account ------------------
// The employer creates and manages accounts in the admin console; the app has no sign-up
// and no self-deletion. A worker who leaves is turned off; their work records stay with
// their name and GPS; their contact details, sign-in code, email or Google sign-in, push
// tokens and location tracking history are removed only when an active ADMIN of that
// employer asks at privacy@iqsflow.com, within 30 days.

test("fails when the pages put back the in-app deletion steps a worker follows", () => {
  const { site } = fixture({
    [PRIVACY]: pipe(
      swap(
        "Your employer can ask us to remove your personal details, and we do so within 30 days (section 09).",
        "You can ask us to delete your account in the app (More, then Delete my account) or by email.",
      ),
      swap(
        "you cannot delete your account yourself, in the app or by writing to us.",
        "you can delete your account: tap <b>More</b>, tap <b>Delete my account</b>, then tap <b>Send request</b>.",
      ),
    ),
    [DELETE]: pipe(
      swap(
        "you cannot delete your account yourself, in the app or by writing to us.",
        "you can delete your account: tap <b>More</b>, tap <b>Delete my account</b>, then tap <b>Send request</b>.",
      ),
      swap(
        "t&uacute; no puedes eliminar tu cuenta, ni en la app ni escribi&eacute;ndonos.",
        "puedes eliminar tu cuenta: toca <b>M&aacute;s</b>, toca <b>Eliminar mi cuenta</b> y luego <b>Enviar solicitud</b>.",
      ),
      swap(
        "vous ne pouvez pas supprimer votre compte vous-m&ecirc;me, ni dans l&rsquo;application ni en nous &eacute;crivant.",
        "vous pouvez supprimer votre compte&nbsp;: touchez <b>Plus</b>, touchez <b>Supprimer mon compte</b>, puis <b>Envoyer la demande</b>.",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: tells people they can delete their own account/);
  assert.match(r.out, /privacy: section 09 does not say you cannot delete your account yourself/);
  for (const lang of ["English", "Spanish", "French"]) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section tells people they can delete their own account`));
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say you cannot delete your account yourself`));
  }
});

test("fails when the pages leave out that only an active administrator of the employer can ask", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      " We act only on requests from an active administrator of that employer&rsquo;s IQS Flow account, and only for people in that account.",
      "",
    ),
    [DELETE]: pipe(
      swap(
        " We act only on requests from an active administrator of that employer&rsquo;s IQS Flow account, and only for people in that account.",
        "",
      ),
      swap(" Solo atendemos solicitudes de un administrador activo de la cuenta de IQS Flow de ese empleador, y solo para personas de esa cuenta.", ""),
      swap(
        " Nous ne traitons que les demandes d&rsquo;un administrateur actif du compte IQS Flow de cet employeur, et seulement pour des personnes de ce compte.",
        "",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 09 does not say only an active administrator of the employer's account can ask, and only for people in that account/);
  for (const lang of ["English", "Spanish", "French"]) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say only an active administrator of the employer's account can ask`));
  }
});

test("an administrator-only rule that appears only in a TODO(Josh) note does not count", () => {
  const { site } = fixture({
    [DELETE]: swap(
      " We act only on requests from an active administrator of that employer&rsquo;s IQS Flow account, and only for people in that account.",
      ' <span class="todo">TODO(Josh): we act only on requests from an active administrator, and only for people in that account.</span>',
    ),
  });
  expectFailure(check(site), /delete-account: English section does not say only an active administrator of the employer's account can ask/);
});

test("fails when the pages say work records are kept without the worker's name", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      "Records of your work stay as they are, with your name and the location recorded with your work.",
      "Work records that your employer or its clients need may be kept with your name removed.",
    ),
    [DELETE]: pipe(
      swap(
        "stay as they are, with your name and the location recorded with your work.",
        "may be kept with your name removed.",
      ),
      swap(
        "se conservan tal como est&aacute;n, con tu nombre y la ubicaci&oacute;n registrada con tu trabajo.",
        "pueden conservarse sin tu nombre.",
      ),
      swap(
        "restent tels quels, avec votre nom et la position enregistr&eacute;e avec votre travail.",
        "peuvent &ecirc;tre conserv&eacute;s sans votre nom.",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 09 does not say work records stay as they are, with the worker's name and the location recorded with their work/);
  assert.match(r.out, /privacy: section 09 says work records are kept without the worker's name/);
  for (const lang of ["English", "Spanish", "French"]) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say work records stay as they are`));
    assert.match(r.out, new RegExp(`delete-account: ${lang} section says work records are kept without the worker's name`));
  }
});

test("fails when the removal list leaves out a detail the employer can have removed", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      "Your employer can ask us to remove your email address and phone number, your sign-in code, your email or Google sign-in, your push notification tokens and your location tracking history.",
      "Your employer can ask us to remove some of your details.",
    ),
    // The audit history item further down still names "email address and phone number";
    // it must not count as the removal list.
    [DELETE]: pipe(
      (t) => t.replace(/\s*<li>Contact details: [\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li>Sign-in details: [\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li>Their push notification tokens\.<\/li>/, ""),
      (t) => t.replace(/\s*<li>Their location tracking history: [\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li>Datos de contacto: [\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li>Su historial de seguimiento de ubicaci&oacute;n: [\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li>Ses jetons de notification push\.<\/li>/, ""),
      (t) => t.replace(/\s*<li>Les donn&eacute;es de connexion&nbsp;: [\s\S]*?<\/li>/, ""),
    ),
  });
  const r = check(site);
  for (const item of ["contact details", "the sign-in code", "push notification tokens", "location tracking history"]) {
    assert.match(r.out, new RegExp(`privacy: section 09 does not list ${item} among the details removed on the employer's request`));
    assert.match(r.out, new RegExp(`delete-account: English section does not list ${item} among the details removed`));
  }
  assert.match(r.out, /delete-account: Spanish section does not list contact details among the details removed/);
  assert.match(r.out, /delete-account: Spanish section does not list location tracking history among the details removed/);
  assert.match(r.out, /delete-account: French section does not list push notification tokens among the details removed/);
  assert.match(r.out, /delete-account: French section does not list the sign-in code among the details removed/);
  assert.equal(r.code, 1);
});

// The address must sit with the answer an emailed request gets (file it from Admin > Privacy).
test("fails when the pages do not name privacy@iqsflow.com where they say what an emailed request gets", () => {
  const { site } = fixture({
    [DELETE]: (t) => t.replace(/<section class="legal-lang-section" id="es"[\s\S]*?<\/section>/, (es) => es.split("privacy@iqsflow.com").join("nosotros")),
  });
  expectFailure(
    check(site),
    /delete-account: Spanish section does not say an email to privacy@iqsflow\.com is answered with a request to file it from Admin > Privacy/,
  );
});

// ---- one filing path (decision D2, iqs-flow-api docs/runbooks/former-worker-data-removal.md) --
// The employer's administrator files from Admin > Privacy in the IQS Flow console (POST
// /api/privacy/delete-request), which records the request and starts the 30 days. An
// administrator who emails privacy@iqsflow.com is asked to file there, so it is verified.

const FILE_PRIVACY =
  "An administrator of your employer&rsquo;s IQS Flow account files the request from <b>Admin &gt; Privacy</b> in the IQS Flow console.";
const FILE_DELETE = {
  en: "An administrator of the employer&rsquo;s IQS Flow account files the request from <b>Admin &gt; Privacy</b> in the IQS Flow console.",
  es: "Un administrador de la cuenta de IQS Flow del empleador presenta la solicitud desde <b>Admin &gt; Privacy</b> en la consola de IQS Flow.",
  fr: "Un administrateur du compte IQS Flow de l&rsquo;employeur d&eacute;pose la demande depuis <b>Admin &gt; Privacy</b> dans la console IQS Flow.",
};
const INBOX_LINE =
  "Privacy questions go here. Employers file removal requests from Admin &gt; Privacy in the IQS Flow console (see <a href=\"#delete\">section 09</a>).";
const LANG_NAMES = { en: "English", es: "Spanish", fr: "French" };

test("fails when the pages tell the employer to email the removal request instead of filing it from Admin > Privacy", () => {
  // The wording before the filing path was settled.
  const { site } = fixture({
    [PRIVACY]: pipe(
      swap(
        FILE_PRIVACY,
        "An administrator of your employer&rsquo;s IQS Flow account asks by emailing <a href=\"mailto:privacy@iqsflow.com\">privacy@iqsflow.com</a>.",
      ),
      swap(INBOX_LINE, "Privacy questions and employers&rsquo; removal requests go here."),
    ),
    [DELETE]: pipe(
      swap(
        FILE_DELETE.en,
        "An administrator of the employer&rsquo;s IQS Flow account emails <a href=\"mailto:privacy@iqsflow.com\">privacy@iqsflow.com</a> with the person&rsquo;s full name and the company name on the IQS Flow account.",
      ),
      swap(
        FILE_DELETE.es,
        "Un administrador de la cuenta de IQS Flow del empleador escribe a <a href=\"mailto:privacy@iqsflow.com\">privacy@iqsflow.com</a> con el nombre completo de la persona y el nombre de la empresa en la cuenta de IQS Flow.",
      ),
      swap(
        FILE_DELETE.fr,
        "Un administrateur du compte IQS Flow de l&rsquo;employeur &eacute;crit &agrave; <a href=\"mailto:privacy@iqsflow.com\">privacy@iqsflow.com</a> en indiquant le nom complet de la personne et le nom de l&rsquo;entreprise sur le compte IQS Flow.",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 09 does not say the administrator files the request from Admin > Privacy in the IQS Flow console/);
  assert.match(r.out, /privacy: section 09 tells the employer to send the removal request by email, but it is filed from Admin > Privacy/);
  assert.match(r.out, /privacy: tells employers to send removal requests by email, but they are filed from Admin > Privacy/);
  for (const lang of Object.values(LANG_NAMES)) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say the administrator files the request from Admin > Privacy`));
    assert.match(r.out, new RegExp(`delete-account: ${lang} section tells the employer to send the removal request by email`));
  }
});

test("fails when the contact section says removal requests go to privacy@iqsflow.com", () => {
  const { site } = fixture({
    [PRIVACY]: swap(INBOX_LINE, "Privacy questions and employers&rsquo; removal requests go here."),
  });
  const r = check(site);
  expectFailure(r, /privacy: tells employers to send removal requests by email, but they are filed from Admin > Privacy/);
  assert.doesNotMatch(r.out, /privacy: section 09/);
});

test("a filing path that appears only in a TODO(Josh) note does not count", () => {
  const { site } = fixture({
    [DELETE]: swap(FILE_DELETE.en, `<span class="todo">TODO(Josh): ${FILE_DELETE.en.replace(/<\/?b>/g, "")}</span>`),
  });
  expectFailure(check(site), /delete-account: English section does not say the administrator files the request from Admin > Privacy/);
});

test("fails when the pages leave out that an emailed request is answered with a request to file it from Admin > Privacy", () => {
  const { site } = fixture({
    [PRIVACY]: (t) => t.replace(/\s*<li><b>Requests by email\.<\/b>[\s\S]*?<\/li>/, ""),
    [DELETE]: pipe(
      (t) => t.replace(/\s*<p>If an administrator emails [\s\S]*?<\/p>/, ""),
      (t) => t.replace(/\s*<p>Si un administrador escribe a [\s\S]*?<\/p>/, ""),
      (t) => t.replace(/\s*<p>Si un administrateur &eacute;crit &agrave; [\s\S]*?<\/p>/, ""),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 09 does not say an email to privacy@iqsflow\.com is answered with a request to file it from Admin > Privacy/);
  for (const lang of Object.values(LANG_NAMES)) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say an email to privacy@iqsflow\\.com is answered`));
  }
});

test("fails when the pages leave out that the 30 days start on the day the request is filed", () => {
  const { site } = fixture({
    [PRIVACY]: swap(" The 30 days start on the day the request is filed.", ""),
    [DELETE]: pipe(
      swap(" The 30 days start on the day the request is filed.", ""),
      swap(" Los 30 d&iacute;as empiezan a contar el d&iacute;a en que se presenta la solicitud.", ""),
      swap(" Les 30 jours commencent le jour o&ugrave; la demande est d&eacute;pos&eacute;e.", ""),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 09 does not say the 30 days start on the day the request is filed/);
  for (const lang of Object.values(LANG_NAMES)) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say the 30 days start on the day the request is filed`));
  }
});

test("fails when the pages leave out that the employer deactivates the person first", () => {
  const { site } = fixture({
    [PRIVACY]: swap(" Your employer must deactivate your account first, and we remove nothing while it is still active.", ""),
    [DELETE]: pipe(
      swap(" The employer deactivates the person&rsquo;s account first, and we remove nothing while it is still active.", ""),
      swap(" El empleador desactiva primero la cuenta de la persona, y no eliminamos nada mientras siga activa.", ""),
      swap(
        " L&rsquo;employeur d&eacute;sactive d&rsquo;abord le compte de la personne, et nous ne supprimons rien tant qu&rsquo;il est encore actif.",
        "",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 09 does not say the employer deactivates the person first/);
  for (const lang of Object.values(LANG_NAMES)) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say the employer deactivates the person first`));
  }
});

// Decision D1: a request covers the requesting employer's records and the person's one
// login. Records another employer holds stay until that employer's administrator asks.
test("fails when the pages leave out that another employer's records stay until that employer asks", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      " If you also worked for another employer that uses IQS Flow, the records that employer holds about you, such as its location check-ins, stay until that employer&rsquo;s administrator asks.",
      "",
    ),
    [DELETE]: pipe(
      swap(
        " If the person also worked for another employer that uses IQS Flow, the records that employer holds about them, such as its location check-ins, stay until that employer&rsquo;s administrator asks.",
        "",
      ),
      swap(
        " Si la persona tambi&eacute;n trabaj&oacute; para otro empleador que usa IQS Flow, los registros que ese empleador tiene sobre ella, como sus registros de ubicaci&oacute;n, se conservan hasta que el administrador de ese empleador lo pida.",
        "",
      ),
      swap(
        " Si la personne a aussi travaill&eacute; pour un autre employeur qui utilise IQS Flow, les dossiers que cet employeur d&eacute;tient sur elle, comme ses relev&eacute;s de position, sont conserv&eacute;s jusqu&rsquo;&agrave; ce que l&rsquo;administrateur de cet employeur le demande.",
        "",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 09 does not say records another employer holds stay until that employer's administrator asks/);
  for (const lang of Object.values(LANG_NAMES)) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say records another employer holds stay`));
  }
});

// ---- an administrator's own details (decision D3) ----------------------------------------
// POST /api/privacy/delete-request answers CANNOT_REQUEST_FOR_SELF: another administrator in
// the account must file it. No page sends the administrator to privacy@iqsflow.com for it.

test("fails when the pages leave out that an administrator cannot file for their own details", () => {
  const { site } = fixture({
    [PRIVACY]: (t) => t.replace(/\s*<li><b>An administrator&rsquo;s own details\.<\/b>[\s\S]*?<\/li>/, ""),
    [DELETE]: pipe(
      swap("\n      <p>An administrator cannot file a request for their own details. Another administrator in their account must file it.</p>", ""),
      swap("\n      <p>Un administrador no puede presentar una solicitud para sus propios datos. Debe presentarla otro administrador de su cuenta.</p>", ""),
      swap(
        "\n      <p>Un administrateur ne peut pas d&eacute;poser de demande pour ses propres donn&eacute;es. Un autre administrateur de son compte doit la d&eacute;poser.</p>",
        "",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 09 does not say an administrator cannot file for their own details/);
  for (const lang of Object.values(LANG_NAMES)) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say an administrator cannot file for their own details`));
  }
});

test("fails when a page tells an administrator to email privacy@iqsflow.com about their own details", () => {
  // The api's first CANNOT_REQUEST_FOR_SELF message ended "or write to privacy@iqsflow.com".
  const { site } = fixture({
    [PRIVACY]: swap(
      "Another administrator in their account must file it.</li>",
      "Another administrator in their account must file it, or they can write to <a href=\"mailto:privacy@iqsflow.com\">privacy@iqsflow.com</a>.</li>",
    ),
    [DELETE]: swap(
      "Debe presentarla otro administrador de su cuenta.</p>",
      "Debe presentarla otro administrador de su cuenta, o puede escribir a <a href=\"mailto:privacy@iqsflow.com\">privacy@iqsflow.com</a>.</p>",
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: tells an administrator to email privacy@iqsflow\.com about their own details/);
  assert.match(r.out, /delete-account: tells an administrator to email privacy@iqsflow\.com about their own details/);
});

// ---- children (decision D4) -----------------------------------------------------------------
// Every account is created by an employer, so a child's information reported to
// privacy@iqsflow.com is removed with the employer that created the account.

const CHILDREN_LINE =
  "tell us at <a href=\"mailto:privacy@iqsflow.com\">privacy@iqsflow.com</a>. Accounts are created by employers, not by the people who use them, so we work with the employer that created the account to remove the child&rsquo;s information.";

test("fails when section 13 promises that we delete a child's information ourselves", () => {
  const { site } = fixture({ [PRIVACY]: swap(CHILDREN_LINE, "contact us and we will delete it.") });
  const r = check(site);
  expectFailure(r, /privacy: section 13 promises that we delete a child's information ourselves/);
  assert.match(r.out, /privacy: section 13 does not say to tell us at privacy@iqsflow\.com and that we work with the employer that created the account/);
});

// Counsel has not set the minimum age or the collection commitment, so the draft states
// neither outside a TODO(Josh) note until counselReviewedOn is set.
const CHILDREN_OPENING = /IQS Flow is a workplace tool, and it is not meant for children\. <span class="todo">TODO\(Josh\)[^<]*<\/span>/;
const OLD_CHILDREN_OPENING =
  "IQS Flow is a workplace tool. It is not meant for children, and we do not knowingly collect information from children under 13.";

test("fails when section 13 states a minimum age before counsel has set one", () => {
  const { site } = fixture({ [PRIVACY]: (t) => t.replace(CHILDREN_OPENING, OLD_CHILDREN_OPENING) });
  expectFailure(check(site), /privacy: section 13 states a minimum age or a commitment about collecting children's information/);
});

test("section 13 may state the minimum age once counsel has reviewed the pages", () => {
  const { dir, site } = fixture({ [PRIVACY]: (t) => t.replace(CHILDREN_OPENING, OLD_CHILDREN_OPENING) });
  const r = check(site, `--signoff=${writeSignoff(dir, { counselReviewedOn: "2026-10-01" })}`);
  assert.equal(r.code, 0, r.out);
});

test("a children commitment that appears only in a TODO(Josh) note does not count", () => {
  const { site } = fixture({
    [PRIVACY]: swap(CHILDREN_LINE, "contact us. <span class=\"todo\">TODO(Josh): we work with the employer that created the account; privacy@iqsflow.com.</span>"),
  });
  expectFailure(check(site), /privacy: section 13 does not say to tell us at privacy@iqsflow\.com and that we work with the employer that created the account/);
});

// ---- a response time is not a completion time ---------------------------------------------

test("fails when the deletion page promises only a response within 30 days", () => {
  const { site } = fixture({
    [DELETE]: pipe(
      swap("We complete the removal within 30 days of the request.", "We respond within 30 days."),
      swap(
        "Completamos la eliminaci&oacute;n en un plazo de 30 d&iacute;as desde la solicitud.",
        "Respondemos en un plazo de 30 d&iacute;as.",
      ),
      swap(
        "Nous terminons la suppression sous 30 jours &agrave; compter de la demande.",
        "Nous r&eacute;pondons sous 30 jours.",
      ),
    ),
  });
  const r = check(site);
  for (const lang of ["English", "Spanish", "French"]) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section gives only a response time`));
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say when the removal is complete`));
  }
  assert.equal(r.code, 1);
});

test("fails when the privacy policy promises only a response within 30 days", () => {
  const { site } = fixture({
    [PRIVACY]: swap("We complete the removal within 30 days of the request.", "We respond within 30 days."),
  });
  const r = check(site);
  expectFailure(r, /privacy: gives only a response time/);
  assert.match(r.out, /privacy: section 09 does not say when the removal is complete/);
});

// ---- finding: the audit history cannot be de-identified ---------------------------------

test("fails when the pages promise de-identification without the audit history exception", () => {
  const { site } = fixture({
    [PRIVACY]: (t) => t.replace(/\s*<tr><td>Security audit history<\/td>[\s\S]*?<\/tr>/, ""),
    [DELETE]: pipe(
      (t) => t.replace(/\s*<li><b>Kept: our security audit history\.<\/b>[\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li><b>Se conserva: nuestro historial de auditor&iacute;a de seguridad\.<\/b>[\s\S]*?<\/li>/, ""),
      (t) => t.replace(/\s*<li><b>Conserv&eacute;&nbsp;: notre historique d&rsquo;audit de s&eacute;curit&eacute;\.<\/b>[\s\S]*?<\/li>/, ""),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 08 has no row for the security audit history/);
  for (const lang of ["English", "Spanish", "French"]) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say the security audit history keeps some details`));
  }
});

// ---- finding: deleted work orders and emergency reports are kept too ---------------------
// Deleting a work order writes the whole row to the append-only work_order_deletions
// table, and a real EMERGENCY work order cannot be deleted (api migration
// 20260928150000_next_batch, live since prod-v6.3.0).

test("fails when the pages say the audit history is the only thing kept after deletion", () => {
  const { site } = fixture({
    [PRIVACY]: pipe(
      (t) => t.replace(/\s*<tr><td>Copies of deleted work orders<\/td>[\s\S]*?<\/tr>/, ""),
      swap(
        "Two kinds of records also keep some of your details even after they are removed, as listed above: the security audit history, and copies of deleted work orders. Emergency reports cannot be deleted on their own.",
        "The security audit history is the exception: it keeps the details listed above.",
      ),
    ),
    [DELETE]: pipe(
      (t) => t.replace(/\s*<li><b>Kept: copies of deleted work orders\.<\/b>[\s\S]*?<\/li>/, ""),
      swap("<li><b>Kept: our security audit history.</b> It cannot be changed or deleted,", "<li>One exception: our security audit history cannot be changed or deleted,"),
      (t) => t.replace(/\s*<li><b>Se conservan: copias de &oacute;rdenes de trabajo eliminadas\.<\/b>[\s\S]*?<\/li>/, ""),
      swap(
        "<li><b>Se conserva: nuestro historial de auditor&iacute;a de seguridad.</b> No se puede modificar ni eliminar,",
        "<li>Una excepci&oacute;n: nuestro historial de auditor&iacute;a de seguridad no se puede modificar ni eliminar,",
      ),
      (t) => t.replace(/\s*<li><b>Conserv&eacute;es&nbsp;: les copies des ordres de travail supprim&eacute;s\.<\/b>[\s\S]*?<\/li>/, ""),
      swap(
        "<li><b>Conserv&eacute;&nbsp;: notre historique d&rsquo;audit de s&eacute;curit&eacute;.</b> Il ne peut",
        "<li>Une exception&nbsp;: notre historique d&rsquo;audit de s&eacute;curit&eacute; ne peut",
      ),
    ),
  });
  const r = check(site);
  expectFailure(r, /privacy: section 08 has no row for copies of deleted work orders/);
  assert.match(r.out, /privacy: section 08 does not say emergency reports cannot be deleted/);
  assert.match(r.out, /privacy: presents one store as the only thing kept after deletion/);
  for (const lang of ["English", "Spanish", "French"]) {
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say copies of deleted work orders are kept`));
    assert.match(r.out, new RegExp(`delete-account: ${lang} section does not say emergency reports cannot be deleted`));
    assert.match(r.out, new RegExp(`delete-account: ${lang} section presents one store as the only thing kept after deletion`));
  }
});

test("fails when the retention table says a work order's location lasts only as long as the record", () => {
  const { site } = fixture({
    [PRIVACY]: swap(
      "<td>As long as the record they belong to, except for deleted work orders (next row).</td>",
      "<td>As long as the record they belong to.</td>",
    ),
  });
  expectFailure(check(site), /privacy: section 08 says a location saved with a record is kept only as long as the record/);
});

test("a deleted-work-order disclosure that appears only in a TODO(Josh) note does not count", () => {
  const { site } = fixture({
    [DELETE]: (t) =>
      t.replace(
        /<li><b>Kept: copies of deleted work orders\.<\/b>[\s\S]*?(<span class="todo">)/,
        "<li>$1Deleted work orders are kept. Emergency reports cannot be deleted. ",
      ),
  });
  const r = check(site);
  expectFailure(r, /delete-account: English section does not say copies of deleted work orders are kept/);
  assert.match(r.out, /delete-account: English section does not say emergency reports cannot be deleted/);
});

// ---- finding: the app's own deletion and location text must match the pages -------------

test("--app-locales passes when the app's text matches the pages", () => {
  const { dir, site } = fixture();
  const r = check(site, `--app-locales=${writeLocales(dir)}`);
  assert.equal(r.code, 0, r.out);
});

test("--app-locales fails when the app still offers the in-app deletion request", () => {
  const { dir, site } = fixture();
  // The 1.1.0 strings on iqs-flow-mobile origin/claude/sdk57-store-release, which the
  // account policy of 2026-09-30 replaces with an explanation.
  const locales = writeLocales(dir, {
    en: { "profile.sendDeleteRequest": "Send request" },
    es: { "profile.sendDeleteRequest": "Enviar solicitud" },
    fr: { "profile.sendDeleteRequest": "Envoyer la demande" },
  });
  const r = check(site, `--app-locales=${locales}`);
  expectFailure(r, /app en\.json: still has profile\.sendDeleteRequest \("Send request"\), the in-app deletion request/);
  assert.match(r.out, /app es\.json: still has profile\.sendDeleteRequest/);
  assert.match(r.out, /app fr\.json: still has profile\.sendDeleteRequest/);
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

test("--app-locales fails when the app's location notice does not mention the employer's clients", () => {
  const { dir, site } = fixture();
  const locales = writeLocales(dir, {
    en: { "locationPermission.body": "Your supervisor, and coworkers who use the app, can see your location on the map." },
    es: { "locationPermission.body": "Tu supervisor y tus compañeros que usan la app pueden ver tu ubicación en el mapa." },
    fr: { "locationPermission.body": "Votre superviseur et vos collègues qui utilisent l'application peuvent voir votre position sur la carte." },
  });
  const r = check(site, `--app-locales=${locales}`);
  expectFailure(r, /app en\.json: locationPermission\.body does not say your employer's clients can see your live position/);
  assert.match(r.out, /app es\.json: locationPermission\.body does not say your employer's clients/);
  assert.match(r.out, /app fr\.json: locationPermission\.body does not say your employer's clients/);
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
  // Needed only because publishReady() gives location check-ins a 30-day period.
  locationCleanupOnProd: "2026-10-01",
};
const stripTodos = pipe(
  (t) => t.replace(/<div class="legal-draft"[^>]*>[\s\S]*?<\/div>/, ""),
  (t) => t.replace(/\s*<span class="todo">TODO\(Josh\)[^<]*<\/span>/g, ""),
);
const nameEntity = swap("Integrity Quality Solutions", ENTITY);
/** Every TODO answered and the entity confirmed everywhere: only the sign-off file differs. */
function publishReady(
  termsEdit = swap("IQS Flow, Inc.", ENTITY),
  homeEdit = swap("© 2026 INTEGRITY QUALITY SOLUTIONS", `© 2026 ${ENTITY.toUpperCase()}`),
) {
  const f = fixture({
    [PRIVACY]: pipe(stripTodos, nameEntity, locationRetention("30 days, then deleted automatically.")),
    [SUBS]: pipe(stripTodos, nameEntity),
    [DELETE]: pipe(stripTodos, nameEntity),
    [SHARED_JS]: pipe(swap("TODO(Josh)", "NOTE"), swap("INTEGRITY QUALITY SOLUTIONS", ENTITY.toUpperCase())),
    [HOME]: homeEdit,
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

test("--publish fails when the location check-ins row gives no period once its TODO is gone", () => {
  const { dir, site } = publishReady();
  const file = path.join(site, PRIVACY);
  writeFileSync(file, locationRetention("")(readFileSync(file, "utf8")));
  const r = check(site, "--publish", `--signoff=${writeSignoff(dir, ALL_SIGNED)}`, `--app-locales=${writeLocales(dir)}`);
  expectFailure(r, /privacy: section 08 does not say how long location check-ins are kept/);
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

test("--publish fails while the homepage copyright does not name the confirmed legal entity", () => {
  const { dir, site } = publishReady(undefined, (t) => `${t}\n<!-- unchanged home -->`);
  const r = check(site, "--publish", `--signoff=${writeSignoff(dir, ALL_SIGNED)}`, `--app-locales=${writeLocales(dir)}`);
  expectFailure(r, /index\.html copyright: does not name the confirmed legal entity/);
});

// ---- finding: the rest of the site still named IQS Flow, Inc. ---------------------------

test("fails when the homepage footer names IQS FLOW, INC.", () => {
  const { site } = fixture({ [HOME]: swap("© 2026 INTEGRITY QUALITY SOLUTIONS", "© 2026 IQS FLOW, INC.") });
  const r = check(site);
  expectFailure(r, /index\.html copyright: does not name the company "Integrity Quality Solutions"/);
  assert.match(r.out, /note {2}index\.html: names IQS Flow, Inc\./);
  const published = check(site, "--publish");
  assert.match(published.out, /FAIL {2}index\.html: names IQS Flow, Inc\., a different entity from the legal pages/);
});

test("fails when a page's copyright names an unconfirmed entity type", () => {
  const { site } = fixture({ [HOME]: swap("© 2026 INTEGRITY QUALITY SOLUTIONS", "© 2026 INTEGRITY QUALITY SOLUTIONS LLC") });
  expectFailure(check(site), /index\.html copyright: names the entity as "INTEGRITY QUALITY SOLUTIONS LLC"/);
});

// ---- finding: third-party resources the website loads must be listed --------------------

test("fails when a page loads Credly and the subprocessors page does not list it", () => {
  const { site } = fixture({
    [SUBS]: (t) => t.replace(/\s*<tr><td>Credly<\/td>[\s\S]*?<\/tr>/, ""),
  });
  const r = check(site);
  expectFailure(r, /subprocessors: the Website table does not list Credly, which about\/index\.html loads from cdn\.credly\.com/);
});

test("fails when a page loads a third-party host the check does not know", () => {
  const { site } = fixture({
    [ABOUT]: swap("</body>", '<script async src="https://cdn.example-analytics.com/t.js"></script>\n</body>'),
  });
  expectFailure(check(site), /site: about\/index\.html loads a resource from cdn\.example-analytics\.com, which this check does not know/);
});

// ---- existing checks still hold ---------------------------------------------------------

test("fails on an em dash in customer copy", () => {
  const { site } = fixture({ [SUBS]: swap("About this list.", "About this list — read me.") });
  expectFailure(check(site), /subprocessors: contains an em dash/);
});
