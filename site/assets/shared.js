/* Shared chrome (nav + footer) for secondary pages */
(function(){
  const pageKey = document.body.dataset.page || '';
  const nav = `
    <div class="nav-d">
      <div class="nav-d-inner">
        <a class="nav-d-logo" href="index.html"><span class="nav-d-mark"></span>IQS FLOW</a>
        <div class="nav-d-links">
          <a href="why-iqs.html">Why IQS</a><a href="about.html">About</a><a href="features.html">Features</a><a href="industries.html">Industries</a><a href="pricing.html">Pricing</a>
          <div class="nav-d-drop">
            <button class="nav-d-trigger" type="button">
              Resources
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="nav-d-drop-menu">
              <a href="blog.html">Blog<span class="sub">Field notes from the floor</span></a>
              <a href="api.html">API Documentation<span class="sub">REST, webhooks, SSO</span></a>
              <a href="vendor-accountability-score.html">Vendor Accountability Score<span class="sub">Our independent scoring methodology</span></a>
            </div>
          </div>
          <a class="nav-d-cta" href="contact.html">Request Demo</a>
        </div>
      </div>
    </div>
  `;
  const footer = `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <a class="nav-d-logo" href="index.html" style="margin-bottom:12px;display:inline-flex"><span class="nav-d-mark"></span>IQS FLOW</a>
          <p style="max-width:320px;line-height:1.55;margin:0">The independent quality intelligence layer for multi-vendor, multi-site operations.</p>
        </div>
        <div><h4>Product</h4><a href="features.html">Features</a><a href="industries.html">Industries</a><a href="pricing.html">Pricing</a><a href="api.html">API</a></div>
        <div><h4>Company</h4><a href="about.html">About</a><a href="why-iqs.html">Why IQS</a><a href="careers.html">Careers</a><a href="contact.html">Contact</a><a href="blog.html">Blog</a></div>
        <div><h4>Legal</h4><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div>
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
