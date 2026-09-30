# iqs-flow-marketing

Public marketing site for **IQS Flow** — the janitorial QA platform from Integrity Quality Solutions (IQS). Live at **[iqsflow.com](https://iqsflow.com)**.

This is a **static HTML/CSS/JS site** — no framework, no bundler, no build step. The `site/` folder is rsynced verbatim to a Google Cloud Storage bucket served through Cloud CDN. A single Gen 2 Cloud Function (`functions/forms-handler`) backs the contact / careers / newsletter forms.

> The site was previously a Next.js app; it was migrated to plain static files (see the `archive-nextjs-2026-04-22` git tag). Do not reintroduce a framework or build pipeline without explicit sign-off — the "no build step" property is what keeps deploys a sub-minute file sync.

## Workspace context

One of the seven repos in the IQS Flow workspace:

| Repo | Role | Stack |
|---|---|---|
| `iqs-flow-shared` | Zod schemas, types, constants (`@iqsflow/shared`, Artifact Registry npm) | TypeScript |
| `iqs-flow-api` | REST API | Hono + Prisma + PostgreSQL → Cloud Run |
| `iqs-flow-web` | Dashboard + client/worker portals | Next.js 15 (App Router) → Cloud Run |
| `iqs-flow-mobile` | Cleaner app | Expo Android → EAS Build / Play Store |
| `iqs-flow-infra` | Infrastructure as code | Terraform |
| **`iqs-flow-marketing`** | **Public marketing site (this repo)** | **Static HTML/CSS/JS → GCS + Cloud CDN** |
| `iqs-flow-design-handoff` | Design assets / HTML→JSX handoff | — |

This repo is **not** in the `shared → api → web/mobile` dependency wave. It has no `@iqsflow/shared` dependency and ships independently. The only cross-system touchpoint is the forms Cloud Function (Gmail + reCAPTCHA), described below.

## Layout

```
site/                      # everything in here is served verbatim at iqsflow.com
  index.html               # home page
  assets/                  # shared.css, shared.js, config.js, article.css, logos, icons, photos
  about/  why-iqs/  features/  pricing/  industries/  contact/  careers/
  privacy/  terms/  api/   # api/ is the API-docs marketing page (not a live API)
  vendor-accountability-score/
  blog/                    # blog index
  article-*/               # individual blog/insight articles (one dir per article)
  job-intern/  job-junior/  job-sales/   # role-specific application pages
functions/
  forms-handler/           # Gen 2 Cloud Function: form submissions -> email
cloudbuild.yaml            # tag-triggered deploy (gsutil rsync + cache headers + CDN invalidate)
```

**Clean URLs:** each route is a directory containing `index.html` (e.g. `site/pricing/index.html` serves at `/pricing`). To add a page, create `site/<route>/index.html`. To add an article, create `site/article-<slug>/index.html` and link it from `site/blog/index.html`.

**Shared front-end pieces** live in `site/assets/`:
- `shared.css` — design tokens (CSS custom properties), layout, dark-mode (`html[data-theme="dark"]`). Cache-busted via `?v=N` query string in each page's `<link>`.
- `shared.js` — nav, theme toggle, and the form-submit helper that fetches a reCAPTCHA v3 token and POSTs to the forms endpoint.
- `config.js` — public client config: `recaptchaSiteKey` (public by design) and `formsEndpoint` (`/api/forms/submit`). Auto-injects the reCAPTCHA v3 script when a real site key is set.

## Local preview

No install needed for the static site — serve `site/` with any static server:

```bash
py -m http.server 8000 --directory site     # then open http://localhost:8000
# (use `py`, not python3 — python3 is a Store stub on this Windows setup)
```

Forms will not send locally (the `/api/forms/submit` route is wired by the production load balancer to the Cloud Function). reCAPTCHA also no-ops unless a real site key is present in `config.js`.

## Legal page check

`/privacy/`, `/subprocessors/` and `/delete-account/` are the URLs the App Store and Google Play listings point to. A no-dependency check covers them (links, anchors, tag balance, no em dashes, no unconfirmed legal entity in the pages, the site footer or any page's copyright line, every third-party host the site loads listed on `/subprocessors/`, no unused vendors, the services that work under their own terms named wherever a page says providers use data only for us, location wording that matches the app and the web dashboard (which saves the browser's location with an inspection), who can see a worker's location (coworkers on the app map, and the employer's clients, who get live positions at their sites), and what is kept after a removal (the security audit history, copies of deleted work orders, and emergency reports). A disclosure only inside a TODO(Josh) note does not count.

