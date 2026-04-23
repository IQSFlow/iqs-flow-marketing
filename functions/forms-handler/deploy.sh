#!/usr/bin/env bash
#
# Deploy the marketing forms handler as a Gen 2 Cloud Function.
# Idempotent: re-running redeploys the latest source.
#
# Prerequisites:
#   - Service account marketing-forms@crested-booking-488922-f7.iam.gserviceaccount.com exists
#   - Domain-wide delegation is granted in Workspace Admin (scope: gmail.send)
#   - Secret Manager secret `recaptcha-v3-secret` contains the reCAPTCHA secret key
#   - IMPERSONATE_USER env value set below matches the Workspace user to send-as

set -euo pipefail

PROJECT_ID="crested-booking-488922-f7"
REGION="us-central1"
FUNCTION_NAME="marketing-forms-handler"
SERVICE_ACCOUNT="marketing-forms@${PROJECT_ID}.iam.gserviceaccount.com"
IMPERSONATE_USER="${IMPERSONATE_USER:-noreply@iqsflow.com}"
TO_EMAIL="${TO_EMAIL:-sales@iqsflow.com}"

echo "==> Deploying ${FUNCTION_NAME} to ${REGION}"
echo "    Impersonate: ${IMPERSONATE_USER}"
echo "    To:          ${TO_EMAIL}"

gcloud functions deploy "${FUNCTION_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --gen2 \
  --runtime=nodejs20 \
  --source=. \
  --entry-point=handler \
  --trigger-http \
  --allow-unauthenticated \
  --memory=256MiB \
  --timeout=30s \
  --max-instances=10 \
  --service-account="${SERVICE_ACCOUNT}" \
  --set-env-vars="IMPERSONATE_USER=${IMPERSONATE_USER},TO_EMAIL=${TO_EMAIL}" \
  --set-secrets="RECAPTCHA_SECRET=recaptcha-v3-secret:latest"

echo ""
echo "==> Deployed. URL:"
gcloud functions describe "${FUNCTION_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --format="value(serviceConfig.uri)"
