import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import FAQAccordion from "@/components/FAQAccordion";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | IQS Flow",
  description:
    "Flexible plans for organizations managing cleaning vendors. From single-site oversight to enterprise multi-site deployments with unlimited vendors.",
  openGraph: {
    title: "Pricing | IQS Flow",
    description:
      "Quality oversight plans that scale with your vendor network. Single-site to enterprise.",
  },
};

const ink = {
  900: "#0a0f1a", 800: "#0f172a", 700: "#1e293b", 600: "#334155",
  500: "#475569", 400: "#64748b", 300: "#94a3b8", 200: "#cbd5e1",
  100: "#e2e8f0", 50: "#f1f5f9", 25: "#f8fafc",
};
const accent = "#2563eb";

const tiers = [
  {
    name: "Starter",
    desc: "For single-site operations getting started with independent quality oversight.",
    features: [
      "1 site, up to 25 workers",
      "1-2 cleaning vendors",
      "Worker GPS tracking",
      "Standard inspection forms",
      "Ticket management",
      "Basic reporting",
      "Mobile worker app",
      "Email support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
  {
    name: "Professional",
    desc: "For multi-site teams that need cross-vendor visibility and compliance scoring.",
    features: [
      "Up to 5 sites, 100 workers",
      "Multiple vendors",
      "Everything in Starter, plus:",
      "Custom inspection forms",
      "Compliance framework scoring",
      "Multi-vendor oversight dashboard",
      "Client portal access",
      "SLA tracking & alerts",
      "Analytics & exports",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlight: true,
  },
  {
    name: "Enterprise",
    desc: "For complex portfolios with vendor networks across many sites.",
    features: [
      "Unlimited sites & workers",
      "Unlimited vendors",
      "Everything in Professional, plus:",
      "Vendor portal access",
      "Multi-tenant architecture",
      "Custom API access",
      "SSO / SAML authentication",
      "Custom SLAs",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const comparisonFeatures = [
  { feature: "Sites", starter: "1", pro: "Up to 5", enterprise: "Unlimited" },
  { feature: "Workers", starter: "25", pro: "100", enterprise: "Unlimited" },
  { feature: "Cleaning Vendors", starter: "1-2", pro: "Multiple", enterprise: "Unlimited" },
  { feature: "GPS Tracking", starter: "\u2713", pro: "\u2713", enterprise: "\u2713" },
  { feature: "Inspections", starter: "Standard forms", pro: "Custom forms", enterprise: "Custom + API" },
  { feature: "Vendor Onboarding", starter: "-", pro: "\u2713", enterprise: "Unlimited" },
  { feature: "Vendor Portal", starter: "-", pro: "-", enterprise: "\u2713" },
  { feature: "Compliance Scoring", starter: "-", pro: "\u2713", enterprise: "\u2713" },
  { feature: "Client Portal", starter: "-", pro: "\u2713", enterprise: "\u2713" },
  { feature: "SLA Tracking", starter: "-", pro: "\u2713", enterprise: "Custom SLAs" },
  { feature: "Flight Integration", starter: "-", pro: "-", enterprise: "Coming Soon" },
  { feature: "API Access", starter: "-", pro: "-", enterprise: "\u2713" },
  { feature: "SSO / SAML", starter: "-", pro: "-", enterprise: "\u2713" },
  { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated AM" },
];

const faqItems = [
  { question: "How does billing work?", answer: "We offer annual contracts with monthly or annual payment options. All plans are custom-quoted based on your organization's needs. Contact our sales team for a personalized quote." },
  { question: "Can I switch plans?", answer: "Yes. You can upgrade your plan at any time, and we will prorate the difference. If you need to downgrade, changes take effect at the next billing cycle." },
  { question: "Do you offer pilots?", answer: "Absolutely. We offer a 30-day pilot program at a single site so you can see the value before committing to a full rollout. Our team will help you set up and get results fast." },
  { question: "What's the onboarding process?", answer: "Onboarding includes site setup, user provisioning, inspection form configuration, and training for your team. Professional and Enterprise plans include dedicated onboarding support." },
];

const everyPlanIncludes = [
  "Multi-tenant platform",
  "Mobile worker app",
  "Real-time data",
  "Full audit trail",
  "Encrypted data",
];

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", color: ink[900], background: "#ffffff" }}>
      <MarketingNav />

      {/* Hero */}
      <section style={{ padding: "100px 32px 72px", borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accent, marginBottom: 24 }}>
            Pricing
          </div>
          <h1 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 20, maxWidth: 600 }}>
            Oversight that scales with you.
          </h1>
          <p style={{ fontSize: 18, color: ink[500], lineHeight: 1.7, maxWidth: 520 }}>
            From a single location to a global network of sites and vendors.
            Every plan includes the core IQS Flow quality oversight platform.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: "64px 32px 72px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }} className="pricing-grid">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: "#ffffff",
                borderRadius: 10,
                padding: "32px 28px",
                border: tier.highlight ? `2px solid ${accent}` : `1px solid ${ink[100]}`,
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {tier.highlight && (
                <div style={{ position: "absolute", top: -12, left: 28, padding: "4px 14px", background: accent, color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Most Popular
                </div>
              )}
              <h3 style={{ fontSize: 20, fontWeight: 800, color: ink[900], marginBottom: 8, letterSpacing: "-0.3px" }}>{tier.name}</h3>
              <p style={{ fontSize: 14, color: ink[400], lineHeight: 1.6, marginBottom: 24 }}>{tier.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ fontSize: 14, color: ink[500], display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <Check size={14} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" style={{
                display: "block", textAlign: "center", padding: "13px 24px",
                background: tier.highlight ? accent : "#ffffff",
                color: tier.highlight ? "#fff" : ink[600],
                borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none",
                border: tier.highlight ? "none" : `1px solid ${ink[100]}`,
              }}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Every Plan Includes */}
      <section style={{ padding: "36px 32px", background: ink[25], borderTop: `1px solid ${ink[100]}`, borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 28 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: ink[600] }}>Every plan includes:</span>
          {everyPlanIncludes.map((item) => (
            <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: ink[500] }}>
              <Check size={13} style={{ color: "#059669" }} />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section style={{ padding: "72px 32px", background: ink[25] }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 32 }}>
            Compare Plans
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${ink[200]}` }}>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: ink[400], fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Feature</th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 700, color: ink[500] }}>Starter</th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 700, color: accent }}>Professional</th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 700, color: ink[500] }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map(({ feature, starter, pro, enterprise }, i) => (
                  <tr key={feature} style={{ borderBottom: `1px solid ${ink[100]}`, background: i % 2 === 0 ? "#ffffff" : ink[25] }}>
                    <td style={{ padding: "12px 16px", fontWeight: 500, color: ink[700] }}>{feature}</td>
                    <td style={{ textAlign: "center", padding: "12px 16px", color: starter === "-" ? ink[200] : starter === "\u2713" ? "#059669" : ink[500], fontWeight: starter === "\u2713" ? 700 : 400 }}>{starter}</td>
                    <td style={{ textAlign: "center", padding: "12px 16px", color: pro === "-" ? ink[200] : pro === "\u2713" ? "#059669" : ink[500], fontWeight: pro === "\u2713" ? 700 : 500 }}>{pro}</td>
                    <td style={{ textAlign: "center", padding: "12px 16px", color: enterprise === "-" ? ink[200] : enterprise === "\u2713" ? "#059669" : ink[500], fontWeight: enterprise === "\u2713" ? 700 : 400 }}>{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "72px 32px", background: "#ffffff", borderTop: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 32 }}>
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 32px", background: ink[900] }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-1px", marginBottom: 16 }}>
            Not sure which plan fits?
          </h2>
          <p style={{ color: ink[400], fontSize: 17, lineHeight: 1.6, marginBottom: 36 }}>
            Tell us about your vendor network and we will recommend the right
            plan for your organization.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: "#ffffff", color: ink[900], borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
            Talk to Sales <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <MarketingFooter />

      <style>{`
        @media (max-width: 767px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
