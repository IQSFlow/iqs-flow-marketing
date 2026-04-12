import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import {
  ArrowRight,
  Eye,
  ShieldCheck,
  BarChart3,
  Scale,
  Globe,
  Lock,
} from "lucide-react";

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

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", color: ink[900], background: "#ffffff" }}>
      <MarketingNav />

      {/* ─── Hero ─── */}
      <section style={{ padding: "100px 32px 80px", background: ink[900] }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accent, marginBottom: 24 }}>
            About IQS
          </div>
          <h1 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 24, maxWidth: 720, color: ink[25] }}>
            Built for the client side.
          </h1>
          <p style={{ fontSize: 18, color: ink[400], lineHeight: 1.7, maxWidth: 600, margin: 0 }}>
            Integrity Quality Solutions (IQS) builds software that gives
            organizations managing cleaning services the same level of visibility
            that their vendors have.
          </p>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section style={{ padding: "80px 32px", background: ink[25], borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }} className="about-mission-grid">
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.8px", color: ink[900], margin: 0, position: "sticky", top: 80 }}>
            Our Mission
          </h2>
          <div>
            <div style={{ width: 4, height: "100%", background: accent, borderRadius: 2, position: "absolute", left: 0, top: 0 }} />
            <div style={{ position: "relative", paddingLeft: 24, borderLeft: `4px solid ${accent}` }}>
              <p style={{ fontSize: 17, color: ink[500], lineHeight: 1.75, margin: 0 }}>
                Organizations that outsource cleaning, including airlines, airports, banks, and
                hospitals, deserve the same quality data their vendors keep
                internally. IQS Flow is the independent oversight layer that gives
                clients real-time visibility into vendor performance across every
                site, with compliance scoring against industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Leadership ─── */}
      <section style={{ padding: "80px 32px", background: "#ffffff", borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 4, color: ink[900] }}>
              Leadership
            </h2>
            <p style={{ fontSize: 15, color: ink[400], margin: 0 }}>Atlanta, Georgia</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="about-team-grid">
            {/* Venice Collier */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 36px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", borderRadius: 16, background: "#ffffff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/venice-collier.jpg"
                alt="Venice Collier"
                style={{ width: 200, height: 200, borderRadius: "50%", objectFit: "cover", border: "4px solid #e2e8f0", boxShadow: "0 0 0 4px #f8fafc", marginBottom: 28, flexShrink: 0 }}
              />
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, marginTop: 0, color: ink[900] }}>Venice Collier</h3>
              <div style={{ fontSize: 13, fontWeight: 600, color: ink[400], marginBottom: 20, letterSpacing: "0.01em" }}>
                CEO &amp; Founder
              </div>
              <p style={{ fontSize: 14, color: ink[500], lineHeight: 1.7, margin: "0 0 12px", textAlign: "left" }}>
                Venice brings deep expertise in operations management, workforce administration, and operational leadership built through her experience at Ubiquity Resources Group and ABM Industries.
              </p>
              <p style={{ fontSize: 14, color: ink[500], lineHeight: 1.7, margin: 0, textAlign: "left" }}>
                She saw firsthand the gap between the level of service clients expect and what many vendors deliver. That insight became the foundation for IQS Flow.
              </p>
            </div>

            {/* Joshua Hinton */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 36px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", borderRadius: 16, background: "#ffffff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/joshua-hinton.jpg"
                alt="Joshua Hinton"
                style={{ width: 200, height: 200, borderRadius: "50%", objectFit: "cover", border: "4px solid #e2e8f0", boxShadow: "0 0 0 4px #f8fafc", marginBottom: 28, flexShrink: 0 }}
              />
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, marginTop: 0, color: ink[900] }}>Joshua Hinton</h3>
              <div style={{ fontSize: 13, fontWeight: 600, color: ink[400], marginBottom: 20, letterSpacing: "0.01em" }}>
                Chief Operating Officer
              </div>
              <p style={{ fontSize: 14, color: ink[500], lineHeight: 1.7, margin: "0 0 12px", textAlign: "left" }}>
                Joshua is a CISSP-certified engineer and Georgia Tech alumnus with a background spanning cloud infrastructure at AWS, AI/ML systems, and healthcare technology at Medeloop.
              </p>
              <p style={{ fontSize: 14, color: ink[500], lineHeight: 1.7, margin: 0, textAlign: "left" }}>
                He leads product and engineering, designing the multi-tenant architecture, real-time event systems, and analytics that power the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pull Quote ─── */}
      <section style={{ padding: "72px 32px", background: ink[25], borderTop: `1px solid ${ink[100]}`, borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, lineHeight: 1, color: ink[200], marginBottom: 20, fontFamily: "var(--font-serif), Georgia, serif" }}>&ldquo;</div>
          <blockquote style={{ fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.7, color: ink[700], fontStyle: "italic", margin: "0 0 24px", fontFamily: "var(--font-serif), Georgia, serif" }}>
            Clients deserve the same quality data their vendors keep internally. That&rsquo;s not a feature request &mdash; it&rsquo;s a market gap.
          </blockquote>
          <div style={{ fontSize: 13, fontWeight: 700, color: ink[400], letterSpacing: "0.04em" }}>Venice Collier, CEO &amp; Founder</div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section style={{ padding: "80px 32px", background: ink[900] }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 48, color: "#f8fafc" }}>
            What Drives Us
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="about-values-grid">
            {([
              { icon: Eye, title: "Client Transparency", desc: "The organization paying for cleaning services should have full visibility into the quality of work, not just what the vendor chooses to share." },
              { icon: ShieldCheck, title: "Independent Verification", desc: "Quality data should be collected independently, not self-reported. Our inspection and tracking tools give you verifiable, objective metrics." },
              { icon: BarChart3, title: "Data-Driven Decisions", desc: "Contract renewals, vendor selection, and quality improvements should be based on data, not anecdotes. IQS Flow gives you the numbers." },
              { icon: Scale, title: "Industry Standards", desc: "Built-in compliance frameworks (APPA, ISSA, Skytrax, Joint Commission) so you can measure every vendor against the same standards." },
              { icon: Globe, title: "Multi-Site Scale", desc: "Whether you manage 5 locations or 500, IQS Flow gives you portfolio-wide visibility with drill-down to every individual site." },
              { icon: Lock, title: "Security First", desc: "Encrypted sessions, role-based access control, and audit logging for every action. Your quality data is secure and yours alone." },
            ] as const).map(({ icon: Icon, title, desc }, i) => (
              <div key={title} style={{ padding: "32px 28px", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none", borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} style={{ color: accent }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#f8fafc" }}>{title}</h3>
                    <p style={{ fontSize: 14, color: ink[300], lineHeight: 1.65, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "96px 32px", background: ink[800], borderTop: `1px solid rgba(255,255,255,0.05)` }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-1px", marginBottom: 16 }}>
            Ready to take control of vendor quality?
          </h2>
          <p style={{ color: ink[400], fontSize: 17, lineHeight: 1.6, marginBottom: 36 }}>
            Talk to our team about how IQS Flow can give your organization
            visibility into cleaning vendor performance.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: "#ffffff", color: ink[900], borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Contact Us <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "transparent", color: ink[300], borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.1)" }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />

      <style>{`
        @media (max-width: 767px) {
          .about-mission-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .about-values-grid { grid-template-columns: 1fr !important; }
          .about-team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
