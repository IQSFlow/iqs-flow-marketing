import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Features - IQS Flow",
  description:
    "A deep dive into IQS Flow's enterprise tools: work order management, smart scheduling, GPS-verified inspections, and compliance automation.",
  openGraph: {
    title: "Platform Features - IQS Flow",
    description:
      "Work orders, smart scheduling, GPS inspections, and compliance automation - built for organizations managing cleaning vendors at scale.",
  },
};

const ink = {
  900: "#0a0f1a", 800: "#0f172a", 700: "#1e293b", 600: "#334155",
  500: "#475569", 400: "#64748b", 300: "#94a3b8", 200: "#cbd5e1",
  100: "#e2e8f0", 50: "#f1f5f9", 25: "#f8fafc",
};
const accent = "#2563eb";

const FEATURES = [
  {
    id: "work-orders",
    dark: true,
    tag: "Work Order Management",
    heading: "Assign, track, and verify every task from one place.",
    description:
      "Create, assign, and close work orders in seconds. Full lifecycle visibility from dispatch to completion with photos, notes, and digital signatures attached to every record.",
    bullets: [
      "Instant dispatch to field workers with push notifications",
      "Photo and signature capture on mobile with no paper, no gaps",
      "Full audit trail from creation to close, forever searchable",
    ],
    photo: "/verne-ho-MwW-zrkYSIU-unsplash.jpg",
    photoAlt: "Facility cleaner mopping in a modern airport terminal",
  },
  {
    id: "scheduling",
    dark: false,
    tag: "Smart Scheduling",
    heading: "Know where every crew is, every shift, without asking.",
    description:
      "Drag-and-drop schedule builder with conflict detection and real-time availability. Recurring shifts, coverage gaps, and overtime alerts surfaced before they become problems.",
    bullets: [
      "Visual schedule board with drag-and-drop shift assignment",
      "Automatic conflict detection and coverage gap alerts",
      "Recurring patterns with holiday and exception handling",
    ],
    photo: "/oskar-kadaksoo-DDBDkz0p918-unsplash.jpg",
    photoAlt: "Airport gate lounge with aircraft visible through terminal window",
  },
  {
    id: "inspections",
    dark: true,
    tag: "GPS-Verified Inspections",
    heading: "See cleaning quality as it happens, not in next month's report.",
    description:
      "Every inspection is timestamped and GPS-verified. Customizable checklists with photo evidence requirements. Scores calculated automatically and surfaced to your compliance dashboard in real time.",
    bullets: [
      "GPS coordinates and timestamp locked to every submitted inspection",
      "Photo evidence requirements per checklist item, no drive-bys",
      "Automatic scoring with instant dashboard visibility",
    ],
    photo: "/fumiaki-hayashi-24EyKkrgJJI-unsplash.jpg",
    photoAlt: "Aerial view of facility operations on geometric patterned floor",
  },
  {
    id: "compliance",
    dark: false,
    tag: "Compliance Engine",
    heading: "Score every site automatically against ISSA, CIMS, or your own standards.",
    description:
      "IQS Flow ships with built-in compliance frameworks for aviation, healthcare, government, retail, hospitality, and education. Configure thresholds, automate escalations, and export audit-ready reports in one click.",
    bullets: [
      "6 built-in frameworks: FAR, CDC, GSA, retail, hospitality, education",
      "Configurable thresholds with automatic escalation workflows",
      "One-click audit-ready PDF and CSV export for any date range",
    ],
    photo: "/dennis-gecaj-jVvtCCycgcQ-unsplash.jpg",
    photoAlt: "Airport departure lounge with aircraft at gate",
  },
  {
    id: "multi-vendor",
    dark: true,
    tag: "Multi-Vendor Dashboard",
    heading: "Compare all your contractors side-by-side in one view.",
    description:
      "Stop receiving separate reports from each vendor. IQS Flow consolidates quality scores, task completion rates, and compliance metrics across every contractor so you always know who is performing.",
    bullets: [
      "Unified performance scores across all vendors and sites",
      "Side-by-side contractor comparison with trend lines",
      "Automated alerts when any vendor falls below your threshold",
    ],
    photo: "/zhang-shuaizhang-P65ogppIhUg-unsplash.jpg",
    photoAlt: "Hospital corridor with clean floors",
  },
  {
    id: "client-portal",
    dark: false,
    tag: "Client Portal",
    heading: "Give your clients a single pane of glass into every vendor.",
    description:
      "Your clients should not need to call you for a quality update. Give them a dedicated portal showing real-time inspection scores, compliance status, and work order history scoped to their sites.",
    bullets: [
      "Read-only client access scoped to their specific locations",
      "Live quality scores, recent inspections, and open tickets",
      "Branded experience your clients can access 24/7",
    ],
    photo: "/ledc-GBlrhQ2l1MM-unsplash.jpg",
    photoAlt: "Modern commercial office building with glass facade",
  },
];

