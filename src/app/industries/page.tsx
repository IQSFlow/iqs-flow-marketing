import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "Industries - IQS Flow | Aviation, Healthcare & Corporate Solutions",
  description:
    "Tailored quality oversight for Aviation, Healthcare, and Corporate sectors. Gate-to-gate visibility, JCAHO-ready compliance, and multi-tenant vendor control.",
  openGraph: {
    title: "Industries - IQS Flow",
    description:
      "Industry-specific oversight solutions for C-suite leaders in Aviation, Healthcare, and Corporate environments.",
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  {
    id: "aviation",
    label: "Aviation",
    title: "Aviation: Gate-to-Gate Visibility",
    tagline: "Every gate. Every flight. Every standard met.",
    pullQuote: "When a gate turn is 45 minutes and cleaning takes 20, you need to know it happened. Not in a report next month - right now.",
    accentColor: "#3b82f6",
    accentBg: "#dbeafe",
    accentText: "#1d4ed8",
    photo: "/oskar-kadaksoo-DDBDkz0p918-unsplash.jpg",
    photoAlt: "Airport gate lounge with aircraft visible through terminal window",
    photoCaption: "Aviation",
    painPoints: [
      "Missed cleaning windows during tight gate turns cause flight delays",
      "Vendor disputes over uncompleted tasks with no documented proof",
      "Multiple concourse vendors operating under different standards",
    ],
    features: [
      {
        icon: "📍",
        iconColor: "#2563eb",
        title: "Live Gate Map",
        desc: "Real-time cleaning status overlaid on your terminal map. Know exactly which gates are ready before boarding begins.",
      },
      {
        icon: "✅",
        iconColor: "#2563eb",
        title: "Digital Task Checklists",
        desc: "Timestamped, photo-verified task completion. Irrefutable audit trail for every turnaround event.",
      },
    ],
    testimonial: {
      quote:
        "We reduced vendor billing disputes by 60% in the first quarter. Every task is now timestamped, geolocated, and photo-verified. We don't argue about what got done - we just show the data.",
      name: "Chief Operating Officer",
      org: "Major International Airport",
    },
    stat: "45% Increase in On-Time Cleaning",
    statSub: "Average across aviation clients",
    altLayout: false,
  },
  {
    id: "airports",
    label: "Airports",
    title: "Airports: Terminal-Wide Oversight",
    tagline: "One view of every vendor, every terminal, every shift.",
    pullQuote: "When you manage 50 gates across 3 terminals with 4 different cleaning contractors, you need one view of who's performing.",
    accentColor: "#6366f1",
    accentBg: "#eef2ff",
    accentText: "#3730a3",
    photo: "/big-dodzy-m5PcPzOIfTw-unsplash.jpg",
    photoAlt: "Modern airport terminal interior with wide open concourse",
    photoCaption: "Airports",
    painPoints: [
      "Multiple cleaning contractors with no shared performance baseline",
      "No way to compare vendor quality across concourses or terminals",
      "Passenger complaints arrive without documentation to support vendor accountability",
    ],
    features: [
      {
        icon: "📊",
        iconColor: "#4f46e5",
        title: "Cross-Vendor Performance Dashboard",
        desc: "All contractors scored on the same rubric, side by side. Spot underperformers before passengers do.",
      },
      {
        icon: "📍",
        iconColor: "#4f46e5",
        title: "GPS Crew Tracking",
        desc: "Real-time location of every cleaning crew, overlaid on your terminal map. Know who is where and whether they are on schedule.",
      },
    ],
    testimonial: {
      quote:
        "We manage four vendors across three terminals. IQS Flow gave us the first unified view of their performance we've ever had. We cut cleaning-related passenger complaints by 38%.",
      name: "Director of Operations",
      org: "International Airport Authority",
    },
    stat: "38% Reduction in Cleaning Complaints",
    statSub: "Across airport operations clients",
    altLayout: true,
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Healthcare: JCAHO-Ready Compliance",
    tagline: "Infection prevention you can prove, not just claim.",
    pullQuote: "When compliance isn't optional and inspections can't be self-reported, you need an independent verification layer.",
    accentColor: "#10b981",
    accentBg: "#d1fae5",
    accentText: "#065f46",
    photo: "/zhang-shuaizhang-P65ogppIhUg-unsplash.jpg",
    photoAlt: "Hospital corridor with clean floors and wet floor caution sign",
    photoCaption: "Healthcare",
    painPoints: [
      "HAI incidents traced back to inadequate environmental cleaning protocols",
      "Manual paper audits are slow, incomplete, and difficult to present during JCAHO surveys",
      "No real-time alerting when high-risk areas fall below cleaning frequency standards",
    ],
    features: [
      {
        icon: "🛡",
        iconColor: "#059669",
        title: "Infection Prevention Trails",
        desc: "Full documentation chains for every high-risk area. Contact precaution rooms, ORs, and ICUs tracked with compliance scoring.",
      },
      {
        icon: "📡",
        iconColor: "#059669",
        title: "Real-Time Environmental Monitoring",
        desc: "Automated alerts when cleaning frequency deviates from protocol. Escalation workflows built into the platform.",
      },
    ],
    testimonial: {
      quote:
        "Our last JCAHO survey took half the prep time it used to. I pulled the full environmental services compliance report in three clicks. The surveyors were impressed - and so were we.",
      name: "VP of Operations & Environmental Services",
      org: "Regional Health System",
    },
    stat: "98% Audit Readiness Rate",
    statSub: "Across healthcare operations clients",
    altLayout: false,
  },
  {
    id: "corporate",
    label: "Banks & Corporate",
    title: "Banks & Corporate: Multi-Site Quality Control",
    tagline: "One standard. Many vendors. Zero blind spots.",
    pullQuote: "When you have 200 branches and 6 cleaning vendors, you need consistent quality standards verified independently.",
    accentColor: "#f59e0b",
    accentBg: "#fef3c7",
    accentText: "#92400e",
    photo: "/ledc-GBlrhQ2l1MM-unsplash.jpg",
    photoAlt: "Modern commercial office building with glass facade at dusk",
    photoCaption: "Corporate",
    painPoints: [
      "Diverse vendor contracts with inconsistent service standards across locations",
      "No portfolio-level view to compare cleaning quality between buildings or regions",
      "Tenant complaints arrive with no documentation to evaluate vendor performance",
    ],
    features: [
      {
        icon: "📊",
        iconColor: "#b45309",
        title: "Branch-Level Compliance",
        desc: "Score every location on a unified rubric. Identify underperforming sites and vendors before tenants escalate.",
      },
      {
        icon: "🖥",
        iconColor: "#b45309",
        title: "Tenant Portal",
        desc: "Give tenants a read-only view of their space's cleaning activity and quality scores. Build trust through transparency.",
      },
    ],
    testimonial: {
      quote:
        "For the first time, I can see every vendor, every building, and every quality score on one screen. We renegotiated two vendor contracts based solely on the data IQS Flow surfaced.",
      name: "Head of Operations, Americas",
      org: "Fortune 500 Real Estate Portfolio",
    },
    stat: "30% Reduction in Vendor Costs",
    statSub: "After contract renegotiation with data",
    altLayout: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PainPoint({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 2L8 8M8 2L2 8"
            stroke="#ef4444"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p
        style={{
          fontSize: 15,
          color: "#475569",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  iconColor,
  title,
  desc,
}: {
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "16px 18px",
        background: "#f8fafc",
        borderRadius: 12,
        border: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "#fff",
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: iconColor,
            margin: "0 0 4px",
          }}
        >
          {title}
        </p>
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
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  org,
  accentColor,
}: {
  quote: string;
  name: string;
  org: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: "0 12px 12px 0",
        padding: "20px 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginTop: 24,
      }}
    >
      <div
        style={{
          fontSize: 32,
          color: accentColor,
          lineHeight: 1,
          marginBottom: 8,
          opacity: 0.4,
          fontFamily: "Georgia, serif",
        }}
      >
        &ldquo;
      </div>
      <p
        style={{
          fontSize: 15,
          color: "#334155",
          lineHeight: 1.7,
          fontStyle: "italic",
          margin: "0 0 14px",
        }}
      >
        {quote}
      </p>
      <div>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#0f172a",
            margin: "0 0 2px",
          }}
        >
          {name}
        </p>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{org}</p>
      </div>
    </div>
  );
}