It also holds the pages to the account policy of 2026-09-30, in English, Spanish and French: the employer creates and manages every account, so the pages must not offer a worker self-deletion; they must say only an active administrator of the employer's account can ask at privacy@iqsflow.com, and only for people in that account; that the removal is complete within 30 days; which details are removed (contact details, sign-in code, email or Google sign-in, push tokens, location tracking history); and that work records stay as they are, with the worker's name and the location recorded with their work:

```bash
node scripts/check-legal-pages.mjs              # everyday check
node scripts/check-legal-pages.mjs --app-locales=../iqs-flow-mobile/locales
                                                # also compare the pages with the app's own text (location notice, no in-app deletion request)
node scripts/check-legal-pages.mjs --publish --app-locales=<release locales>
                                                # also fails while any TODO(Josh), draft notice or sign-off remains; run before tagging
node --test scripts/check-legal-pages.test.mjs  # tests for the check itself
```

`--app-locales` must point at the `locales/` folder of the mobile release that is on every phone. The check reads the location notice (`locationPermission.body`) in English, Spanish and French and fails when it leaves out who the pages say can see your location. It also fails while the app still has the in-app deletion request (`profile.sendDeleteRequest`), because the pages say only the employer can have an account's details removed. `--publish` requires it.

Facts that nothing in the code can confirm live in `scripts/legal-signoff.json`: the exact legal entity, the date counsel reviewed the pages, proof that the removal process (runbook) is live, and the app version on every phone. `--publish` fails while any of them is `null`.

## Forms Cloud Function (`functions/forms-handler`)

Gen 2 Cloud Function (`marketing-forms-handler`, Node 20, `us-central1`) that accepts form POSTs from iqsflow.com, verifies reCAPTCHA v3, validates the payload with Zod, and emails `sales@iqsflow.com` via the Gmail API using domain-wide delegation. The production load balancer URL map routes `iqsflow.com/api/forms/submit` to it.

- **Auth/email:** impersonates a Workspace user via the IAM Credentials `signJwt` DWD flow (no downloaded key). SA `marketing-forms@crested-booking-488922-f7.iam.gserviceaccount.com` needs `roles/iam.serviceAccountTokenCreator` on itself.
- **Spam controls:** reCAPTCHA v3 score gate (rejects `< 0.5`) + in-memory per-IP rate limit (5 / 10 min per instance, `max-instances=10`).
- **Allowed form types:** `contact`, `newsletter`, `job-intern`, `job-junior`, `job-sales`.
- **Privacy:** submissions are emailed and a metadata-only line is logged to Cloud Logging (no PII — no email/message/resume URLs in logs).
- **Secrets/env:** `RECAPTCHA_SECRET` from Secret Manager (`recaptcha-v3-secret:latest`); `IMPERSONATE_USER` (default `noreply@iqsflow.com`) and `TO_EMAIL` (default `sales@iqsflow.com`) set at deploy.

```bash
cd functions/forms-handler
npm install
npm run deploy        # = bash deploy.sh (gcloud functions deploy --gen2)
```

## Deploy (static site)

Deploys are **tag-triggered** Cloud Build. Pushing a `v*` tag runs `cloudbuild.yaml`, which:

1. `gsutil -m rsync -d -r -c site/ gs://iqsflow-marketing-static/` (mirrors `site/`, deleting removed files),
2. sets `Cache-Control` headers (immutable 1-year on css/js/images/fonts; 5-minute on HTML),
3. invalidates the Cloud CDN edge cache (`gcloud compute url-maps invalidate-cdn-cache iqs-flow-urlmap`).

```bash
git tag v3.10.0 && git push origin v3.10.0
```

> Versioning: this repo tracks its own `v3.x` line (current: `v3.9.0`) — independent of the api/web `v5.x` and shared `v2.x` lines. There is **no separate prod environment** for marketing: the single `iqsflow.com` site is production, so any `v*` tag publishes live. There is no `prod-v*` flow here.

Don't poll Cloud Build after pushing a tag — check status once if needed:

```bash
gcloud builds list --project=crested-booking-488922-f7 --region=us-central1 --limit=2 \
  --format="table(status,substitutions.TAG_NAME)"
```

## Conventions

- **Docs go direct to `main`** per the branch rule; feature/redesign work uses `claude/<task>` branches.
- **No unicode arrows** in scripts/SQL/HTML build output; PowerShell 5.1 has no `&&` / ternary — chain with `;` and `if ($?) { }`.
- Two-agent SDLC roles (Claude builder + Codex reviewer) are documented in `AGENTS.md`.

## GCP

- **Project:** `crested-booking-488922-f7` · **Region:** `us-central1`
- **Static hosting:** GCS bucket `iqsflow-marketing-static`, backend bucket `iqsflow-marketing-backend`, URL map `iqs-flow-urlmap`, Cloud CDN.
- **Forms:** Cloud Function `marketing-forms-handler` + Secret Manager (`recaptcha-v3-secret`) + Gmail DWD.
