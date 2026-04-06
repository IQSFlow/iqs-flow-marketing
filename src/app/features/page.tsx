import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

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

const FEATURES = [
  {
    id: "work-orders",
    dark: true,
    tag: "Work Order Management",
    tagColor: "#3b82f6",
    tagBg: "rgba(59,130,246,0.15)",
    heading: "Assign, track, and verify every task from one place.",
    description:
      "Create, assign, and close work orders in seconds. Full lifecycle visibility from dispatch to completion - with photos, notes, and digital signatures attached to every record. No more chasing status updates by phone.",
    bullets: [
      "Instant dispatch to field workers with push notifications",
      "Photo and signature capture on mobile - no paper, no gaps",
      "Full audit trail from creation to close, forever searchable",
    ],
    photo: "/verne-ho-MwW-zrkYSIU-unsplash.jpg",
    photoAlt: "Facility cleaner mopping in a modern airport terminal with curved white walls",
  },
  {
    id: "scheduling",
    dark: false,
    tag: "Smart Scheduling",
    tagColor: "#2563eb",
    tagBg: "#dbeafe",
    heading: "Know where every crew is, every shift, without asking.",
    description:
      "Drag-and-drop schedule builder with conflict detection and real-time availability. Recurring shifts, coverage gaps, and overtime alerts - all surfaced before they become problems. Stop relying on the vendor to tell you who showed up.",
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
    tagColor: "#34d399",
    tagBg: "rgba(52,211,153,0.15)",
    heading: "See cleaning quality as it happens, not in next month's report.",
    description:
      "Every inspection is timestamped and GPS-verified. Customizable checklists with photo evidence requirements. Scores calculated automatically and surfaced to your compliance dashboard in real time - not days later.",
    bullets: [
      "GPS coordinates and timestamp locked to every submitted inspection",
      "Photo evidence requirements per checklist item - no drive-bys",
      "Automatic scoring with instant dashboard visibility",
    ],
    photo: "/fumiaki-hayashi-24EyKkrgJJI-unsplash.jpg",
    photoAlt: "Aerial view of facility cleaner in uniform on geometric patterned plaza floor",
  },
  {
    id: "compliance",
    dark: false,
    tag: "Compliance Engine",
    tagColor: "#7c3aed",
    tagBg: "#ede9fe",
    heading: "Score every site automatically against ISSA, CIMS, or your own standards.",
    description:
      "IQS Flow ships with built-in compliance frameworks for aviation, healthcare, government, retail, hospitality, and education. Configure thresholds, automate escalations, and export audit-ready reports in one click.",
    bullets: [
      "6 built-in frameworks: FAR, CDC, GSA, retail, hospitality, education",
      "Configurable thresholds with automatic escalation workflows",
      "One-click audit-ready PDF and CSV export for any date range",
    ],
    photo: "/dennis-gecaj-jVvtCCycgcQ-unsplash.jpg",
    photoAlt: "Airport departure lounge with Lufthansa aircraft at gate through floor-to-ceiling windows",
  },
  {
    id: "multi-vendor",
    dark: true,
    tag: "Multi-Vendor Dashboard",
    tagColor: "#f59e0b",
    tagBg: "rgba(245,158,11,0.15)",
    heading: "Compare all your contractors side-by-side in one view.",
    description:
      "Stop receiving separate reports from each vendor. IQS Flow consolidates quality scores, task completion rates, and compliance metrics across every contractor - so you always know who is performing and who isn't.",
    bullets: [
      "Unified performance scores across all vendors and sites",
      "Side-by-side contractor comparison with trend lines",
      "Automated alerts when any vendor falls below your threshold",
    ],
    photo: "/zhang-shuaizhang-P65ogppIhUg-unsplash.jpg",
    photoAlt: "Hospital corridor with clean floors showing operational environment",
  },
  {
    id: "client-portal",
    dark: false,
    tag: "Client Portal",
    tagColor: "#0891b2",
    tagBg: "rgba(8,145,178,0.1)",
    heading: "Give your clients a single pane of glass into every vendor.",
    description:
      "Your clients shouldn't need to call you for a quality update. Give them a dedicated portal showing real-time inspection scores, compliance status, and work order history - all scoped to their sites only.",
    bullets: [
      "Read-only client access scoped to their specific locations",
      "Live quality scores, recent inspections, and open tickets",
      "Branded experience your clients can access 24/7",
    ],
    photo: "/ledc-GBlrhQ2l1MM-unsplash.jpg",
    photoAlt: "Modern commercial office building with glass facade at dusk",
  },
];

function CheckIcon() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "rgba(59,130,246,0.15)",
        flexShrink: 0,
        marginTop: 2,
        fontSize: 13,
        color: "#60a5fa",
      }}
    >
      ✓
    </span>
  );
}

