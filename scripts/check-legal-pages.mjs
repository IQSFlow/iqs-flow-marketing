#!/usr/bin/env node
/**
 * Checks the public legal pages that the App Store and Google Play listings link to:
 *   /privacy/          privacy policy (with the mobile app section)
 *   /subprocessors/    service providers that process personal data
 *   /delete-account/   who removes an account and its personal details (the employer's
 *                      administrator files the request from Admin > Privacy; the app has
 *                      no sign-up and no self-deletion). This is the URL to give when a
 *                      store asks for an account deletion or data removal link.
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
  deletionProcessLive:
    "a written removal runbook must exist for employer requests filed from Admin > Privacy, matching /delete-account/, that covers the audit history and deleted work orders",
  appVersionWithGates:
    "the app version on every phone with the scheduled-shift location gate, the location notice, and the employer-managed account explanation in place of Delete my account",
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
// Accounts are the employer's (Josh's account policy, 2026-09-30). The employer creates
// and manages every account in the admin console; the app has no sign-up and no
// self-deletion. A worker who leaves is deactivated (sign-in blocked at once). Their work
// records stay exactly as they are, with their name and the GPS recorded with the work.
// Their contact details, sign-in code (last-4 hash), Firebase login, push tokens and
// location tracking history are removed only when an active ADMIN of that vendor tenant
// asks, for a member of that tenant, within 30 days.
// There is one filing path (iqs-flow-api docs/runbooks/former-worker-data-removal.md):
// the admin files from Admin > Privacy in the IQS Flow console (POST
// /api/privacy/delete-request), and the 30 days run from filing. An admin who emails
// privacy@iqsflow.com instead is asked to file there, so the request is verified. The
// person is deactivated first. An admin cannot file for themselves (403
// CANNOT_REQUEST_FOR_SELF): another admin in their account must, and no page sends them
// to privacy@ for it. A request covers the requesting employer's records and the
// person's one login; records another employer holds stay until that employer asks.
//   selfService       wording that offers a worker self-deletion (the old in-app steps,
//                     or "ask us to delete your account")
//   noSelfDelete      says you cannot delete your account yourself
//   adminOnly         only an active administrator of the employer's account can ask...
//   ownAccount        ...and only for people in that account
//   filesInConsole    the administrator files the request from Admin > Privacy
//   emailAnswered     an email to privacy@iqsflow.com is answered with a request to file
//                     there (checked in one paragraph or list item with the address)
//   emailFiling       the old instruction to send the request by email
//   deactivatedFirst  the employer deactivates the person first
//   selfRequest       an administrator cannot file for their own details; another
//                     administrator in their account must
//   otherEmployers    records another employer holds stay until that employer asks
//   completed         the removal is complete within 30 days (not just a reply)
//   fromFiling        the 30 days start on the day the request is filed
//   removed           each detail removed on the employer's request (checked in the list)
//   keptWithName      work records stay as they are, with the name and the recorded location
//   nameRemoved       the old promise that work records are kept without the name
// Rules marked "flat" below are tested with the tags removed (entities kept), so bold
// menu names such as <b>Admin &gt; Privacy</b> read as plain text.
const ADMIN_PRIVACY = String.raw`Admin (?:&gt;|>) Privacy`;
const ACCOUNT_POLICY = {
  en: {
    selfService: /\b(?:tap|touch)\b[^.]*\bDelete my account\b|\bSend request\b|\bask us to delete your account\b/i,
    noSelfDelete: /\bcannot delete your account yourself\b/i,
    adminOnly: /\bonly on requests from an active administrator\b/i,
    ownAccount: /\bonly for people in that account\b/i,
    // flat
    filesInConsole: new RegExp(String.raw`\bfiles the request from ${ADMIN_PRIVACY} in the IQS Flow console\b`, "i"),
    emailAnswered: new RegExp(String.raw`\bwe reply asking them to file the request from ${ADMIN_PRIVACY}`, "i"),
    emailFiling: /\bremoval requests go here\b|\basks by emailing\b|\bemails privacy@iqsflow\.com with\b/i,
    deactivatedFirst: /\bdeactivates? (?:the person(?:&rsquo;|'|’)s|your|their) account first\b/i,
    selfRequest: /\bcannot file a request for their own details\.\s*Another administrator in their account must file it\b/i,
    otherEmployers: /\banother employer\b[^.]*\bstay until that employer(?:&rsquo;|'|’)s administrator asks\b/i,
    fromFiling: /\bthe 30 days start on the day the request is filed\b/i,
    completed: /\bcomplete the removal within 30 days\b/i,
    replyOnly: /\brespond within 30 days\b/i,
    removed: {
      "contact details": /\bemail address and phone number\b/i,
      "the sign-in code": /\bsign-in code\b/i,
      "push notification tokens": /\bpush notification tokens\b/i,
      "location tracking history": /\blocation tracking history\b/i,
    },
    keptWithName:
      /\bstay as they are, with (?:your|their|the worker(?:&rsquo;|'|’)s) name and the location recorded with (?:your|their) work\b/i,
    nameRemoved: /\bwith (?:your|their|the worker(?:&rsquo;|'|’)s) (?:name|personal details) removed\b|\bwithout (?:your|their) name\b/i,
  },
  es: {
    selfService: /\btoca\b[^.]*\bEliminar mi cuenta\b|\bEnviar solicitud\b|\bpedirnos que eliminemos tu cuenta\b/i,
    noSelfDelete: /\bno puedes eliminar tu cuenta\b/i,
    adminOnly: /\bsolo atendemos solicitudes de un administrador activo\b/i,
    ownAccount: /\bsolo para personas de esa cuenta\b/i,
    filesInConsole: new RegExp(String.raw`\bpresenta la solicitud desde ${ADMIN_PRIVACY} en la consola de IQS Flow\b`, "i"),
    emailAnswered: new RegExp(String.raw`\ble respondemos pidi(?:&eacute;|é)ndole que presente la solicitud desde ${ADMIN_PRIVACY}`, "i"),
    emailFiling: /\bescribe a privacy@iqsflow\.com con\b/i,
    deactivatedFirst: /\bdesactiva primero la cuenta\b/i,
    selfRequest: /\bno puede presentar una solicitud para sus propios datos\.\s*Debe presentarla otro administrador de su cuenta\b/i,
    otherEmployers: /\botro empleador\b[^.]*\bse conservan hasta que el administrador de ese empleador lo pida\b/i,
    fromFiling: /\blos 30 d(?:&iacute;|í)as empiezan a contar el d(?:&iacute;|í)a en que se presenta la solicitud\b/i,
    completed: /\bcompletamos la eliminaci(?:&oacute;|ó)n en un plazo de 30 d(?:&iacute;|í)as\b/i,
    replyOnly: /\brespondemos en un plazo de 30\b/i,
    removed: {
      "contact details": /\bcorreo electr(?:&oacute;|ó)nico y el n(?:&uacute;|ú)mero de tel(?:&eacute;|é)fono\b/i,
      "the sign-in code": /\bc(?:&oacute;|ó)digo de acceso\b/i,
      "push notification tokens": /\btokens de notificaciones\b/i,
      "location tracking history": /\bhistorial de seguimiento de ubicaci(?:&oacute;|ó)n\b/i,
    },
    keptWithName:
      /\bse conservan tal como est(?:&aacute;|á)n, con (?:tu|su) nombre y la ubicaci(?:&oacute;|ó)n registrada con (?:tu|su) trabajo\b/i,
    nameRemoved: /\bsin (?:tu|su) nombre\b/i,
  },
  fr: {
    selfService: /\btouchez\b[^.]*\bSupprimer mon compte\b|\bEnvoyer la demande\b|\bnous demander de supprimer votre compte\b/i,
    noSelfDelete: /\bne pouvez pas supprimer votre compte vous-m(?:&ecirc;|ê)me\b/i,
    adminOnly: /\bne traitons que les demandes d(?:&rsquo;|'|’)un administrateur actif\b/i,
    ownAccount: /\bseulement pour des personnes de ce compte\b/i,
    filesInConsole: new RegExp(String.raw`\bd(?:&eacute;|é)pose la demande depuis ${ADMIN_PRIVACY} dans la console IQS Flow\b`, "i"),
    emailAnswered: new RegExp(
      String.raw`\bnous lui r(?:&eacute;|é)pondons en lui demandant de d(?:&eacute;|é)poser la demande depuis ${ADMIN_PRIVACY}`,
      "i",
    ),
    emailFiling: /(?:&eacute;|é)crit (?:&agrave;|à) privacy@iqsflow\.com en indiquant\b/i,
    deactivatedFirst: /\bd(?:&eacute;|é)sactive d(?:&rsquo;|'|’)abord le compte\b/i,
    selfRequest:
      /\bne peut pas d(?:&eacute;|é)poser de demande pour ses propres donn(?:&eacute;|é)es\.\s*Un autre administrateur de son compte doit la d(?:&eacute;|é)poser\b/i,
    otherEmployers:
      /\bun autre employeur\b[^.]*\bsont conserv(?:&eacute;|é)s jusqu(?:&rsquo;|'|’)(?:&agrave;|à) ce que l(?:&rsquo;|'|’)administrateur de cet employeur le demande\b/i,
    fromFiling: /\bles 30 jours commencent le jour o(?:&ugrave;|ù) la demande est d(?:&eacute;|é)pos(?:&eacute;|é)e\b/i,
    completed: /\bnous terminons la suppression sous 30 jours\b/i,
    replyOnly: /\bnous r(?:&eacute;|é)pondons sous 30 jours\b/i,
    removed: {
      "contact details": /\badresse e-mail et le num(?:&eacute;|é)ro de t(?:&eacute;|é)l(?:&eacute;|é)phone\b/i,
      "the sign-in code": /\bcode de connexion\b/i,
      "push notification tokens": /\bjetons de notification\b/i,
      "location tracking history": /\bhistorique de suivi de position\b/i,
    },
    keptWithName:
      /\brestent tels quels, avec (?:votre|son|le) nom et la position enregistr(?:&eacute;|é)e avec (?:votre|son) travail\b/i,
    nameRemoved: /\bsans (?:votre|son) nom\b/i,
  },
};
// Most providers use data only to run their service for us, but these work under the
// provider's own terms and privacy policy, so a page that makes the "only for us" claim
// must name them in the same paragraph or list item as an exception.
const ONLY_FOR_US = /\bonly to provide (?:its|their) services? to us\b/i;
const OWN_TERMS = /\bown terms\b/i;
const OWN_TERMS_SERVICES = ["reCAPTCHA", "Google Fonts", "Google Maps", "Apple Maps", "Credly"];
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

/** Paragraphs and list items, for rules that need a claim and its qualifier side by side. */
const blocks = (html) => [...html.matchAll(/<(li|p)\b[^>]*>[\s\S]*?<\/\1>/g)].map((m) => m[0]);