function StatBadge({
  stat,
  sub,
  accentColor,
  accentBg,
}: {
  stat: string;
  sub: string;
  accentColor: string;
  accentBg: string;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "18px 28px",
        background: accentBg,
        borderRadius: 16,
        border: `2px solid ${accentColor}22`,
        marginTop: 20,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontSize: "clamp(22px, 3vw, 28px)",
          fontWeight: 800,
          color: accentColor,
          letterSpacing: "-0.8px",
          lineHeight: 1.2,
        }}
      >
        {stat}
      </span>
      <span
        style={{
          fontSize: 12,
          color: "#64748b",
          marginTop: 4,
          fontWeight: 500,
        }}
      >
        {sub}
      </span>
    </div>
  );
}

function IndustryPhoto({
  photo,
  photoAlt,
  photoCaption,
  accentColor,
}: {
  photo: string;
  photoAlt: string;
  photoCaption: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        minHeight: 320,
        position: "relative",
        boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
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
      {/* Subtle caption overlay at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "32px 20px 16px",
          background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
            background: `${accentColor}33`,
            border: `1px solid ${accentColor}55`,
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          {photoCaption}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
        color: "#0f172a",
        background: "#ffffff",
      }}
    >
      <MarketingNav />

      {/* ─── Hero ─── */}
      <section
        style={{
          background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)",
          padding: "100px 32px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              background: "rgba(59,130,246,0.2)",
              border: "1px solid rgba(59,130,246,0.35)",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 600,
              color: "#93c5fd",
              marginBottom: 28,
            }}
          >
            Industry Solutions
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 20,
              color: "#ffffff",
            }}
          >
            Industry-Specific{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #93c5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Oversight Solutions
            </span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(219,234,254,0.8)",
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto 36px",
            }}
          >
            Tailored for C-suite Leaders in Aviation, Healthcare, and Corporate
            Sectors.
          </p>
          <Link
            href="#aviation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              background: "#2563eb",
              color: "#fff",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(37,99,235,0.5)",
            }}
          >
            Explore Solutions &darr;
          </Link>
        </div>
      </section>

      {/* ─── Industry Sections ─── */}
      {INDUSTRIES.map((industry, index) => {
        const isAlt = industry.altLayout;
        const sectionBg = index % 2 === 0 ? "#ffffff" : "#f8fafc";

        const contentBlock = (
          <div style={{ flex: "1 1 0", minWidth: 280 }}>
            {/* Section badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 14px",
                background: industry.accentBg,
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                color: industry.accentText,
                marginBottom: 16,
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
              }}
            >
              {industry.label}
            </div>

            <h2
              style={{
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 800,
                letterSpacing: "-0.8px",
                lineHeight: 1.2,
                color: "#0f172a",
                marginBottom: 24,
              }}
            >
              {industry.title}
            </h2>

            {/* Pull quote callout */}
            <blockquote
              style={{
                fontStyle: "italic",
                color: "#475569",
                borderLeft: "3px solid #2563eb",
                paddingLeft: "16px",
                margin: "16px 0",
                fontSize: 15,
                lineHeight: 1.65,
              }}
            >
              {industry.pullQuote}
            </blockquote>

            {/* Pain points */}
            <div style={{ marginBottom: 24 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  marginBottom: 12,
                }}
              >
                Common Challenges
              </p>
              {industry.painPoints.map((pt) => (
                <PainPoint key={pt} text={pt} />
              ))}
            </div>

            {/* Features */}
            <div style={{ marginBottom: 0 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  marginBottom: 12,
                }}
              >
                How IQS Flow Helps
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {industry.features.map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <TestimonialCard
              quote={industry.testimonial.quote}
              name={industry.testimonial.name}
              org={industry.testimonial.org}
              accentColor={industry.accentColor}
            />

            {/* Stat */}
            <StatBadge
              stat={industry.stat}
              sub={industry.statSub}
              accentColor={industry.accentColor}
              accentBg={industry.accentBg}
            />
          </div>
        );

        const visualBlock = (
          <div style={{ flex: "0 0 340px", minWidth: 260 }}>
            <IndustryPhoto
              photo={industry.photo}
              photoAlt={industry.photoAlt}
              photoCaption={industry.photoCaption}
              accentColor={industry.accentColor}
            />
          </div>
        );

        return (
          <section
            key={industry.id}
            id={industry.id}
            style={{
              padding: "80px 32px",
              background: sectionBg,
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                display: "flex",
                gap: 56,
                alignItems: "flex-start",
                flexWrap: "wrap" as const,
                flexDirection: isAlt ? "row-reverse" : "row",
              }}
            >
              {visualBlock}
              {contentBlock}
            </div>
          </section>
        );
      })}

      {/* ─── CTA ─── */}
      <section
        style={{
          position: "relative",
          padding: "88px 32px",
          background:
            "linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)",
          color: "#fff",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              marginBottom: 16,
              letterSpacing: "-1px",
            }}
          >
            See IQS Flow in Action
          </h2>
          <p
            style={{
              color: "rgba(219,234,254,0.85)",
              marginBottom: 36,
              fontSize: 17,
              maxWidth: 500,
              margin: "0 auto 36px",
              lineHeight: 1.65,
            }}
          >
            See how IQS Flow delivers measurable results across your industry
            from day one.
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
                background: "#fff",
                color: "#1e40af",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              Request a Demo &rarr;
            </Link>
            <Link
              href="/why-iqs"
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
              See Features
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
