import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CheckSquare, BarChart3, Navigation, ShieldCheck, Activity, Building, Monitor, ArrowRight } from "lucide-react";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import { marketing } from "@/lib/design-tokens";

const ink = marketing.ink;
const accent = marketing.accent;

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
    sectionNumber: "01",
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
        icon: "pin",
        iconColor: "#2563eb",
        title: "Live Gate Map",
        desc: "Real-time cleaning status overlaid on your terminal map. Know exactly which gates are ready before boarding begins.",
      },
      {
        icon: "check",
        iconColor: "#2563eb",
        title: "Digital Task Checklists",
        desc: "Timestamped, photo-verified task completion. Irrefutable audit trail for every turnaround event.",
      },
    ],
    testimonial: {
      quote:
        "Clients deserve the same quality data their vendors keep internally. IQS Flow makes every task timestamped, geolocated, and photo-verified so there is nothing to argue about.",
      name: "Venice Collier",
      title: "CEO & Founder",
      org: "IQS",
    },
    stat: "Gate-level task tracking",
    statSub: "Platform capability",
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
    sectionNumber: "02",
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
        icon: "chart",
        iconColor: "#4f46e5",
        title: "Cross-Vendor Performance Dashboard",
        desc: "All contractors scored on the same rubric, side by side. Spot underperformers before passengers do.",
      },
      {
        icon: "pin",
        iconColor: "#4f46e5",
        title: "GPS Crew Tracking",
        desc: "Real-time location of every cleaning crew, overlaid on your terminal map. Know who is where and whether they are on schedule.",
      },
    ],
    testimonial: {
      quote:
        "IQS Flow was built because we saw operations teams managing dozens of vendors with no unified view. The platform gives you one dashboard for every contractor, every terminal, every shift.",
      name: "Venice Collier",
      title: "CEO & Founder",
      org: "IQS",
    },
    stat: "Cross-vendor dashboards",
    statSub: "Platform capability",
    altLayout: true,
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Healthcare: JCAHO-Ready Compliance",
    tagline: "Infection prevention you can prove, not just claim.",
    pullQuote: "When compliance isn't optional and inspections can't be self-reported, you need an independent verification layer.",
    accentColor: "#059669",
    accentBg: "#d1fae5",
    accentText: "#065f46",
    sectionNumber: "03",
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
        icon: "shield",
        iconColor: "#059669",
        title: "Infection Prevention Trails",
        desc: "Full documentation chains for every high-risk area. Contact precaution rooms, ORs, and ICUs tracked with compliance scoring.",
      },
      {
        icon: "activity",
        iconColor: "#059669",
        title: "Real-Time Environmental Monitoring",
        desc: "Automated alerts when cleaning frequency deviates from protocol. Escalation workflows built into the platform.",
      },
    ],
    testimonial: {
      quote:
        "We built IQS Flow with healthcare compliance in mind from day one. The platform generates audit-ready documentation automatically so your team spends time on care, not paperwork.",
      name: "Venice Collier",
      title: "CEO & Founder",
      org: "IQS",
    },
    stat: "JCAHO-ready compliance",
    statSub: "Platform capability",
    altLayout: false,
  },
  {
    id: "corporate",
    label: "Banks & Corporate",
    title: "Banks & Corporate: Multi-Site Quality Control",
    tagline: "One standard. Many vendors. Zero blind spots.",
    pullQuote: "When you have 200 branches and 6 cleaning vendors, you need consistent quality standards verified independently.",
    accentColor: "#b45309",
    accentBg: "#fef3c7",
    accentText: "#92400e",
    sectionNumber: "04",
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
        icon: "chart",
        iconColor: "#b45309",
        title: "Branch-Level Compliance",
        desc: "Score every location on a unified rubric. Identify underperforming sites and vendors before tenants escalate.",
      },
      {
        icon: "monitor",
        iconColor: "#b45309",
        title: "Tenant Portal",
        desc: "Give tenants a read-only view of their space's cleaning activity and quality scores. Build trust through transparency.",
      },
    ],
    testimonial: {
      quote:
        "When you manage hundreds of branches with multiple vendors, you need one source of truth. IQS Flow scores every location on a unified rubric so contract decisions are backed by data.",
      name: "Venice Collier",
      title: "CEO & Founder",
      org: "IQS",
    },
    stat: "Vendor scorecard analytics",
    statSub: "Platform capability",
    altLayout: true,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    title: "Maintenance: Preventive Asset Management",
    tagline: "Every asset, every schedule, every vendor.",
    pullQuote: "Reactive maintenance driven by complaints costs more than preventive programs verified independently.",
    accentColor: "#6366f1",
    accentBg: "#eef2ff",
    accentText: "#3730a3",
    sectionNumber: "05",
    photo: "/verne-ho-MwW-zrkYSIU-unsplash.jpg",
    photoAlt: "Facility maintenance in a modern building",
    photoCaption: "Maintenance",
    painPoints: [
      "Reactive maintenance driven by tenant complaints, not preventive schedules",
      "No visibility into vendor response times or completion quality",
      "Paper-based work orders with no audit trail or SLA tracking",
    ],
    features: [
      {
        icon: "check",
        iconColor: "#4f46e5",
        title: "Preventive Maintenance Scheduling",
        desc: "Schedule recurring maintenance tasks with automated reminders and SLA tracking for every vendor.",
      },
      {
        icon: "chart",
        iconColor: "#4f46e5",
        title: "Work Order Lifecycle Tracking",
        desc: "Track every work order from creation to completion with photo-verified evidence and GPS stamps.",
      },
    ],
    testimonial: {
      quote:
        "Maintenance teams juggle dozens of vendors and thousands of assets. IQS Flow brings it all into one platform with real accountability and evidence-based oversight.",
      name: "Venice Collier",
      title: "CEO & Founder",
      org: "IQS",
    },
    stat: "Work order lifecycle tracking",
    statSub: "Platform capability",
    altLayout: false,
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

