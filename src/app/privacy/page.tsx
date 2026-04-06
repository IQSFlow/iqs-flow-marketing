import type { Metadata } from "next";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | IQS Flow",
  description: "Privacy policy for IQS Flow by Integrity Quality Solutions.",
};

const sections = [
  {
    num: "01",
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your name, email address, company name, and any messages you send through our contact forms. When you use the IQS Flow platform, we also collect usage data including login activity, inspection records, and GPS location data from the worker mobile app (with permission).",
  },
  {
    num: "02",
    title: "How We Use Your Information",
    body: "We use your information to provide and improve the IQS Flow platform, respond to your inquiries, and communicate with you about our services. We do not sell your personal information to third parties.",
  },
  {
    num: "03",
    title: "Data Security",
    body: "We implement industry-standard security measures to protect your data, including encrypted sessions, role-based access controls, and audit logging. All data is stored securely and access is restricted to authorized personnel.",
  },
  {
    num: "04",
    title: "Contact Us",
    body: "If you have questions about this Privacy Policy, please contact us at info@iqsflow.com.",
  },
];

export default function PrivacyPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: '"Georgia", "Times New Roman", serif',
        color: "#0a0f1a",
        background: "#f8fafc",
      }}
    >
      <MarketingNav />

      {/* Hero header */}
      <div
        style={{
          background: "#0a0f1a",
          padding: "96px 32px 72px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#475569",
              marginBottom: 20,
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#f8fafc",
              margin: 0,
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 13,
              color: "#475569",
              marginTop: 20,
              marginBottom: 0,
            }}
          >
            Last updated: March 2026
          </p>
        </div>
      </div>

      {/* Intro */}
      <div style={{ padding: "64px 32px 0", maxWidth: 760, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.75,
            color: "#0f172a",
            borderLeft: "3px solid #2563eb",
            paddingLeft: 20,
            margin: 0,
          }}
        >
          Integrity Quality Solutions (&ldquo;IQS,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;)
          operates the IQS Flow platform. This Privacy Policy describes how we collect, use, and
          protect your information when you use our services.
        </p>
      </div>

      {/* Sections */}
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "56px 32px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {sections.map((s, i) => (
          <div
            key={s.num}
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr",
              gap: "0 32px",
              paddingTop: 40,
              paddingBottom: 40,
              borderBottom: i < sections.length - 1 ? "1px solid #e2e8f0" : "none",
            }}
          >
            <div
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#2563eb",
                paddingTop: 6,
              }}
            >
              {s.num}
            </div>
            <div>
              <h2
                style={{
                  fontFamily: '"Georgia", "Times New Roman", serif',
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#0a0f1a",
                  letterSpacing: "-0.01em",
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "#475569",
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA band */}
      <div style={{ background: "#0a0f1a", padding: "72px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#475569",
              marginBottom: 16,
            }}
          >
            Questions?
          </p>
          <p
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 400,
              color: "#f8fafc",
              lineHeight: 1.3,
              marginBottom: 32,
              maxWidth: 520,
            }}
          >
            Our team is happy to answer any questions about how we handle your data.
          </p>
          <a
            href="mailto:info@iqsflow.com"
            style={{
              display: "inline-block",
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: "#0a0f1a",
              background: "#f8fafc",
              padding: "12px 28px",
              borderRadius: 6,
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            info@iqsflow.com
          </a>
        </div>
      </div>

      <MarketingFooter />
    </div>
  );
}
