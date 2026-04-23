/**
 * Public client-side config for iqsflow.com.
 *
 * The reCAPTCHA v3 site key is public by design — it only identifies
 * which reCAPTCHA site to verify against. The secret key stays in
 * Secret Manager on the server.
 *
 * ONE PLACE TO EDIT: when you register reCAPTCHA at
 * https://www.google.com/recaptcha/admin, paste the site key here.
 * Nothing else to update across the site.
 */
window.IQSFLOW_CONFIG = {
  recaptchaSiteKey: "PASTE_RECAPTCHA_V3_SITE_KEY_HERE",
  formsEndpoint: "/api/forms/submit",
};

/* Auto-inject the reCAPTCHA v3 script if a real site key is configured */
(function () {
  var key = window.IQSFLOW_CONFIG.recaptchaSiteKey;
  if (!key || key.indexOf("PASTE_") === 0) return;
  var s = document.createElement("script");
  s.src = "https://www.google.com/recaptcha/api.js?render=" + encodeURIComponent(key);
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
})();
