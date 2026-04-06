import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, Globe, Users, Building2, Lock } from "lucide-react";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import ComparisonSection from "@/components/ComparisonSection";

export const metadata: Metadata = {
  title: "Why IQS Flow: Quality Oversight, Not Another Cleaning App",
  description:
    "Traditional inspection apps serve the cleaning company. IQS Flow serves the organization managing cleaning services. See why the difference matters.",
  openGraph: {
    title: "Why IQS Flow: Quality Oversight, Not Another Cleaning App",
    description:
      "The client-side quality oversight platform. Monitor every cleaning vendor, every site, every score.",
  },
};

export default function WhyIqsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
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
          Why IQS Flow
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
          The Oversight Layer{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            That Was Missing
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
          You hire cleaning companies. They use their own tools. You have no
          visibility. IQS Flow changes that.
        </p>
      </section>

      {/* ─── Section 1: The Problem ─── */}
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
            The Problem
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#475569",
              lineHeight: 1.7,
              maxWidth: 720,
              margin: "0 auto 32px",
              textAlign: "center",
            }}
          >
            You outsource cleaning to third-party vendors. Each vendor uses
            their own inspection tools, their own reporting, their own metrics.
            What do you actually know about the quality of work happening across
            your sites?
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                icon: <XCircle size={24} color="#ef4444" />,
                title: "No Unified View",
                desc: "Each vendor reports differently. You piece together quality data from emails, spreadsheets, and occasional site visits.",
              },
              {
                icon: <XCircle size={24} color="#ef4444" />,
                title: "Vendor-Controlled Data",
                desc: "Your vendors grade their own homework. You rely on self-reported metrics with no independent verification.",
              },
              {
                icon: <XCircle size={24} color="#ef4444" />,
                title: "No Cross-Site Comparison",
                desc: "You cannot compare quality across sites or across vendors. Every location is a black box.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "24px 22px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "#0f172a",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#475569",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 2: Their Data vs Your Data ─── */}
      <section style={{ padding: "48px 32px" }}>
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
            The old way vs. IQS Flow
          </h2>
          <ComparisonSection
            leftTitle="Their Data"
            rightTitle="Your Data"
            leftItems={[
              "Vendor self-reported metrics",
              "Spreadsheets emailed monthly",
              "No visibility into worker activity",
              "Different tools at every site",
              "No audit trail",
              "Site visits for quality checks",
            ]}
            rightItems={[
              "Independent inspections you control",
              "Live dashboards updated in real time",
              "GPS tracking of every crew, every shift",
              "One platform across all locations",
              "Complete digital audit trail",
              "Remote quality monitoring 24/7",
            ]}
          />
        </div>
      </section>

      {/* ─── Section 3: How We're Different ─── */}
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
            How we are different
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#475569",
              lineHeight: 1.7,
              maxWidth: 720,
              margin: "0 auto 32px",
              textAlign: "center",
            }}
          >
            Traditional inspection apps are built for cleaning companies.
            IQS Flow is built for the organizations that hire them.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
                background: "#ffffff",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "14px 18px",
                      fontWeight: 600,
                      color: "#94a3b8",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  ></th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "14px 18px",
                      fontWeight: 700,
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    Traditional Inspection Apps
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "14px 18px",
                      fontWeight: 700,
                      color: "#2563eb",
                      fontSize: 13,
                    }}
                  >
                    IQS Flow
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Built for",
                    traditional: "The cleaning company",
                    iqs: "The organization managing cleaning services",
                  },
                  {
                    label: "Data ownership",
                    traditional: "Vendor controls the data",
                    iqs: "You own all quality data",
                  },
                  {
                    label: "Vendor coverage",
                    traditional: "Single vendor",
                    iqs: "All vendors in one dashboard",
                  },
                  {
                    label: "Cross-site visibility",
                    traditional: "Per-site only",
                    iqs: "Portfolio-wide comparison",
                  },
                  {
                    label: "Compliance standards",
                    traditional: "Basic checklists",
                    iqs: "6 industry frameworks built in",
                  },
                  {
                    label: "Real-time tracking",
                    traditional: "Not included",
                    iqs: "Live GPS + activity feed",
                  },
                  {
                    label: "Vendor accountability",
                    traditional: "Self-reported",
                    iqs: "Independent, verifiable",
                  },
                ].map(({ label, traditional, iqs }) => (
                  <tr
                    key={label}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td
                      style={{
                        padding: "12px 18px",
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      {label}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "12px 18px",
                        color: "#94a3b8",
                      }}
                    >
                      {traditional}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "12px 18px",
                        color: "#2563eb",
                        fontWeight: 600,
                      }}
                    >
                      {iqs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Built for Scale ─── */}
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
            Built for scale
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#475569",
              lineHeight: 1.7,
              maxWidth: 720,
              margin: "0 auto 32px",
            }}
          >
            IQS Flow is architected from the ground up for organizations
            managing cleaning vendors across many sites.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                icon: <Globe size={24} color="#2563eb" />,
                title: "Multi-Tenant",
                desc: "Each organization gets an isolated environment with their own data, users, and vendor configurations.",
              },
              {
                icon: <Users size={24} color="#2563eb" />,
                title: "Multi-Vendor",
                desc: "Track unlimited cleaning vendors from a single dashboard. Compare performance across partners.",
              },
              {
                icon: <Building2 size={24} color="#2563eb" />,
                title: "Multi-Site",
                desc: "From 5 locations to 500. Portfolio-wide quality views with drill-down to individual sites.",
              },
              {
                icon: <Lock size={24} color="#2563eb" />,
                title: "Role-Based Access",
                desc: "Four portal views (Admin, Manager, Worker, Client), each with exactly the data and permissions they need.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "24px 22px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  textAlign: "left",
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 6,
                    color: "#0f172a",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#475569",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
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
            See the difference yourself
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
            See how IQS Flow gives you the vendor oversight that traditional
            inspection apps were never designed to provide.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
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
              Request a Demo <span style={{ fontSize: 18 }}>&rarr;</span>
            </Link>
            <Link
              href="/industries"
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
              See Industries
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
