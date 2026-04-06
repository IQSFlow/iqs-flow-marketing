import type { Metadata } from "next";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "Security | IQS Flow",
  description: "How IQS Flow protects your data and keeps your operations secure.",
};

const practices = [
  {
    num: "01",
    title: "Encrypted Sessions",
    body: "All communication between clients and the IQS Flow platform is encrypted in transit using TLS 1.2 or higher. Session tokens are short-lived and rotated on each authentication event.",
  },
  {
    num: "02",
    title: "Role-Based Access Controls",
    body: "Every user in IQS Flow operates under a defined role: Admin, Manager, Worker, or Client. Access to data, actions, and reporting is scoped precisely to that role. No user can access resources outside their permission boundary.",
  },
  {
    num: "03",
    title: "Audit Logging",
    body: "Every state-changing action in the platform generates a tamper-evident audit log entry capturing the actor, timestamp, and change. Logs are retained for 12 months and available to administrators on demand.",
  },
  {
    num: "04",
    title: "Data Residency",
    body: "Customer data is stored in Google Cloud infrastructure. We do not store personally identifiable information outside of the contracted region without explicit written consent.",
  },
  {
    num: "05",
    title: "Mobile App Permissions",
    body: "The IQS Flow worker mobile app requests GPS location access only when actively tracking an assigned shift. No background location data is collected. Camera access is requested only when submitting photo evidence on an inspection form.",
  },
  {
    num: "06",
    title: "Responsible Disclosure",
    body: "If you believe you have found a security vulnerability in IQS Flow, please contact our security team at info@iqsflow.com before public disclosure. We commit to acknowledging reports within 48 hours.",
  },
];

const highlights: { label: string; detail: string }[] = [
  { label: "TLS 1.2+", detail: "In-transit encryption" },
  { label: "RBAC", detail: "Four-tier permission model" },
  { label: "12-month", detail: "Audit log retention" },
  { label: "GCP", detail: "Infrastructure provider" },
];

export default function SecurityPage() {
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
            Trust &amp; Safety
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
            Security at IQS Flow
          </h1>
          <p
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 16,
              color: "#94a3b8",
              marginTop: 24,
              marginBottom: 0,
              maxWidth: 480,
              lineHeight: 1.65,
            }}
          >
            Your operational data deserves more than checkbox compliance. Here is how we protect it.
          </p>
        </div>
      </div>

      {/* Stat strip */}
      <div
        style={{
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "32px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {highlights.map((h, i) => (
            <div
              key={h.label}
              style={{
                padding: "0 24px 0 0",
                borderRight: i < highlights.length - 1 ? "1px solid #1e293b" : "none",
                marginRight: i < highlights.length - 1 ? 24 : 0,
              }}
            >
              <div
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#f8fafc",
                  letterSpacing: "-0.02em",
                }}
              >
                {h.label}
              </div>
              <div
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: 12,
                  color: "#475569",
                  marginTop: 4,
                }}
              >
                {h.detail}
              </div>
            </div>
          ))}
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
          IQS Flow handles inspection records, shift data, GPS coordinates, and client reporting for
          operations teams. We treat that data with the same rigor we expect of the teams using our
          platform.
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
        {practices.map((s, i) => (
          <div
            key={s.num}
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr",
              gap: "0 32px",
              paddingTop: 40,
              paddingBottom: 40,
              borderBottom: i < practices.length - 1 ? "1px solid #e2e8f0" : "none",
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
            Security Questions
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
            Need a security review before onboarding? We can walk your team through our practices.
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
            Contact Security Team
          </a>
        </div>
      </div>

      <MarketingFooter />
    </div>
  );
}
