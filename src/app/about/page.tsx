import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "About | IQS Flow",
  description:
    "Integrity Quality Solutions builds quality oversight software for organizations managing third-party cleaning vendors. Learn about our mission and what drives us.",
  openGraph: {
    title: "About | IQS Flow",
    description:
      "The quality intelligence platform for organizations managing cleaning services.",
  },
};

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        color: "#0f172a",
        background: "#ffffff",
      }}
    >
      <MarketingNav />

      {/* ─── Hero ─── */}
      <section
        style={{
          padding: "80px 32px 48px",
          textAlign: "center",
          width: "90%",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 18px",
            background: "#dbeafe",
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 600,
            color: "#2563eb",
            marginBottom: 28,
          }}
        >
          About IQS
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
          Built for the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Client Side
          </span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#475569",
            lineHeight: 1.7,
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          Integrity Quality Solutions (IQS) builds software that gives
          organizations managing cleaning services the same level of visibility
          that their vendors have.
        </p>
      </section>

      {/* ─── Mission ─── */}
      <section
        style={{
          padding: "48px 32px",
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ width: "90%", maxWidth: 1400, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              marginBottom: 16,
              color: "#0f172a",
              textAlign: "center",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#475569",
              lineHeight: 1.7,
              maxWidth: 720,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Organizations that outsource cleaning, including airlines, airports, banks,
            hospitals deserve the same quality data their vendors keep
            internally. IQS Flow is the independent oversight layer that gives
            clients real-time visibility into vendor performance across every
            site, with compliance scoring against industry standards.
          </p>
        </div>
      </section>

      {/* ─── What We Are Not ─── */}
      <section style={{ padding: "48px 32px" }}>
        <div style={{ width: "90%", maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              marginBottom: 16,
              color: "#0f172a",
            }}
          >
            What IQS Flow is not
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#475569",
              lineHeight: 1.7,
              maxWidth: 720,
              margin: "0 auto 36px",
            }}
          >
            We are not another tool for cleaning companies to manage their
            crews. Your vendors already have those tools. IQS Flow is the
            quality oversight platform that sits on top, giving you,
            the client, independent visibility into what is actually happening
            across your sites.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
              textAlign: "left",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                borderTop: "3px solid #fecaca",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 15, color: "#ef4444", marginBottom: 12 }}>
                We are NOT
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "A janitorial scheduling tool",
                  "A cleaning company CRM",
                  "A vendor-side inspection app",
                  "A supply chain ordering system",
                ].map((item) => (
                  <li key={item} style={{ fontSize: 14, color: "#475569", display: "flex", gap: 8 }}>
                    <span style={{ color: "#ef4444", fontWeight: 700 }}>&#10007;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                borderTop: "3px solid #86efac",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 15, color: "#059669", marginBottom: 12 }}>
                We ARE
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "A client-side quality oversight platform",
                  "A multi-vendor monitoring dashboard",
                  "An independent compliance scoring engine",
                  "A cross-site quality intelligence tool",
                ].map((item) => (
                  <li key={item} style={{ fontSize: 14, color: "#475569", display: "flex", gap: 8 }}>
                    <span style={{ color: "#059669", fontWeight: 700 }}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section
        style={{
          padding: "48px 32px",
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ width: "90%", maxWidth: 1400, margin: "0 auto" }}>
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
            What Drives Us
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                icon: "&#128161;",
                title: "Client Transparency",
                desc: "The organization paying for cleaning services should have full visibility into the quality of work, not just what the vendor chooses to share.",
              },
              {
                icon: "&#128736;",
                title: "Independent Verification",
                desc: "Quality data should be collected independently, not self-reported. Our inspection and tracking tools give you verifiable, objective metrics.",
              },
              {
                icon: "&#128200;",
                title: "Data-Driven Decisions",
                desc: "Contract renewals, vendor selection, and quality improvements should be based on data, not anecdotes. IQS Flow gives you the numbers.",
              },
              {
                icon: "&#9989;",
                title: "Industry Standards",
                desc: "Built-in compliance frameworks (APPA, ISSA, Skytrax, Joint Commission) so you can measure every vendor against the same standards.",
              },
              {
                icon: "&#127760;",
                title: "Multi-Site Scale",
                desc: "Whether you manage 5 locations or 500, IQS Flow gives you portfolio-wide visibility with drill-down to every individual site.",
              },
              {
                icon: "&#128274;",
                title: "Security First",
                desc: "Encrypted sessions, role-based access control, and audit logging for every action. Your quality data is secure and yours alone.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "28px 26px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "#dbeafe",
                    border: "1px solid #bfdbfe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 16,
                  }}
                  dangerouslySetInnerHTML={{ __html: icon }}
                />
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "#0f172a",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: 0 }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Leadership ─── */}
      <section style={{ padding: "48px 32px" }}>
        <div style={{ width: "90%", maxWidth: 1400, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              marginBottom: 8,
              color: "#0f172a",
              textAlign: "center",
            }}
          >
            Leadership
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              textAlign: "center",
              marginBottom: 32,
              marginTop: 0,
            }}
          >
            Atlanta, Georgia
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 32,
            }}
          >
            {/* Venice Collier */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "32px 28px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/venice-collier.jpg"
                alt="Venice Collier"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto 20px",
                  display: "block",
                  border: "3px solid #e2e8f0",
                }}
              />
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 4,
                  marginTop: 0,
                }}
              >
                Venice Collier
              </h3>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#2563eb",
                  marginBottom: 20,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                }}
              >
                Chief Executive Officer
              </div>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 14px", textAlign: "left" }}>
                Venice brings deep expertise in operations management, workforce administration, and operational leadership built through her experience at Ubiquity Resources Group and ABM Industries, two of the largest facilities services organizations in North America.
              </p>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 14px", textAlign: "left" }}>
                Over the course of her career, she has operated within demanding service environments where quality assurance, compliance, accountability, and workforce coordination are vital to success. Through that experience, she saw firsthand the gap between the level of service clients expect and what many vendors deliver in practice.
              </p>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0, textAlign: "left" }}>
                That insight became the foundation for IQS Flow - a platform created to improve transparency, strengthen operational oversight, and drive measurable quality and accountability across service operations.
              </p>
            </div>

            {/* Joshua Hinton */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "32px 28px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/joshua-hinton.jpg"
                alt="Joshua Hinton"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto 20px",
                  display: "block",
                  border: "3px solid #e2e8f0",
                }}
              />
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 4,
                  marginTop: 0,
                }}
              >
                Joshua Hinton
              </h3>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#2563eb",
                  marginBottom: 20,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                }}
              >
                Chief Operating Officer
              </div>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 14px", textAlign: "left" }}>
                Joshua is a CISSP-certified engineer and Georgia Tech alumnus with a background spanning cloud infrastructure at AWS, AI and machine learning systems, and healthcare technology at Medeloop. His career has been defined by building secure, scalable platforms that handle complex data at enterprise scale.
              </p>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 14px", textAlign: "left" }}>
                At IQS, he leads product and engineering, designing the multi-tenant architecture, real-time event systems, and AI-driven analytics that power the platform. His approach combines cloud-native infrastructure with practical operational intelligence, ensuring every deployment is secure, performant, and built for growth.
              </p>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0, textAlign: "left" }}>
                He brings the same rigor to the platform that operations teams demand from their vendors: measurable results, full transparency, and zero excuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        style={{
          position: "relative",
          padding: "56px 32px",
          background: "linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)",
          color: "#fff",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              marginBottom: 16,
              letterSpacing: "-0.8px",
            }}
          >
            Ready to take control of vendor quality?
          </h2>
          <p
            style={{
              color: "rgba(219,234,254,0.85)",
              fontSize: 17,
              maxWidth: 720,
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            Talk to our team about how IQS Flow can give your organization
            visibility into cleaning vendor performance.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
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
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
            >
              Contact Us <span style={{ fontSize: 18 }}>&rarr;</span>
            </Link>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "16px 28px",
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
