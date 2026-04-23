/* Shared chrome (nav + footer) for secondary pages */
(function(){
  const pageKey = document.body.dataset.page || '';
  const nav = `
    <div class="nav-d">
      <div class="nav-d-inner">
        <a class="nav-d-logo" href="/"><span class="nav-d-mark"></span>IQS FLOW</a>
        <div class="nav-d-links">
          <a href="/why-iqs/">Why IQS</a><a href="/about/">About</a><a href="/features/">Features</a><a href="/industries/">Industries</a><a href="/pricing/">Pricing</a>
          <div class="nav-d-drop">
            <button class="nav-d-trigger" type="button">
              Resources
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="nav-d-drop-menu">
              <a href="/blog/">Blog<span class="sub">Field notes from the floor</span></a>
              <a href="/api/">API Documentation<span class="sub">REST, webhooks, SSO</span></a>
              <a href="/vendor-accountability-score/">Vendor Accountability Score<span class="sub">Our independent scoring methodology</span></a>
            </div>
          </div>
          <a class="nav-d-cta" href="/contact/">Request Demo</a>
        </div>
      </div>
    </div>
  `;
  const footer = `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <a class="nav-d-logo" href="/" style="margin-bottom:12px;display:inline-flex"><span class="nav-d-mark"></span>IQS FLOW</a>
          <p style="max-width:320px;line-height:1.55;margin:0">The independent quality intelligence layer for multi-vendor, multi-site operations.</p>
        </div>
        <div><h4>Product</h4><a href="/features/">Features</a><a href="/industries/">Industries</a><a href="/pricing/">Pricing</a><a href="/api/">API</a></div>
        <div><h4>Company</h4><a href="/about/">About</a><a href="/why-iqs/">Why IQS</a><a href="/careers/">Careers</a><a href="/contact/">Contact</a><a href="/blog/">Blog</a></div>
        <div><h4>Legal</h4><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 IQS FLOW, INC.</div>
        <div>Made for the people who have to answer for the work.</div>
      </div>
    </footer>
  `;
  const navSlot = document.getElementById('nav-slot');
  const footSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.outerHTML = nav;
  if (footSlot) footSlot.outerHTML = footer;
})();

/* ---------------- Form submissions ---------------------------------------
   Any <form class="iqs-form" data-form-type="..."> will be intercepted here.
   Required markup:
     - <form class="iqs-form" data-form-type="contact">
     - each field: <input name="..."> or <textarea name="...">
     - a success element: <div class="sent"> or <div class="af-sent">
   reCAPTCHA v3 token is obtained silently, appended to the payload, and
   verified server-side. Config lives in assets/config.js.
-------------------------------------------------------------------------- */
(function () {
  var cfg = (window.IQSFLOW_CONFIG || {});
  var SITE_KEY = cfg.recaptchaSiteKey || "";
  var ENDPOINT = cfg.formsEndpoint || "/api/forms/submit";
  var SITE_KEY_IS_PLACEHOLDER =
    !SITE_KEY || SITE_KEY.indexOf("PASTE_") === 0 || SITE_KEY === "__RECAPTCHA_SITE_KEY__";

  function collectFields(form) {
    var data = {};
    var nodes = form.querySelectorAll("input[name], textarea[name], select[name]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.type === "checkbox") data[el.name] = el.checked ? "yes" : "no";
      else if (el.type === "radio") { if (el.checked) data[el.name] = el.value; }
      else data[el.name] = el.value;
    }
    // Contact form exposes role via button state, not an input
    var activeRole = form.querySelector(".ct-role.is-active");
    if (activeRole && activeRole.dataset.role) data.role = activeRole.dataset.role;
    return data;
  }

  function showSuccess(form) {
    var sent = form.querySelector(".sent, .af-sent");
    if (sent) sent.style.display = "block";
    var interactive = form.querySelectorAll("input, textarea, select, button");
    for (var i = 0; i < interactive.length; i++) interactive[i].disabled = true;
  }

  function showError(form, msg) {
    var err = form.querySelector(".iqs-error");
    if (!err) {
      err = document.createElement("div");
      err.className = "iqs-error";
      err.style.cssText = "color:#b91c1c;margin-top:12px;font-size:13px;font-weight:500";
      form.appendChild(err);
    }
    err.textContent = msg || "Something went wrong. Please try again, or email sales@iqsflow.com directly.";
    err.style.display = "block";
  }

  async function getRecaptchaToken(action) {
    if (SITE_KEY_IS_PLACEHOLDER) return "";
    if (!window.grecaptcha || !window.grecaptcha.execute) return "";
    return new Promise(function (resolve) {
      window.grecaptcha.ready(function () {
        window.grecaptcha.execute(SITE_KEY, { action: action })
          .then(function (t) { resolve(t); })
          .catch(function () { resolve(""); });
      });
    });
  }

  async function submit(form) {
    var formType = form.dataset.formType || "";
    if (!formType) { showError(form, "Form misconfigured. Contact sales@iqsflow.com."); return; }

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }

    try {
      var token = await getRecaptchaToken(formType);
      var fields = collectFields(form);
      var payload = Object.assign({ form_type: formType, token: token }, fields);
      var res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) { showSuccess(form); return; }
      var msg = "Something went wrong. Please try again, or email sales@iqsflow.com directly.";
      try {
        var data = await res.json();
        if (data && data.error === "failed_bot_check") {
          msg = "The bot check didn't pass. Please refresh the page and try again.";
        } else if (data && data.error === "invalid_payload") {
          msg = "Please check every required field and try again.";
        } else if (data && data.error === "rate_limited") {
          msg = "You have sent too many submissions recently. Please try again in a few minutes, or email sales@iqsflow.com directly.";
        }
      } catch (e) { /* non-JSON response, keep default */ }
      showError(form, msg);
    } catch (err) {
      showError(form);
      if (window.console && console.error) console.error("form submit failed", err);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
    }
  }

  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (form && form.classList && form.classList.contains("iqs-form")) {
      e.preventDefault();
      submit(form);
    }
  });
})();
