"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;
    const company = data.get("company") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`Demo Request from ${firstName} ${lastName} at ${company}`);
    const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${company}\n\n${message}`);
    window.location.href = `mailto:info@iqsflow.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    color: "#0f172a",
    background: "#f8fafc",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block" as const,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 500 as const,
    color: "#374151",
  };

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
          position: "relative",
          padding: "100px 32px 70px",
          textAlign: "center",
          maxWidth: 800,
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
            marginBottom: 32,
          }}
        >
          Contact Us
        </div>
        <h1
          style={{
            fontSize: "clamp(34px, 5vw, 54px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.08,
            marginBottom: 20,
            color: "#0f172a",
          }}
        >
          Let&apos;s Talk{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Quality
          </span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#475569",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          Whether you manage one site or fifty airports, we would
          love to show you how IQS Flow delivers independent vendor oversight.
        </p>
      </section>

      {/* ─── How It Works ─── */}
      <section
        style={{
          padding: "56px 32px",
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0f172a",
              textAlign: "center",
              marginBottom: 36,
              letterSpacing: "-0.5px",
            }}
          >
            How it works
          </h2>
          <div
            style={{
              display: "flex",
              gap: 32,
              flexWrap: "wrap" as const,
              justifyContent: "center",
            }}
          >
            {[
              {
                num: "1",
                title: "Tell us about your operations",
                desc: "Share your sites, vendors, and quality challenges.",
              },
              {
                num: "2",
                title: "See IQS Flow in action",
                desc: "We'll walk you through the platform with your scenario.",
              },
              {
                num: "3",
                title: "Go live in under a week",
                desc: "We handle setup and onboarding so you're running fast.",
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  flex: "1 1 220px",
                  maxWidth: 280,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: "#2563eb",
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Grid ─── */}
      <section style={{ padding: "0 32px 72px", background: "#f8fafc" }}>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            paddingTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 32,
          }}
        >
          {/* ── Form ── */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: "36px 32px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 4,
              }}
            >
              Request a Demo
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#475569",
                marginBottom: 28,
                lineHeight: 1.5,
              }}
            >
              Fill out the form and our team will reach out within one business
              day.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: "32px 24px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>&#10003;</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#15803d", marginBottom: 8 }}>
                  Thanks for reaching out!
                </h3>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                  Your email client should have opened with a pre-filled message.
                  If it didn&apos;t, please email us directly at{" "}
                  <strong style={{ color: "#0f172a" }}>info@iqsflow.com</strong>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      placeholder="Jane"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Work Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input
                    name="company"
                    type="text"
                    required
                    placeholder="Acme Airport Services"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>How can we help?</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your operation, number of sites, and what challenges you're facing..."
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "13px 24px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Send Message
                </button>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                  By submitting, you agree to our{" "}
                  <Link href="/privacy" style={{ color: "#475569", textDecoration: "underline" }}>
                    privacy policy
                  </Link>
                  . We&apos;ll never share your information.
                </p>
              </form>
            )}
          </div>

          {/* ── Contact Info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: "32px 28px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 20,
                }}
              >
                Get in Touch
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {[
                  { icon: <Mail size={16} color="#2563eb" />, label: "Email", value: "info@iqsflow.com" },
                  {
                    icon: <MapPin size={16} color="#2563eb" />,
                    label: "Office",
                    value: "Atlanta, GA",
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "#dbeafe",
                        border: "1px solid #bfdbfe",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#94a3b8",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          marginBottom: 2,
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontSize: 15, color: "#0f172a", fontWeight: 500 }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "#eff6ff",
                borderRadius: 16,
                padding: "32px 28px",
                border: "1px solid #bfdbfe",
              }}
            >
              <h3
                style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}
              >
                Already a customer?
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#475569",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                Sign in to your portal to manage your operation, view reports,
                and coordinate your team.
              </p>
              <Link
                href="https://app.iqsflow.com/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "11px 24px",
                  background: "#2563eb",
                  color: "#ffffff",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Sign In <span style={{ fontSize: 14 }}>&rarr;</span>
              </Link>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: "28px 28px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 12,
                }}
              >
                Response Time
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 14,
                  color: "#475569",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sales inquiries</span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>
                    Within 24 hours
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: 10,
                  }}
                >
                  <span>Technical support</span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>
                    Same business day
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: 10,
                  }}
                >
                  <span>Enterprise (dedicated)</span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>
                    Priority response
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
