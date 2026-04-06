import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, Globe, Users, Building2, Lock, ArrowRight } from "lucide-react";
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

const ink = {
  900: "#0a0f1a",
  800: "#0f172a",
  700: "#1e293b",
  600: "#334155",
  500: "#475569",
  400: "#64748b",
  300: "#94a3b8",
  200: "#cbd5e1",
  100: "#e2e8f0",
  50: "#f1f5f9",
  25: "#f8fafc",
};
const accent = "#2563eb";

export default function WhyIqsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: '"DM Sans", system-ui, -apple-system, sans-serif',
        color: ink[800],
        background: "#ffffff",
      }}
    >
      <MarketingNav />

      {/* ─── Hero ─── */}
      <section
        style={{
          padding: "96px 32px 72px",
          width: "90%",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            background: ink[50],
            border: `1px solid ${ink[100]}`,
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            color: ink[500],
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            marginBottom: 32,
          }}
        >
          Why IQS Flow
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginBottom: 24,
            color: ink[900],
            maxWidth: 760,
          }}
        >
          The oversight layer that was missing.
        </h1>

        <p
          style={{
            fontSize: 20,
            color: ink[500],
            lineHeight: 1.65,
            maxWidth: 560,
            margin: 0,
          }}
        >
          You hire cleaning companies. They use their own tools. You have no
          visibility. IQS Flow changes that.
        </p>
      </section>

      {/* ─── Thin divider ─── */}
      <div style={{ borderTop: `1px solid ${ink[100]}` }} />

      {/* ─── Section 1: The Problem ─── */}
      <section
        style={{
          padding: "80px 32px",
          background: ink[25],
        }}
      >
        <div style={{ width: "90%", maxWidth: 1200, margin: "0 auto" }}>
          {/* Section label */}
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: ink[400],
              marginBottom: 16,
            }}
          >
            The Problem
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.15,
              marginBottom: 16,
              color: ink[900],
              maxWidth: 640,
            }}
          >
            Your vendors grade their own homework.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: ink[500],
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 48,
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
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 1,
              background: ink[100],
              border: `1px solid ${ink[100]}`,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {[
              {
                title: "No unified view",
                desc: "Each vendor reports differently. You piece together quality data from emails, spreadsheets, and occasional site visits.",
              },
              {
                title: "Vendor-controlled data",
                desc: "Your vendors grade their own homework. You rely on self-reported metrics with no independent verification.",
              },
              {
                title: "No cross-site comparison",
                desc: "You cannot compare quality across sites or across vendors. Every location is a black box.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#fff",
                  padding: "32px 28px",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: "#fef2f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <XCircle size={18} color="#dc2626" strokeWidth={2} />
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: ink[900],
                    letterSpacing: "-0.3px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: ink[500],
                    lineHeight: 1.65,
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

      {/* ─── Thin divider ─── */}
      <div style={{ borderTop: `1px solid ${ink[100]}` }} />

      {/* ─── Section 2: Their Data vs Your Data ─── */}
      <section style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{ width: "90%", maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: ink[400],
              marginBottom: 16,
            }}
          >
            The old way vs. IQS Flow
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.15,
              marginBottom: 48,
              color: ink[900],
              maxWidth: 560,
            }}
          >
            Their data versus your data.
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

      {/* ─── Thin divider ─── */}
      <div style={{ borderTop: `1px solid ${ink[100]}` }} />

      {/* ─── Section 3: How We're Different ─── */}
      <section
        style={{
          padding: "80px 32px",
          background: ink[25],
        }}
      >
        <div style={{ width: "90%", maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: ink[400],
              marginBottom: 16,
            }}
          >
            Head to Head
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.15,
              marginBottom: 16,
              color: ink[900],
              maxWidth: 560,
            }}
          >
            Built for the organization, not the vendor.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: ink[500],
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 48,
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
                borderRadius: 10,
                overflow: "hidden",
                border: `1px solid ${ink[100]}`,
              }}
            >
              <thead>
                <tr style={{ borderBottom: `2px solid ${ink[100]}` }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "14px 20px",
                      fontWeight: 600,
                      color: ink[400],
                      fontSize: 11,
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.06em",
                      width: "34%",
                    }}
                  ></th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "14px 20px",
                      fontWeight: 600,
                      color: ink[400],
                      fontSize: 13,
                    }}
                  >
                    Traditional Inspection Apps
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "14px 20px",
                      fontWeight: 700,
                      color: accent,
                      fontSize: 13,
                      background: "#eff6ff",
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
                    iqs: "The organization managing cleaning operations",
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
                ].map(({ label, traditional, iqs }, i) => (
                  <tr
                    key={label}
                    style={{
                      borderBottom: `1px solid ${ink[50]}`,
                      background: i % 2 === 0 ? "#fff" : ink[25],
                    }}
                  >
                    <td
                      style={{
                        padding: "13px 20px",
                        fontWeight: 600,
                        color: ink[800],
                        fontSize: 13,
                      }}
                    >
                      {label}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "13px 20px",
                        color: ink[400],
                        fontSize: 13,
                      }}
                    >
                      {traditional}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "13px 20px",
                        color: accent,
                        fontWeight: 600,
                        fontSize: 13,
                        background: i % 2 === 0 ? "#eff6ff" : "#e8f0fe",
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

      {/* ─── Thin divider ─── */}
      <div style={{ borderTop: `1px solid ${ink[100]}` }} />

      {/* ─── Section 4: Built for Scale ─── */}
      <section style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{ width: "90%", maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: ink[400],
              marginBottom: 16,
            }}
          >
            Architecture
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.15,
              marginBottom: 16,
              color: ink[900],
              maxWidth: 560,
            }}
          >
            Built for scale from day one.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: ink[500],
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 56,
            }}
          >
            IQS Flow is architected from the ground up for organizations
            managing cleaning vendors across many sites.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                icon: <Globe size={20} color={accent} strokeWidth={2} />,
                title: "Multi-Tenant",
                desc: "Each organization gets an isolated environment with their own data, users, and vendor configurations.",
              },
              {
                icon: <Users size={20} color={accent} strokeWidth={2} />,
                title: "Multi-Vendor",
                desc: "Track unlimited cleaning vendors from a single dashboard. Compare performance across partners.",
              },
              {
                icon: <Building2 size={20} color={accent} strokeWidth={2} />,
                title: "Multi-Site",
                desc: "From 5 locations to 500. Portfolio-wide quality views with drill-down to individual sites.",
              },
              {
                icon: <Lock size={20} color={accent} strokeWidth={2} />,
                title: "Role-Based Access",
                desc: "Four portal views (Admin, Manager, Worker, Client), each with exactly the data and permissions they need.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: ink[25],
                  borderRadius: 10,
                  padding: "28px 24px",
                  border: `1px solid ${ink[100]}`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#eff6ff",
                    border: `1px solid #bfdbfe`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: ink[900],
                    letterSpacing: "-0.3px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: ink[500],
                    lineHeight: 1.65,
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
          padding: "80px 32px",
          background: ink[900],
          color: "#fff",
        }}
      >
        <div style={{ width: "90%", maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: ink[400],
              marginBottom: 20,
            }}
          >
            Get started
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 20,
              color: "#fff",
              maxWidth: 640,
            }}
          >
            See the difference yourself.
          </h2>
          <p
            style={{
              color: ink[300],
              fontSize: 17,
              maxWidth: 520,
              marginBottom: 40,
              lineHeight: 1.65,
            }}
          >
            See how IQS Flow gives you the vendor oversight that traditional
            inspection apps were never designed to provide.
          </p>
          <div
            style={{
              display: "flex",
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
                padding: "14px 28px",
                background: "#fff",
                color: ink[900],
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Request a Demo
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              href="/industries"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                background: "transparent",
                color: ink[300],
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                border: `1px solid ${ink[700]}`,
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
