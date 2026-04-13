"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

const ink = {
  900: "#0a0f1a", 800: "#0f172a", 700: "#1e293b", 600: "#334155",
  500: "#475569", 400: "#64748b", 300: "#94a3b8", 200: "#cbd5e1",
  100: "#e2e8f0", 50: "#f1f5f9", 25: "#f8fafc",
};
const accent = "#2563eb";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://api.iqsflow.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Failed to send. Please email info@iqsflow.com directly.");
    } finally {
      setSending(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    border: `1px solid ${ink[100]}`,
    borderRadius: 6,
    fontSize: 14,
    color: ink[900],
    background: ink[25],
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 600,
    color: ink[600],
  };

  return (
    <div style={{ minHeight: "100vh", color: ink[900], background: "#ffffff" }}>
      <MarketingNav />

      {/* ─── Hero ─── */}
      <section style={{ padding: "100px 32px 64px", borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accent, marginBottom: 24 }}>
            Contact Us
          </div>
          <h1 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 20, maxWidth: 500 }}>
            Let&apos;s talk quality.
          </h1>
          <p style={{ fontSize: 18, color: ink[500], lineHeight: 1.7, maxWidth: 500 }}>
            Whether you manage one site or fifty airports, we would
            love to show you how IQS Flow delivers independent vendor oversight.
          </p>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section style={{ padding: "48px 32px", background: ink[25], borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="contact-steps-grid">
          {[
            { num: "01", title: "Tell us about your operations", desc: "Share your sites, vendors, and quality challenges." },
            { num: "02", title: "See IQS Flow in action", desc: "We will walk you through the platform with your scenario." },
            { num: "03", title: "Go live in under a week", desc: "We handle setup and onboarding so you are running fast." },
          ].map((step) => (
            <div key={step.num} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: ink[300], letterSpacing: "0.08em", marginTop: 2 }}>{step.num}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: ink[900], marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: ink[400], lineHeight: 1.55 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact Grid ─── */}
      <section style={{ padding: "64px 32px 80px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "3fr 2fr", gap: 40 }} className="contact-grid">
          {/* ── Form ── */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 32, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Request a Demo</h2>
            <p style={{ fontSize: 14, color: ink[400], marginBottom: 28, lineHeight: 1.5 }}>
              Fill out the form and our team will reach out within one business day.
            </p>

            {submitted ? (
              <div style={{ padding: "32px 24px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 12, color: "#059669" }}>&#10003;</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#15803d", marginBottom: 8 }}>Thanks for reaching out!</h3>
                <p style={{ fontSize: 14, color: ink[500], lineHeight: 1.6 }}>
                  We received your message and will get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <input name="website" type="text" style={{ position: "absolute", left: "-9999px" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input name="firstName" type="text" required placeholder="Jane" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input name="lastName" type="text" required placeholder="Doe" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Work Email</label>
                  <input name="email" type="email" required placeholder="you@company.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input name="company" type="text" required placeholder="Acme Airport Services" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>How can we help?</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your operation, number of sites, and what challenges you are facing..." style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
                </div>
                <button type="submit" disabled={sending} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 24px", background: sending ? ink[400] : accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: sending ? "not-allowed" : "pointer", minHeight: 44 }}>
                  {sending ? "Sending..." : <>Send Message <ArrowRight size={15} /></>}
                </button>
                <p style={{ fontSize: 12, color: ink[300], margin: 0 }}>
                  By submitting, you agree to our <Link href="/privacy" style={{ color: ink[500], textDecoration: "underline" }}>privacy policy</Link>. We will never share your information.
                </p>
              </form>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ padding: "28px 24px", background: "#f8fafc", border: `1px solid ${ink[100]}`, borderRadius: 10 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Get in Touch</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: <Mail size={16} style={{ color: accent }} />, label: "Email", value: "info@iqsflow.com" },
                  { icon: <MapPin size={16} style={{ color: accent }} />, label: "Office", value: "Atlanta, GA" },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {icon}
                    <div>
                      <div style={{ fontSize: 11, color: ink[300], fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                      <div style={{ fontSize: 15, color: ink[900], fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "28px 24px", background: ink[25], borderRadius: 10, border: `1px solid ${ink[100]}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Already a customer?</h3>
              <p style={{ fontSize: 14, color: ink[500], lineHeight: 1.55, marginBottom: 16 }}>
                Sign in to your portal to manage your operation, view reports, and coordinate your team.
              </p>
              <Link href="https://app.iqsflow.com/login" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", background: accent, color: "#ffffff", borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                Sign In <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ padding: "28px 24px", background: "#f8fafc", border: `1px solid ${ink[100]}`, borderRadius: 10 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Response Time</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: ink[500] }}>
                {[
                  { label: "Sales inquiries", value: "Within 24 hours" },
                  { label: "Technical support", value: "Same business day" },
                  { label: "Enterprise (dedicated)", value: "Priority response" },
                ].map(({ label, value }, i) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", borderTop: i > 0 ? `1px solid ${ink[50]}` : "none", paddingTop: i > 0 ? 10 : 0 }}>
                    <span>{label}</span>
                    <span style={{ fontWeight: 600, color: ink[900] }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />

      <style>{`
        @media (max-width: 767px) {
          .contact-steps-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