const ICON_MAP: Record<string, React.ComponentType<{size?: number; style?: React.CSSProperties}>> = {
  pin: MapPin, check: CheckSquare, chart: BarChart3, nav: Navigation,
  shield: ShieldCheck, activity: Activity, building: Building, monitor: Monitor,
};

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
  const IconComp = ICON_MAP[icon] || CheckSquare;
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "16px 18px",
        background: ink[25],
        borderRadius: 10,
        border: `1px solid ${ink[100]}`,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "#fff",
          border: `1px solid ${ink[100]}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconComp size={18} style={{ color: iconColor }} />
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
  title,
  org,
  accentColor,
}: {
  quote: string;
  name: string;
  title: string;
  org: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: `1px solid ${accentColor}22`,
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: "0 12px 12px 0",
        padding: "28px 28px 24px",
        boxShadow: `0 4px 24px ${accentColor}14`,
        marginTop: 28,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large decorative opening quotation mark */}
      <div
        style={{
          position: "absolute",
          top: -8,
          left: 16,
          fontSize: 120,
          lineHeight: 1,
          color: accentColor,
          opacity: 0.07,
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 900,
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: 19,
          color: "#1e293b",
          lineHeight: 1.65,
          fontStyle: "italic",
          margin: "0 0 20px",
          position: "relative",
          zIndex: 1,
          fontWeight: 400,
          letterSpacing: "-0.01em",
        }}
      >
        {quote}
      </p>

      {/* Attribution */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `${accentColor}18`,
            border: `2px solid ${accentColor}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: accentColor }}>
            VC
          </span>
        </div>
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {name}
          </p>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.3 }}>
            {title}, {org}
          </p>
        </div>
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
      className="industry-photo-wrap"
      style={{
        borderRadius: 10,
        overflow: "hidden",
        minHeight: 320,
        position: "relative",
        boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
        color: ink[900],
        background: "#ffffff",
      }}
    >
      {/* Hover effects and section styles injected via style tag */}
      <style>{`
        .industry-photo-wrap:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 64px rgba(0,0,0,0.26) !important;
        }
        .industry-section {
          transition: background 0.2s ease;
        }
      `}</style>

      <MarketingNav />

      {/* ─── Hero ─── */}
      <section style={{ padding: "100px 32px 64px", borderBottom: `1px solid ${ink[100]}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accent, marginBottom: 24 }}>
            Industry Solutions
          </div>
          <h1 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 24, maxWidth: 700 }}>
            Industry-specific oversight solutions.
          </h1>
          <p style={{ fontSize: 18, color: ink[500], lineHeight: 1.7, maxWidth: 560 }}>
            Tailored for operations leaders in aviation, healthcare, and corporate sectors.
          </p>
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
                borderLeft: `3px solid ${industry.accentColor}`,
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
              title={industry.testimonial.title}
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
            className="industry-section"
            style={{
              padding: "80px 32px",
              background: sectionBg,
              borderTop: "1px solid #e2e8f0",
              borderLeft: `3px solid ${industry.accentColor}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Faded section number as decorative background element */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "50%",
                right: isAlt ? "auto" : 32,
                left: isAlt ? 32 : "auto",
                transform: "translateY(-50%)",
                fontSize: 180,
                fontWeight: 900,
                lineHeight: 1,
                color: industry.accentColor,
                opacity: 0.04,
                pointerEvents: "none",
                userSelect: "none",
                fontFamily: "Georgia, 'Times New Roman', serif",
                letterSpacing: "-8px",
              }}
            >
              {industry.sectionNumber}
            </div>

            <div
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                display: "flex",
                gap: 56,
                alignItems: "flex-start",
                flexWrap: "wrap" as const,
                flexDirection: isAlt ? "row-reverse" : "row",
                position: "relative",
                zIndex: 1,
              }}
            >
              {visualBlock}
              {contentBlock}
            </div>
          </section>
        );
      })}

      {/* ─── CTA ─── */}
      <section style={{ padding: "80px 32px", background: ink[900] }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-1px", marginBottom: 16 }}>
            See IQS Flow in action
          </h2>
          <p style={{ color: ink[400], fontSize: 17, lineHeight: 1.65, marginBottom: 36 }}>
            See how IQS Flow delivers measurable results across your industry from day one.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: "#ffffff", color: ink[900], borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Request a Demo <ArrowRight size={16} />
            </Link>
            <Link href="/why-iqs" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "transparent", color: ink[300], borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.1)" }}>
              See Features
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