export default function FeaturesPage() {
  return (
    <div style={{ minHeight: "100vh", color: ink[900], background: "#ffffff" }}>
      <style>{`
        .features-row {
          display: flex;
          align-items: center;
          gap: 64px;
          max-width: 1120px;
          margin: 0 auto;
        }
        .features-col { flex: 1; min-width: 0; }
        @media (max-width: 768px) {
          .features-row { flex-direction: column !important; gap: 40px !important; }
          .features-col { width: 100%; }
          .features-reverse { order: -1; }
        }
      `}</style>

      <MarketingNav />

      {/* ── Hero ── */}
      <section style={{ padding: "100px 32px 80px", borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accent, marginBottom: 24 }}>
            Platform Deep Dive
          </div>
          <h1 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 24, maxWidth: 700 }}>
            Enterprise tools for quality oversight at scale.
          </h1>
          <p style={{ fontSize: 18, color: ink[500], lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            Every feature built around visibility, accountability, and
            control for organizations managing cleaning vendors.
          </p>
          {/* Anchor links */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FEATURES.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 14px",
                  background: ink[25],
                  border: `1px solid ${ink[100]}`,
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: ink[500],
                  textDecoration: "none",
                }}
              >
                {f.tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Sections ── */}
      {FEATURES.map((feature, idx) => {
        const isEven = idx % 2 === 0;
        const textContent = (
          <div className="features-col">
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: feature.dark ? accent : accent, marginBottom: 20 }}>
              {feature.tag}
            </div>
            <h2 style={{
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.15,
              marginBottom: 18,
              color: feature.dark ? "#f1f5f9" : ink[900],
            }}>
              {feature.heading}
            </h2>
            <p style={{ fontSize: 16, color: feature.dark ? ink[300] : ink[500], lineHeight: 1.7, marginBottom: 28 }}>
              {feature.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {feature.bullets.map((bullet, bi) => (
                <div key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Check size={14} style={{ color: feature.dark ? "#60a5fa" : accent, flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14, color: feature.dark ? ink[200] : ink[600], lineHeight: 1.55 }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

        const visualContent = (
          <div className={`features-col${!isEven ? " features-reverse" : ""}`}>
            <div style={{ borderRadius: 10, overflow: "hidden", minHeight: 300 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={feature.photo}
                alt={feature.photoAlt}
                style={{ width: "100%", height: "100%", minHeight: 300, objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        );

        return (
          <section
            key={feature.id}
            id={feature.id}
            style={{
              padding: "96px 32px",
              background: feature.dark ? ink[900] : "#ffffff",
              borderTop: feature.dark ? "none" : `1px solid ${ink[100]}`,
            }}
          >
            <div className="features-row">
              {isEven ? <>{textContent}{visualContent}</> : <>{visualContent}{textContent}</>}
            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section style={{ padding: "96px 32px", background: ink[900] }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1.12, marginBottom: 18, color: "#f8fafc" }}>
            Ready to see these features in action?
          </h2>
          <p style={{ fontSize: 17, color: ink[400], lineHeight: 1.65, marginBottom: 40 }}>
            Book a personalized demo and we will walk through every feature
            with your specific sites, vendors, and workflows in mind.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: "#ffffff", color: ink[900], borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Book a Demo <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "transparent", color: ink[300], borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.1)" }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
