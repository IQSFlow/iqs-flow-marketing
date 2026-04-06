import type { Metadata } from "next";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "Terms of Service | IQS Flow",
  description: "Terms of service for IQS Flow by Integrity Quality Solutions.",
};

const sections = [
  {
    num: "01",
    title: "Use of Services",
    body: "IQS Flow is provided for use by authorized organizations and their employees for operations management. You agree to use the platform only for its intended purpose and in compliance with all applicable laws and regulations.",
  },
  {
    num: "02",
    title: "Account Responsibilities",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
  },
  {
    num: "03",
    title: "Intellectual Property",
    body: "The IQS Flow platform, including its design, features, and content, is the property of Integrity Quality Solutions. You may not copy, modify, distribute, or reverse engineer any part of the platform without our prior written consent.",
  },
  {
    num: "04",
    title: "Limitation of Liability",
    body: 'IQS Flow is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Integrity Quality Solutions shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.',
  },
  {
    num: "05",
    title: "Contact Us",
    body: "If you have questions about these Terms, please contact us at info@iqsflow.com.",
  },
];

export default function TermsPage() {
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
            Terms of Service
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
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the IQS Flow platform
          operated by Integrity Quality Solutions (&ldquo;IQS,&rdquo; &ldquo;we,&rdquo;{" "}
          &ldquo;our&rdquo;). By accessing or using our services, you agree to be bound by these
          Terms.
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
              fontFamily: '"Georgia", "Times New Roman", serif',
            }}
          >
            Have a question about these terms or how they apply to your organization?
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