function CheckIconDark({ color }: { color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: `${color}22`,
        flexShrink: 0,
        marginTop: 2,
        fontSize: 13,
        color,
      }}
    >
      ✓
    </span>
  );
}

function FeaturePhotoCard({
  photo,
  photoAlt,
  dark,
}: {
  photo: string;
  photoAlt: string;
  dark: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        minHeight: 320,
        boxShadow: dark
          ? "0 24px 48px rgba(0,0,0,0.5)"
          : "0 24px 48px rgba(0,0,0,0.18)",
        border: dark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <img
        src={photo}
        alt={photoAlt}
        style={{
          width: "100%",
          height: "100%",
          minHeight: 320,
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: '"DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
        color: "#0f172a",
        background: "#ffffff",
      }}
    >
      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .features-section-row {
          display: flex;
          align-items: center;
          gap: 64px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .features-col-text {
          flex: 1;
          min-width: 0;
        }
        .features-col-visual {
          flex: 1;
          min-width: 0;
        }

        @media (max-width: 768px) {
          .features-section-row {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .features-col-text,
          .features-col-visual {
            width: 100%;
          }
          .features-reverse-mobile {
            order: -1;
          }
        }
      `}</style>

      <MarketingNav />

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          padding: "100px 32px 90px",
          textAlign: "center",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.92)), url('/safwan-mahmud-6xQFm9TFwmk-unsplash.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 600,
              color: "#93c5fd",
              marginBottom: 28,
            }}
          >
            Platform Deep Dive
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 5.5vw, 60px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.08,
              marginBottom: 24,
              color: "#ffffff",
            }}
          >
            Platform Features{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Deep Dive
            </span>
          </h1>
          <p
            style={{
              fontSize: 19,
              color: "rgba(203,213,225,0.85)",
              lineHeight: 1.65,
              maxWidth: 580,
              margin: "0 auto 40px",
            }}
          >
            Enterprise-grade tools for organizations managing cleaning vendors
            at scale. Every feature built around visibility, accountability, and
            control.
          </p>
          {/* Feature anchor links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {FEATURES.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(203,213,225,0.8)",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
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
        const isEven = idx % 2 === 0; // even = text left, visual right
        const textContent = (
          <div className="features-col-text">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 14px",
                background: feature.tagBg,
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                color: feature.tagColor,
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                marginBottom: 20,
              }}
            >
              {feature.tag}
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-1.2px",
                lineHeight: 1.15,
                marginBottom: 18,
                color: feature.dark ? "#f1f5f9" : "#0f172a",
              }}
            >
              {feature.heading}
            </h2>
            <p
              style={{
                fontSize: 17,
                color: feature.dark ? "#94a3b8" : "#475569",
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              {feature.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {feature.bullets.map((bullet, bi) => (
                <div key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  {feature.dark ? (
                    <CheckIcon />
                  ) : (
                    <CheckIconDark color={feature.tagColor} />
                  )}
                  <span
                    style={{
                      fontSize: 15,
                      color: feature.dark ? "#cbd5e1" : "#334155",
                      lineHeight: 1.55,
                    }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

        const visualContent = (
          <div className={`features-col-visual${!isEven ? " features-reverse-mobile" : ""}`}>
            <FeaturePhotoCard
              photo={feature.photo}
              photoAlt={feature.photoAlt}
              dark={feature.dark}
            />
          </div>
        );

        return (
          <section
            key={feature.id}
            id={feature.id}
            style={{
              padding: "96px 32px",
              background: feature.dark
                ? "linear-gradient(180deg, #0f172a 0%, #111827 100%)"
                : "#ffffff",
              borderTop: feature.dark
                ? "1px solid rgba(255,255,255,0.05)"
                : "1px solid #f1f5f9",
            }}
          >
            <div className="features-section-row">
              {isEven ? (
                <>
                  {textContent}
                  {visualContent}
                </>
              ) : (
                <>
                  {visualContent}
                  {textContent}
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section
        style={{
          position: "relative",
          padding: "96px 32px",
          background: "linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 700,
              color: "#bfdbfe",
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
              marginBottom: 24,
            }}
          >
            Get Started
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              lineHeight: 1.12,
              marginBottom: 18,
              color: "#ffffff",
            }}
          >
            Ready to See These Features in Action?
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "rgba(219,234,254,0.85)",
              lineHeight: 1.65,
              marginBottom: 40,
            }}
          >
            Book a personalized demo and we will walk through every feature
            with your specific sites, vendors, and workflows in mind.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
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
                background: "#ffffff",
                color: "#1e40af",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 28px",
                background: "rgba(255,255,255,0.1)",
                color: "#ffffff",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.28)",
              }}
            >
              View Pricing →
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