/** HTML with the tags removed and the entities kept, for the "flat" ACCOUNT_POLICY rules. */
const flat = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");

// An administrator's own details (en / es / fr). A paragraph or list item that talks about
// them must not send the administrator to privacy@iqsflow.com: the api answers
// CANNOT_REQUEST_FOR_SELF, and another administrator in their account must file it.
const OWN_DETAILS = /\b(?:their|your) own details\b|\bfor (?:themselves|yourself)\b|\bpropios datos\b|\bpropres donn(?:&eacute;|é)es\b/i;

/** No paragraph or list item tells an administrator to email us about their own details. */
function checkNoSelfEmail(page, html) {
  for (const block of blocks(withoutTodos(html))) {
    if (OWN_DETAILS.test(flat(block)) && /privacy@iqsflow\.com|mailto:/i.test(block)) {
      fail(
        page,
        "tells an administrator to email privacy@iqsflow.com about their own details; another administrator in their account must file the request",
      );
    }
  }
}

/** "Providers use data only to provide their service to us" must name the own-terms services. */
function checkOnlyForUs(page, html) {
  for (const block of blocks(withoutTodos(html))) {
    if (!ONLY_FOR_US.test(block)) continue;
    const missing = OWN_TERMS.test(block) ? OWN_TERMS_SERVICES.filter((s) => !block.includes(s)) : OWN_TERMS_SERVICES;
    if (!missing.length) continue;
    const one = missing.length === 1;
    fail(
      page,
      `says service providers use data only to provide their service to us, but does not say that ${missing.join(", ")} ${one ? "works" : "work"} under ${one ? "its" : "their"} own terms`,
    );
  }
}

