import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import FAQAccordion from "@/components/FAQAccordion";

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
  {
    question: "How does billing work?",
    answer:
      "We offer annual contracts with monthly or annual payment options. All plans are custom-quoted based on your organization's needs. Contact our sales team for a personalized quote.",
  },
  {
    question: "Can I switch plans?",
    answer:
      "Yes. You can upgrade your plan at any time, and we will prorate the difference. If you need to downgrade, changes take effect at the next billing cycle.",
  },
  {
    question: "Do you offer pilots?",
    answer:
      "Absolutely. We offer a 30-day pilot program at a single site so you can see the value before committing to a full rollout. Our team will help you set up and get results fast.",
  },
  {
    question: "What's the onboarding process?",
    answer:
      "Onboarding includes site setup, user provisioning, inspection form configuration, and training for your team. Professional and Enterprise plans include dedicated onboarding support.",
  },
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
    <div
      style={{
        minHeight: "100vh",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        color: "#1e293b",
        background: "#ffffff",
      }}
    >
      <MarketingNav />

      {/* Hero */}
      <section
        style={{
          padding: "100px 32px 70px",
          textAlign: "center",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 18px",
            background: "#dbeafe",
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 600,
            color: "#2563eb",
            marginBottom: 32,
          }}
        >
          Pricing
        </div>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: 20,
            color: "#0f172a",
          }}
        >
          Oversight That{" "}
          <span style={{ color: "#2563eb" }}>Scales With You</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#64748b",
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          From a single facility to a global network of sites and vendors.
          Every plan includes the core IQS Flow quality oversight platform.
        </p>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: "0 32px 72px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "32px 28px",
                border: tier.highlight
                  ? "2px solid #2563eb"
                  : "1px solid #e2e8f0",
                borderTop: tier.highlight
                  ? "3px solid #2563eb"
                  : "1px solid #e2e8f0",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: tier.highlight
                  ? "0 4px 24px rgba(37,99,235,0.12)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              {tier.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "4px 16px",
                    background: "#2563eb",
                    color: "#fff",
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Most Popular
                </div>
              )}
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: 8,
                  letterSpacing: "-0.5px",
                }}
              >
                {tier.name}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                {tier.desc}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 14,
                      color: "#475569",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#2563eb", fontWeight: 700, flexShrink: 0 }}>
                      &#10003;
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "13px 24px",
                  background: tier.highlight ? "#2563eb" : "#ffffff",
                  color: tier.highlight ? "#fff" : "#1e293b",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: tier.highlight ? "none" : "1px solid #e2e8f0",
                  transition: "all 0.2s",
                }}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section
        style={{
          padding: "60px 32px",
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              marginBottom: 32,
              color: "#0f172a",
              textAlign: "center",
            }}
          >
            Compare Plans
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontWeight: 600,
                      color: "#64748b",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Feature
                  </th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 700, color: "#475569" }}>
                    Starter
                  </th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 700, color: "#2563eb" }}>
                    Professional
                  </th>
                  <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 700, color: "#475569" }}>
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map(({ feature, starter, pro, enterprise }, i) => (
                  <tr
                    key={feature}
                    style={{
                      borderBottom: "1px solid #e2e8f0",
                      background: i % 2 === 0 ? "#ffffff" : "#f8fafc",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontWeight: 500,
                        color: "#1e293b",
                      }}
                    >
                      {feature}
                    </td>
                    <td style={{ textAlign: "center", padding: "12px 16px", color: starter === "-" ? "#cbd5e1" : starter === "\u2713" ? "#059669" : "#475569", fontWeight: starter === "\u2713" ? 700 : 400 }}>
                      {starter}
                    </td>
                    <td style={{ textAlign: "center", padding: "12px 16px", color: pro === "-" ? "#cbd5e1" : pro === "\u2713" ? "#059669" : "#475569", fontWeight: pro === "\u2713" ? 700 : 500 }}>
                      {pro}
                    </td>
                    <td style={{ textAlign: "center", padding: "12px 16px", color: enterprise === "-" ? "#cbd5e1" : enterprise === "\u2713" ? "#059669" : "#475569", fontWeight: enterprise === "\u2713" ? 700 : 400 }}>
                      {enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Every Plan Includes */}
      <section
        style={{
          padding: "48px 32px",
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 24,
            }}
          >
            Every plan includes
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            {everyPlanIncludes.map((item) => (
              <span
                key={item}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "#475569",
                }}
              >
                <span style={{ color: "#059669", fontWeight: 700 }}>&#10003;</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "72px 32px", background: "#ffffff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              marginBottom: 32,
              color: "#0f172a",
              textAlign: "center",
            }}
          >
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 32px",
          background: "linear-gradient(165deg, #1e40af 0%, #2563eb 100%)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              marginBottom: 16,
              letterSpacing: "-0.8px",
            }}
          >
            Not sure which plan fits?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              marginBottom: 32,
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Tell us about your vendor network and we will recommend the right
            plan for your organization.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 36px",
              background: "#fff",
              color: "#1e40af",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Talk to Sales <span style={{ fontSize: 18 }}>&rarr;</span>
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
