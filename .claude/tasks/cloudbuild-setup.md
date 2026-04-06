# Set up Cloud Build pipeline for marketing repo

Work on main branch. Do NOT stop to ask questions.

## Step 1: Create cloudbuild.yaml

Based on the web repo's pattern but simpler (no secrets needed, no API_URL, no Google Maps key, no session secret):

```yaml
# GCP Cloud Build - IQS Flow Marketing
substitutions:
  _REGION: us-central1
  _SERVICE: iqs-flow-marketing
  _REPO: iqs-flow

steps:
  - name: "gcr.io/cloud-builders/docker"
    id: build
    args:
      - build
      - "-t"
      - "${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_SERVICE}:$COMMIT_SHA"
      - "-t"
      - "${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_SERVICE}:latest"
      - "-f"
      - "Dockerfile"
      - "."
    timeout: "600s"

  - name: "gcr.io/cloud-builders/docker"
    id: push
    args:
      - push
      - "--all-tags"
      - "${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_SERVICE}"
    waitFor: ["build"]

  - name: "gcr.io/google.com/cloudsdktool/cloud-sdk"
    id: deploy
    entrypoint: gcloud
    args:
      - run
      - deploy
      - "${_SERVICE}"
      - "--image=${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_SERVICE}:$COMMIT_SHA"
      - "--region=${_REGION}"
      - "--platform=managed"
      - "--allow-unauthenticated"
      - "--memory=512Mi"
      - "--cpu=1"
      - "--min-instances=0"
      - "--max-instances=2"
      - "--port=3000"
      - "--set-env-vars=NODE_ENV=production"
      - "--cpu-boost"
    waitFor: ["push"]

images:
  - "${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_SERVICE}:$COMMIT_SHA"
  - "${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_SERVICE}:latest"

options:
  logging: CLOUD_LOGGING_ONLY
  machineType: "E2_MEDIUM"

timeout: "600s"
```

Note: no npmrc step needed since marketing doesn't import @iqsflow/shared at build time (it's bundled by Next.js from the local file: reference). No secrets needed since there's no auth, no API calls, no database.

## Step 2: Verify Dockerfile has output: standalone

Check that `next.config.ts` has `output: "standalone"` - this is required for the Docker multi-stage build.

## Step 3: Commit

```bash
git add cloudbuild.yaml
git commit -m "feat: add Cloud Build pipeline for marketing site"
```

## When done

Write `.claude/tasks/cloudbuild-setup.done.md` with the result.