/**
 * The account policy as one page, or one language of a page, states it. `removalHtml` is
 * the part that lists what is removed (so other lists, such as the audit history, which
 * also names the email address and phone number, do not count as the removal list).
 */
function checkAccountPolicy(page, where, lang, html, removalHtml = html) {
  const rule = ACCOUNT_POLICY[lang];
  const claims = withoutTodos(html);
  const removal = withoutTodos(removalHtml);
  const text = flat(claims);
  if (!rule.noSelfDelete.test(claims)) {
    fail(page, `${where} does not say you cannot delete your account yourself (your employer manages it)`);
  }
  if (!rule.adminOnly.test(claims) || !rule.ownAccount.test(claims)) {
    fail(page, `${where} does not say only an active administrator of the employer's account can ask, and only for people in that account`);
  }
  if (!rule.filesInConsole.test(text)) {
    fail(page, `${where} does not say the administrator files the request from Admin > Privacy in the IQS Flow console`);
  }
  const answered = blocks(claims).some((b) => b.includes("privacy@iqsflow.com") && rule.emailAnswered.test(flat(b)));
  if (!answered) {
    fail(page, `${where} does not say an email to privacy@iqsflow.com is answered with a request to file it from Admin > Privacy`);
  }
  if (rule.emailFiling.test(text)) {
    fail(page, `${where} tells the employer to send the removal request by email, but it is filed from Admin > Privacy`);
  }
  if (!rule.deactivatedFirst.test(text)) fail(page, `${where} does not say the employer deactivates the person first`);
  if (!rule.selfRequest.test(text)) {
    fail(page, `${where} does not say an administrator cannot file for their own details (another administrator in their account must file it)`);
  }
  if (!rule.otherEmployers.test(text)) {
    fail(page, `${where} does not say records another employer holds stay until that employer's administrator asks`);
  }
  if (!rule.completed.test(claims)) fail(page, `${where} does not say when the removal is complete (within 30 days of the request)`);
  if (!rule.fromFiling.test(text)) fail(page, `${where} does not say the 30 days start on the day the request is filed`);
  if (rule.replyOnly.test(claims)) fail(page, `${where} gives only a response time, not a completion time`);
  for (const [item, re] of Object.entries(rule.removed)) {
    if (!re.test(removal)) fail(page, `${where} does not list ${item} among the details removed on the employer's request`);
  }
  if (!rule.keptWithName.test(claims)) {
    fail(page, `${where} does not say work records stay as they are, with the worker's name and the location recorded with their work`);
  }
  if (rule.nameRemoved.test(claims)) fail(page, `${where} says work records are kept without the worker's name, but they keep it`);
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

  // The web dashboard asks the browser for its location on the Start inspection page and
  // sends it with the new run as gpsLatitude/gpsLongitude (iqs-flow-web
  // src/app/dashboard/inspections/runs/new/StartInspectionForm.tsx captureGps), so it is
  // saved with the inspection like a location from the app.
  const collectBlocks = blocks(withoutTodos(sectionBetween(privacy, "collect", "mobile")));
  const saysWebLocation = collectBlocks.some(
    (b) =>
      /\bweb dashboard\b/i.test(b) &&
      /\bbrowser\b[^.]*\blocation\b/i.test(b) &&
      /\bstart(?:s|ing)? an inspection\b/i.test(b) &&
      /\bsaved with the inspection\b/i.test(b),
  );
  if (!saysWebLocation) {
    fail(
      "privacy",
      "section 03 does not say the web dashboard asks your browser for your location when you start an inspection and saves it with the inspection",
    );
  }
  checkOnlyForUs("privacy", privacy);

  // Accounts are the employer's: no self-deletion, removal of personal details only at
  // an active administrator's request, completed within 30 days, work records kept with
  // the worker's name and location (ACCOUNT_POLICY).
  const deletion = sectionBetween(privacy, "delete", "rights");
  if (!/within 30 days/.test(privacy)) fail("privacy", "does not state the 30-day removal time");
  if (/respond within 30 days/i.test(privacy)) fail("privacy", "gives only a response time (\"respond within 30 days\"); say when the removal is complete");
  if (ACCOUNT_POLICY.en.selfService.test(withoutTodos(privacy))) {
    fail("privacy", "tells people they can delete their own account (in the app or by asking us), but accounts are removed only at the employer's request");
  }
  checkAccountPolicy("privacy", "section 09", "en", deletion);
  // One filing path everywhere on the page (section 15 is where people look for the inbox).
  if (ACCOUNT_POLICY.en.emailFiling.test(flat(withoutTodos(privacy)))) {
    fail("privacy", "tells employers to send removal requests by email, but they are filed from Admin > Privacy");
  }
  checkNoSelfEmail("privacy", privacy);

  // Children. Every account is created by an employer, so a report of a child's
  // information goes to privacy@iqsflow.com and is handled with the employer that created
  // the account; the old promise that we delete it ourselves is not the process.
  const children = withoutTodos(sectionBetween(privacy, "children", "changes"));
  if (/\bwe (?:will|can|would) (?:delete|remove) (?:it|them)\b/i.test(flat(children))) {
    fail("privacy", "section 13 promises that we delete a child's information ourselves, but we work with the employer that created the account");
  }
  if (!children.includes("privacy@iqsflow.com") || !/\bwork with the employer that created the account\b/i.test(flat(children))) {
    fail(
      "privacy",
      "section 13 does not say to tell us at privacy@iqsflow.com and that we work with the employer that created the account to remove a child's information",
    );
  }

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
  // A provider must have a row: naming it in a paragraph (such as the own-terms
  // exception in section 01) does not list it.
  const tables = (listed.match(/<table\b[\s\S]*?<\/table>/g) ?? []).join("\n");
  checkOnlyForUs("subprocessors", subs);
  for (const required of [
    "Cloud Run", "Cloud SQL", "Cloud Storage", "Gemini", "Gmail", "Firebase Cloud Messaging", "Expo Push Service", "Google Maps",
    // iPhone maps use MapKit (map.tsx provider is Google on Android only).
    "Apple Maps",
    // EAS Update receives a persistent EAS-Client-ID.
    "installation ID",
    // The client portal assistant sends Gemini an assembled data summary.
    "client portal assistant",
  ]) {
    if (!tables.includes(required)) fail("subprocessors", `does not list ${required}`);
  }
  // Directions send the phone's current coordinates to the Google Routes API
  // (map.tsx /api/routes/between?origin=..., map-routes.ts).
  if (!/<td>Google Maps Platform<\/td><td>[^<]*current location/i.test(listed)) {
    fail("subprocessors", "the Google Maps Platform row does not say directions start from the phone's current location");
  }
}

// ---- account deletion ---------------------------------------------------------
// Accounts are the employer's, so this page explains who removes what (ACCOUNT_POLICY)
// instead of giving a worker self-deletion steps.
const del = read(PAGES.deleteAccount);
if (!del) fail("delete-account", `missing ${PAGES.deleteAccount}`);
else {
  checkCommon("delete-account", del);
  for (const required of ["IQS Flow", "privacy@iqsflow.com", "within 30 days"]) {
    if (!del.includes(required)) fail("delete-account", `does not mention "${required}"`);
  }
  checkNoSelfEmail("delete-account", del);

  const section = (lang) => del.match(new RegExp(`<section[^>]*lang="${lang}"[^>]*>([\\s\\S]*?)<\\/section>`))?.[1] ?? null;
  const LANGS = [
    { name: "English", lang: "en", text: section("en"), audit: AUDIT_HISTORY },
    { name: "Spanish", lang: "es", text: section("es"), audit: /historial de auditor(?:&iacute;|í)a/i },
    { name: "French", lang: "fr", text: section("fr"), audit: /historique d(?:&rsquo;|'|’)audit/i },
  ];
  for (const l of LANGS) {
    if (!l.text) {
      fail("delete-account", `missing the ${l.name} section`);
      continue;
    }
    const where = `${l.name} section`;
    if (ACCOUNT_POLICY[l.lang].selfService.test(withoutTodos(l.text))) {
      fail("delete-account", `${where} tells people they can delete their own account (in the app or by asking us), but accounts are removed only at the employer's request`);
    }
    // The removal list sits between the "-remove" and "-kept" headings of each language.
    checkAccountPolicy("delete-account", where, l.lang, l.text, sectionBetween(l.text, `${l.lang}-remove`, `${l.lang}-kept`));
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
}

// ---- the app's own text (--app-locales) -----------------------------------------
// The pages repeat the app's location notice and its account rules, so they must match
// the strings on the release that is on every phone (iqs-flow-mobile locales/*.json).
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
  en: { coworkers: /\bco-?workers?\b/i, clients: /\bclients?\b/i },
  es: { coworkers: /compa[ñn]er[oa]s/i, clients: /\bclientes?\b/i },
  fr: { coworkers: /coll[èe]gues/i, clients: /\bclients?\b/i },
};
// The in-app deletion request (the Send request button of the 1.1.0 Delete my account
// screen). The account policy of 2026-09-30 replaces it with an explanation, so a release
// that still has it contradicts /delete-account/.
const APP_SELF_DELETE_KEY = "profile.sendDeleteRequest";
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

    const selfDelete = lookup(strings, APP_SELF_DELETE_KEY);
    if (typeof selfDelete === "string" && selfDelete.trim()) {
      fail(
        where,
        `still has ${APP_SELF_DELETE_KEY} ("${plainText(selfDelete).trim()}"), the in-app deletion request, but /delete-account/ says accounts are removed only at the employer's request; remove the option and its text from the app`,
      );
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
