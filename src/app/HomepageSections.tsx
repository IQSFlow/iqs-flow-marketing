"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  AlertTriangle,
  ClipboardCheck,
  Navigation,
  BarChart2,
  TrendingUp,
  Link2,
  CheckSquare,
  ShieldX,
  FileEdit,
  EyeOff,
  Plane,
  Hospital,
  Building2,
  XCircle,
  CheckCircle2,
  BadgeCheck,
  Users,
  Shield,
  Radio,
  Sparkles,
} from "lucide-react";
import { marketing } from "@/lib/design-tokens";

/* ─── Golden ratio & proportional constants ─── */
const PHI = 1.618;
const SECTION_Y = 120; // base vertical rhythm
const CONTENT_MAX = 1120;
const NARROW_MAX = 720;

/* ─── Color palette from design tokens ─── */
const ink = marketing.ink;
const accent = marketing.accent;
const accentDark = marketing.accentDark;

/* (counter hook removed — no longer using animated stats) */

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Shared transition helper ─── */
function revealStyle(inView: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  };
}

/* ─── FloatingDots component ─── */
function FloatingDots() {
  const dots = [
    { size: 8, top: "10%", left: "5%", color: "#2980b9", opacity: 0.06, duration: 18, delay: 0 },
    { size: 12, top: "25%", left: "88%", color: "#2980b9", opacity: 0.05, duration: 22, delay: 3 },
    { size: 5, top: "60%", left: "12%", color: "#3b82f6", opacity: 0.07, duration: 15, delay: 1.5 },
    { size: 10, top: "80%", left: "75%", color: "#2980b9", opacity: 0.04, duration: 28, delay: 5 },
    { size: 7, top: "45%", left: "95%", color: "#60a5fa", opacity: 0.06, duration: 20, delay: 2 },
    { size: 9, top: "15%", left: "55%", color: "#2980b9", opacity: 0.05, duration: 25, delay: 4 },
    { size: 4, top: "70%", left: "35%", color: "#3b82f6", opacity: 0.08, duration: 17, delay: 0.5 },
    { size: 11, top: "90%", left: "20%", color: "#2980b9", opacity: 0.04, duration: 30, delay: 6 },
  ];

  return (
    <>
      {dots.map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: dot.color,
            opacity: dot.opacity,
            top: dot.top,
            left: dot.left,
            animation: `floatDot${i} ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}
      <style>{`
        ${dots.map((_, i) => `
          @keyframes floatDot${i} {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-${12 + (i % 4) * 5}px); }
          }
        `).join("")}
      `}</style>
    </>
  );
}

/* ════════════════════════════════════════════════
   0. SCROLL PROGRESS INDICATOR
   ════════════════════════════════════════════════ */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: 3,
        background: `linear-gradient(90deg, ${accent}, #7c3aed)`,
        zIndex: 9999,
        transition: "width 0.1s linear",
      }}
    />
  );
}

/* ════════════════════════════════════════════════
   1. HERO — Left-aligned, asymmetric 3:2 layout
   ════════════════════════════════════════════════ */
export function HeroSection() {
  const [demoHovered, setDemoHovered] = useState(false);
  const [signInHovered, setSignInHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState<number | null>(null);
  const { ref, inView } = useInView(0.1);

  const capabilityCards = [
    {
      icon: Users,
      title: "Multi-vendor visibility",
      desc: "Compare every contractor on a unified rubric across all your sites.",
      borderColor: accent,
      offsetX: 0,
    },
    {
      icon: Shield,
      title: "Real-time inspections",
      desc: "GPS-verified, photo-documented audits with live compliance scoring.",
      borderColor: "#059669",
      offsetX: -12,
    },
    {
      icon: Radio,
      title: "Compliance automation",
      desc: "6 built-in frameworks score every site against industry standards.",
      borderColor: "#7c3aed",
      offsetX: 8,
    },
  ] as const;

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff",
        borderBottom: `1px solid ${ink[100]}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: "0 auto",
          padding: `${SECTION_Y}px 32px ${Math.round(SECTION_Y * 0.75)}px`,
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: 64,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left: copy */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: accent,
              marginBottom: 24,
              ...revealStyle(inView, 0),
            }}
          >
            Quality Intelligence Platform
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 4.5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              color: ink[900],
              marginBottom: 28,
              ...revealStyle(inView, 0.05),
            }}
          >
            One Platform.
            <br />
            Every Vendor.
            <br />
            Every Operation.
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: ink[500],
              maxWidth: 480,
              marginBottom: 40,
              ...revealStyle(inView, 0.1),
            }}
          >
            IQS Flow gives operations leaders independent, real-time quality
            intelligence across every vendor, every site, every shift. All from
            one platform.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 48,
              ...revealStyle(inView, 0.15),
            }}
          >
            <Link
              href="/contact"
              onMouseEnter={() => setDemoHovered(true)}
              onMouseLeave={() => setDemoHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: demoHovered ? accentDark : accent,
                color: "#ffffff",
                padding: "16px 32px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                transition: "background 0.2s ease, transform 0.2s ease",
                transform: demoHovered ? "translateY(-1px)" : "none",
              }}
            >
              Request a Demo
              <ArrowRight size={16} />
            </Link>
            <Link
              href="https://app.iqsflow.com/login"
              onMouseEnter={() => setSignInHovered(true)}
              onMouseLeave={() => setSignInHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: ink[600],
                padding: "16px 32px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: `1.5px solid ${ink[200]}`,
                transition: "all 0.2s ease",
                borderColor: signInHovered ? ink[300] : ink[200],
              }}
            >
              Sign In
            </Link>
          </div>

          {/* Trust line */}
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              ...revealStyle(inView, 0.2),
            }}
          >
            {["Multi-site visibility", "Compliance-ready", "Real-time tracking", "AI-powered verification"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: ink[400],
                  fontWeight: 500,
                }}
              >
                <Check size={14} style={{ color: "#059669" }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: browser-frame mockup + capability badge cards */}
        <div
          style={{
            ...revealStyle(inView, 0.15),
          }}
        >
          {/* Browser frame mockup */}
          <div
            style={{
              background: ink[25],
              border: `1px solid ${ink[100]}`,
              borderRadius: "12px 12px 8px 8px",
              overflow: "hidden",
            }}
          >
            {/* Browser chrome bar */}
            <div
              style={{
                background: ink[50],
                borderBottom: `1px solid ${ink[100]}`,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Traffic light dots */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              </div>
              {/* URL bar */}
              <div
                style={{
                  flex: 1,
                  background: "#ffffff",
                  border: `1px solid ${ink[100]}`,
                  borderRadius: 6,
                  padding: "4px 12px",
                  fontSize: 12,
                  color: ink[400],
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                app.iqsflow.com
              </div>
            </div>

            {/* Cards container */}
            <div
              style={{
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {capabilityCards.map(({ icon: Icon, title, desc, borderColor, offsetX }, i) => (
                <div
                  key={title}
                  onMouseEnter={() => setCardHovered(i)}
                  onMouseLeave={() => setCardHovered(null)}
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${ink[100]}`,
                    borderLeft: `3px solid ${borderColor}`,
                    borderRadius: 10,
                    padding: "18px 16px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    transform: cardHovered === i
                      ? `translateX(${offsetX}px) translateY(-3px)`
                      : `translateX(${offsetX}px)`,
                    boxShadow: cardHovered === i
                      ? "0 12px 36px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)"
                      : "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    marginBottom: i < capabilityCards.length - 1 ? -6 : 0,
                    position: "relative",
                    zIndex: capabilityCards.length - i,
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: i === 0 ? `${accent}15` : i === 1 ? "#05966915" : "#7c3aed15",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} style={{ color: borderColor }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: ink[900], marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 12, color: ink[400], lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   2. SOCIAL PROOF BAR — Numbers-first strip
   ════════════════════════════════════════════════ */
export function SocialProofBar() {
  const { ref, inView } = useInView(0.3);

  const items = [
    { stat: "4 Portals", label: "Admin, manager, worker, client" },
    { stat: "6 Frameworks", label: "Compliance standards built in" },
    { stat: "Real-Time", label: "GPS tracking & live dashboards" },
    { stat: "AI-Verified", label: "Photo analysis & smart scoring" },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: ink[25],
        borderBottom: `1px solid ${ink[100]}`,
        padding: "36px 32px",
      }}
    >
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
        }}
        className="proof-grid"
      >
        {items.map(({ stat, label }, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              ...revealStyle(inView, i * 0.06),
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "-0.3px",
                color: ink[800],
                lineHeight: 1,
              }}
            >
              {stat}
            </span>
            <span style={{ fontSize: 13, color: ink[400], fontWeight: 500, lineHeight: 1.4 }}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .proof-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   3. THE PROBLEM — Dark, editorial layout
   ════════════════════════════════════════════════ */
const problems = [
  {
    icon: ShieldX,
    num: "01",
    title: "Vendor-Controlled Data",
    body: "Your cleaning contractor reports their own performance metrics. Self-graded homework means conflicts of interest go undetected, and compliance gaps remain hidden until audits expose them.",
    tag: "Accountability Gap",
  },
  {
    icon: FileEdit,
    num: "02",
    title: "Manual Inconsistent Audits",
    body: "Paper forms, disconnected spreadsheets, and occasional walkthroughs produce inconsistent results. No photo documentation, no timestamp trail, no defensible audit record when issues escalate.",
    tag: "Process Failure",
  },
  {
    icon: EyeOff,
    num: "03",
    title: "No Portfolio-Wide Visibility",
    body: "Each site operates as an island. You cannot benchmark standards, identify systemic patterns, or compare contractor performance across locations without weeks of manual data aggregation.",
    tag: "Strategic Blind Spot",
  },
];

export function ProblemSection() {
  const { ref, inView } = useInView(0.1);
  const [cardHovered, setCardHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{
        background: ink[900],
        padding: `${SECTION_Y}px 32px`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating dots background */}
      <FloatingDots />

      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header — left-aligned */}
        <div
          style={{
            maxWidth: NARROW_MAX,
            marginBottom: Math.round(SECTION_Y * PHI * 0.5),
            ...revealStyle(inView),
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ef4444",
              marginBottom: 20,
            }}
          >
            <AlertTriangle size={14} />
            The Trust Gap
          </div>
          <h2
            style={{
              color: "#f8fafc",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Your quality data has a trust problem.
          </h2>
          <p style={{ color: ink[400], fontSize: 16, lineHeight: 1.7 }}>
            Three systemic failures that put your operations, your compliance,
            and your reputation at risk every day.
          </p>
        </div>

        {/* Cards — dominant first card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: 20,
          }}
          className="problem-grid"
        >
          {problems.map(({ icon: ProblemIcon, num, title, body, tag }, i) => (
            <div
              key={title}
              onMouseEnter={() => setCardHovered(i)}
              onMouseLeave={() => setCardHovered(null)}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: i === 0 ? "36px 32px" : "28px 24px",
                cursor: "default",
                transform: cardHovered === i ? "translateY(-4px)" : "none",
                transition: "all 0.3s ease",
                ...revealStyle(inView, 0.1 + i * 0.1),
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#ef4444",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 800, fontSize: 12 }}>{num}</span>
                {tag}
              </div>

              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.15)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <ProblemIcon size={20} style={{ color: "#ef4444" }} />
              </div>

              <h3
                style={{
                  color: "#f1f5f9",
                  fontSize: i === 0 ? 20 : 17,
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                  marginBottom: 12,
                  lineHeight: 1.25,
                }}
              >
                {title}
              </h3>
              <p style={{ color: ink[300], fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .problem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   4. PLATFORM OVERVIEW — Staggered feature layout
   ════════════════════════════════════════════════ */
const features = [
  {
    icon: ClipboardCheck,
    title: "Intelligent Work Orders",
    body: "Dispatch, track, and close work orders with full photo documentation, geolocation stamps, and SLA enforcement. Every task is timestamped and audit-ready.",
    bullets: ["Automated SLA escalation", "Photo + GPS evidence capture", "Multi-vendor assignment"],
  },
  {
    icon: Navigation,
    title: "Real-Time GPS Inspections",
    body: "Independent inspectors verify completion on-site using structured digital forms. Live GPS tracks every crew member and inspection event.",
    bullets: ["Live crew location tracking", "Standardized inspection scoring", "Offline-capable mobile app"],
  },
  {
    icon: BarChart2,
    title: "Compliance & Analytics Engine",
    body: "Aggregate performance data across every site, vendor, and compliance framework. Drill from portfolio-wide trends down to individual shift records.",
    bullets: ["6 compliance frameworks", "Cross-site benchmarking", "Exportable audit trails"],
  },
  {
    icon: Sparkles,
    title: "AI Intelligence",
    body: "Vision AI scores every cleaning photo automatically. NLP analyzes ticket sentiment and auto-escalates priority. Smart translation lets every worker use forms in their language.",
    bullets: ["Photo verification with Vision AI", "Sentiment-based ticket escalation", "Automatic form translation"],
  },
];

export function PlatformSection() {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff",
        padding: `${SECTION_Y}px 32px`,
        borderBottom: `1px solid ${ink[100]}`,
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            marginBottom: Math.round(SECTION_Y * PHI * 0.5),
            alignItems: "end",
          }}
          className="platform-header"
        >
          <div style={revealStyle(inView)}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: accent,
                marginBottom: 20,
              }}
            >
              The Platform
            </div>
            <h2
              style={{
                color: ink[900],
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              One platform.
              <br />
              Complete visibility.
            </h2>
          </div>
          <p
            style={{
              color: ink[400],
              fontSize: 17,
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 420,
              ...revealStyle(inView, 0.08),
            }}
          >
            Four integrated modules that give operations leaders the independent
            data they need to manage quality at scale.
          </p>
        </div>

        {/* Feature cards — first card is 2:1 width ratio to emphasize */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
          className="feature-grid"
        >
          {features.map(({ icon: FeatureIcon, title, body, bullets }, i) => (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? ink[25] : "#ffffff",
                border: `1px solid ${hovered === i ? ink[200] : ink[100]}`,
                borderRadius: 12,
                padding: "32px 28px",
                cursor: "default",
                transition: "all 0.25s ease",
                transform: hovered === i ? "translateY(-4px)" : "none",
                boxShadow: hovered === i
                  ? "0 12px 32px rgba(0,0,0,0.06)"
                  : "none",
                ...revealStyle(inView, 0.1 + i * 0.08),
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: hovered === i ? accent : ink[25],
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                  transition: "background 0.25s ease",
                }}
              >
                <FeatureIcon
                  size={22}
                  style={{
                    color: hovered === i ? "#fff" : accent,
                    transition: "color 0.25s ease",
                  }}
                />
              </div>

              <h3
                style={{
                  color: ink[900],
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                  marginBottom: 12,
                  lineHeight: 1.25,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: ink[400],
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                {body}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {bullets.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Check size={13} style={{ color: accent, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: ink[500], fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .platform-header { grid-template-columns: 1fr !important; }
          .feature-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   5. HOW IT WORKS — Horizontal timeline
   ════════════════════════════════════════════════ */
const steps = [
  { num: "01", icon: Link2, title: "Integrate", body: "Connect your sites, vendors, and existing systems in hours, not months." },
  { num: "02", icon: CheckSquare, title: "Validate", body: "Deploy independent inspectors with structured digital forms. Every visit is GPS-verified." },
  { num: "03", icon: BarChart2, title: "Analyze", body: "Aggregate data flows into dashboards automatically. Spot trends from any device." },
  { num: "04", icon: TrendingUp, title: "Optimize", body: "Use evidence-based insights to renegotiate contracts and raise standards." },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: ink[25],
        padding: `${SECTION_Y}px 32px`,
        borderTop: `1px solid ${ink[100]}`,
        borderBottom: `1px solid ${ink[100]}`,
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        {/* Header — centered for this section (timeline demands it) */}
        <div
          style={{
            textAlign: "center",
            marginBottom: Math.round(SECTION_Y * PHI * 0.5),
            ...revealStyle(inView),
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: accent,
              marginBottom: 20,
            }}
          >
            How It Works
          </div>
          <h2
            style={{
              color: ink[900],
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              margin: "0 0 16px",
            }}
          >
            From setup to insight in four steps
          </h2>
          <p style={{ color: ink[400], fontSize: 17, maxWidth: 460, margin: "0 auto", lineHeight: 1.6 }}>
            A structured approach that delivers measurable results from day one.
          </p>
        </div>

        {/* Steps — 4 columns with connecting line */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            position: "relative",
          }}
          className="steps-grid"
        >
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "12.5%",
              right: "12.5%",
              height: 1,
              background: ink[200],
              zIndex: 0,
            }}
            className="steps-line"
          />

          {steps.map(({ num, icon: StepIcon, title, body }, i) => (
            <div
              key={title}
              style={{
                textAlign: "center",
                padding: "0 16px",
                position: "relative",
                zIndex: 1,
                ...revealStyle(inView, 0.1 + i * 0.1),
              }}
            >
              {/* Number dot */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                  background: accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#ffffff",
                  boxShadow: `0 4px 12px ${accent}30`,
                }}
              >
                <StepIcon size={18} />
              </div>

              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: ink[200],
                  letterSpacing: "-1px",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {num}
              </div>
              <h3
                style={{
                  color: ink[900],
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                  marginBottom: 10,
                }}
              >
                {title}
              </h3>
              <p style={{ color: ink[400], fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .steps-line { display: none !important; }
        }
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   6. INDUSTRY SOLUTIONS — Tab layout, left header
   ════════════════════════════════════════════════ */
/* Industry accent colors — each industry gets its own subtle tint */
const industryAccents: Record<string, string> = {
  airlines: "#3b82f6",  // manager blue
  airports: "#7c3aed",  // admin violet
  corporate: "#b45309", // client amber
  healthcare: "#059669", // worker green
  maintenance: "#6366f1", // indigo
};

/* Industry stat block background gradients — subtle overlay per industry */
const industryStatGradients: Record<string, string> = {
  airlines: "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(41,128,185,0.03) 100%)",
  airports: "linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(109,40,217,0.03) 100%)",
  corporate: "linear-gradient(135deg, rgba(180,83,9,0.04) 0%, rgba(217,119,6,0.03) 100%)",
  healthcare: "linear-gradient(135deg, rgba(5,150,105,0.05) 0%, rgba(16,185,129,0.03) 100%)",
  maintenance: "linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(79,70,229,0.03) 100%)",
};

const industries = [
  {
    id: "airlines",
    label: "Airlines",
    icon: Plane,
    stat: "Gate-level",
    statLabel: "Tracking & verification",
    title: "Every gate, every turn, every airport.",
    painPoints: [
      "Vendor-reported cleaning completion with no independent verification",
      "Gate-level compliance gaps invisible until a passenger complaint",
      "Multi-carrier, multi-vendor coordination with no unified data",
    ],
    features: [
      "Track cleaning quality across your network",
      "Real-time task completion by gate",
      "Gate-level compliance scoring",
      "Multi-vendor performance comparison",
    ],
    quote: "We built IQS Flow so operations teams can hold vendors accountable with data, not promises. Every task is tracked, every inspection is verified.",
    role: "Venice Collier, CEO & Founder",
  },
  {
    id: "airports",
    label: "Airports",
    icon: Plane,
    stat: "Zone-by-zone",
    statLabel: "Inspections & scoring",
    title: "Terminal-wide visibility, terminal by terminal.",
    painPoints: [
      "Terminal cleaning contractors report their own pass/fail metrics",
      "Compliance gaps surface only during formal regulatory reviews",
      "No unified view across terminals, concourses, and vendors",
    ],
    features: [
      "Monitor contractors across concourses",
      "GPS tracking of cleaning crews",
      "Digital inspections with photo capture",
      "Automated compliance scoring",
    ],
    quote: "Airport operations teams need one view across every terminal and vendor. IQS Flow delivers that with GPS-verified inspections and automated compliance scoring.",
    role: "Venice Collier, CEO & Founder",
  },
  {
    id: "corporate",
    label: "Banks & Corporate",
    icon: Building2,
    stat: "Scorecard",
    statLabel: "Vendor analytics",
    title: "Hundreds of branches, one quality standard.",
    painPoints: [
      "Hundreds of locations with different contractors, standards, and reporting",
      "No way to benchmark performance or justify contract renegotiations",
      "Quality issues discovered through employee complaints, not proactive monitoring",
    ],
    features: [
      "Consistent quality across every location",
      "Automated audits with SLA tracking",
      "Multi-vendor performance dashboards",
      "Branch-level compliance reporting",
    ],
    quote: "After 15 years managing vendor operations, I built IQS Flow because clients deserve the same quality data their vendors keep internally.",
    role: "Venice Collier, CEO & Founder",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: Hospital,
    stat: "JCAHO-ready",
    statLabel: "Compliance tracking",
    title: "Compliance-grade cleanliness, verified.",
    painPoints: [
      "Regulatory inspections require complete, timestamped documentation",
      "HAI risk driven by inconsistent environmental services standards",
      "Contractor performance varies by shift with no real-time oversight",
    ],
    features: [
      "Meet regulatory standards across facilities",
      "Inspection scoring by framework",
      "Complete audit trails",
      "Independent verification of cleaning quality",
    ],
    quote: "Healthcare compliance requires complete, timestamped documentation. IQS Flow generates audit-ready records automatically so your team can focus on patient care.",
    role: "Venice Collier, CEO & Founder",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: ClipboardCheck,
    stat: "Work order",
    statLabel: "Lifecycle tracking",
    title: "Every asset, every schedule, every vendor.",
    painPoints: [
      "Reactive maintenance driven by tenant complaints, not preventive schedules",
      "No visibility into vendor response times or completion quality",
      "Paper-based work orders with no audit trail or SLA tracking",
    ],
    features: [
      "Preventive maintenance scheduling",
      "Work order lifecycle tracking",
      "Vendor SLA monitoring and scoring",
      "Photo-verified task completion",
    ],
    quote: "Facility maintenance teams juggle dozens of vendors and thousands of assets. IQS Flow brings it all into one platform with real accountability.",
    role: "Venice Collier, CEO & Founder",
  },
];

export function IndustrySolutionsSection() {
  const { ref, inView } = useInView(0.1);
  const [activeTab, setActiveTab] = useState(0);
  const [tabHovered, setTabHovered] = useState<number | null>(null);
  const active = industries[activeTab];

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff",
        padding: `${SECTION_Y}px 32px`,
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            maxWidth: NARROW_MAX,
            marginBottom: 48,
            ...revealStyle(inView),
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: accent,
              marginBottom: 20,
            }}
          >
            Industry Solutions
          </div>
          <h2
            style={{
              color: ink[900],
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Built for your industry
          </h2>
          <p style={{ color: ink[400], fontSize: 17, lineHeight: 1.65 }}>
            IQS Flow adapts to the compliance requirements and operational
            realities of your sector.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 40,
            borderBottom: `1px solid ${ink[100]}`,
            ...revealStyle(inView, 0.1),
          }}
        >
          {industries.map(({ id, label, icon: IndustryIcon }, i) => {
            const tabAccent = industryAccents[id] || accent;
            return (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                onMouseEnter={() => setTabHovered(i)}
                onMouseLeave={() => setTabHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 20px",
                  background: "transparent",
                  border: "none",
                  borderBottom: activeTab === i ? `2px solid ${tabAccent}` : "2px solid transparent",
                  color: activeTab === i ? ink[900] : tabHovered === i ? ink[600] : ink[400],
                  fontWeight: activeTab === i ? 700 : 500,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  marginBottom: -1,
                }}
              >
                <IndustryIcon size={16} style={{ color: activeTab === i ? tabAccent : "currentColor" }} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab content — 3:2 split */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: 32,
            alignItems: "start",
            animation: "industryFadeIn 0.35s ease",
          }}
          className="industry-grid"
          key={activeTab}
        >
          {/* Left */}
          <div>
            {/* Stat block */}
            <div
              style={{
                background: `${ink[800]}`,
                backgroundImage: industryStatGradients[active.id],
                borderRadius: 12,
                padding: "32px 28px",
                marginBottom: 20,
                borderLeft: `3px solid ${industryAccents[active.id] || accent}`,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-1.5px", color: industryAccents[active.id] || "#ffffff", lineHeight: 1, marginBottom: 4 }}>
                {active.stat}
              </div>
              <div style={{ fontSize: 14, color: ink[400], fontWeight: 500, marginBottom: 20 }}>
                {active.statLabel}
              </div>
              <h3 style={{ color: "#f1f5f9", fontSize: 17, fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
                {active.title}
              </h3>
            </div>

            {/* Pain points */}
            <div
              style={{
                background: "#fef2f2",
                border: `1px solid #fecaca`,
                borderRadius: 12,
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#ef4444",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <XCircle size={13} />
                Common Pain Points
              </div>
              {active.painPoints.map((p) => (
                <div
                  key={p}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}
                >
                  <span style={{ color: "#ef4444", flexShrink: 0, marginTop: 2, fontSize: 14 }}>x</span>
                  <span style={{ color: "#7f1d1d", fontSize: 14, lineHeight: 1.55 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Capabilities */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 12,
                padding: "24px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#059669",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <BadgeCheck size={13} />
                IQS Flow Capabilities
              </div>
              {active.features.map((f) => (
                <div
                  key={f}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}
                >
                  <CheckCircle2 size={14} style={{ color: "#059669", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "#14532d", fontSize: 14, lineHeight: 1.55 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div
              style={{
                borderLeft: `3px solid ${ink[200]}`,
                padding: "20px 24px",
              }}
            >
              <p
                style={{
                  color: ink[600],
                  fontSize: 15,
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  margin: "0 0 12px",
                }}
              >
                &ldquo;{active.quote}&rdquo;
              </p>
              <div style={{ color: ink[400], fontSize: 13, fontWeight: 600 }}>
                {active.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes industryFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          .industry-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   7. FOUNDER QUOTE — editorial testimonial
   ════════════════════════════════════════════════ */
export function FounderQuoteSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      ref={ref}
      style={{
        background: ink[25],
        borderTop: `1px solid ${ink[100]}`,
        borderBottom: `1px solid ${ink[100]}`,
        padding: `${SECTION_Y}px 32px`,
      }}
    >
      <div
        style={{
          maxWidth: NARROW_MAX,
          margin: "0 auto",
          textAlign: "center",
          ...revealStyle(inView),
        }}
      >
        <div
          style={{
            fontSize: 48,
            lineHeight: 1,
            color: ink[200],
            marginBottom: 24,
            fontFamily: "Georgia, serif",
          }}
        >
          &ldquo;
        </div>
        <blockquote
          style={{
            fontSize: "clamp(17px, 2vw, 21px)",
            lineHeight: 1.7,
            color: ink[700],
            fontStyle: "italic",
            margin: "0 0 32px",
            fontWeight: 400,
          }}
        >
          We built IQS Flow because we ran the programs ourselves. After 15+ years
          managing vendor operations, we knew the industry needed independent quality
          intelligence, not more vendor self-reporting.
        </blockquote>
        <div style={{ fontSize: 14, fontWeight: 700, color: ink[500], letterSpacing: "0.04em" }}>
          Venice Collier &amp; Joshua Hinton, Co-founders
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   8. ASSESSMENT CTA — vendor oversight hook
   ════════════════════════════════════════════════ */
export function AssessmentCTASection() {
  const { ref, inView } = useInView(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff",
        padding: `${SECTION_Y}px 32px`,
        borderBottom: `1px solid ${ink[100]}`,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          ...revealStyle(inView),
        }}
        className="assessment-grid"
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: accent,
              marginBottom: 20,
            }}
          >
            Free Assessment
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.15,
              color: ink[900],
              marginBottom: 16,
            }}
          >
            How exposed is your vendor oversight?
          </h2>
          <p style={{ fontSize: 16, color: ink[500], lineHeight: 1.7, margin: 0 }}>
            Take the free Vendor Accountability Assessment and get your score in
            under 2 minutes.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <Link
            href="/resources/vendor-accountability-assessment"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: hovered ? accentDark : accent,
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              transition: "background 0.2s ease, transform 0.2s ease",
              transform: hovered ? "translateY(-1px)" : "none",
            }}
          >
            Take the free Vendor Accountability Assessment
            <ArrowRight size={16} />
          </Link>
          <div style={{ fontSize: 13, color: ink[400] }}>
            Takes 3 minutes. No email required to see your score.
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .assessment-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════
   9. PORTAL SHOWCASE + CTA — dark, confident
   ════════════════════════════════════════════════ */
export function StatsCTASection() {
  const { ref, inView } = useInView(0.15);
  const [demoHovered, setDemoHovered] = useState(false);
  const [industryHovered, setIndustryHovered] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #0a0f1a 0%, #0f2b4a 50%, #0a0f1a 100%)",
        padding: `${SECTION_Y}px 32px`,
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Portal showcase — shows the 4 role-based portals with their accent colors */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 80,
            paddingBottom: 80,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          className="stats-grid"
        >
          {([
            { label: "Admin", accent: "#7c3aed", desc: "Full system control" },
            { label: "Manager", accent: "#3b82f6", desc: "Site oversight" },
            { label: "Worker", accent: "#059669", desc: "Mobile inspections" },
            { label: "Client", accent: "#b45309", desc: "Read-only visibility" },
          ] as const).map(({ label, accent: portalAccent, desc }, i) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                ...revealStyle(inView, i * 0.08),
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${portalAccent}20`,
                  border: `1.5px solid ${portalAccent}40`,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: portalAccent,
                  letterSpacing: "-0.3px",
                }}
              >
                {label[0]}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", marginBottom: 2 }}>
                {label}
              </div>
              <div style={{ fontSize: 12, color: ink[400] }}>
                {desc}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            ...revealStyle(inView, 0.3),
          }}
        >
          <h2
            style={{
              color: "#f8fafc",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Ready to see the difference?
          </h2>
          <p
            style={{
              color: ink[400],
              fontSize: 17,
              maxWidth: 440,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Join operations leaders across aviation, healthcare, and corporate
            operations who trust IQS Flow.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              onMouseEnter={() => setDemoHovered(true)}
              onMouseLeave={() => setDemoHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#ffffff",
                color: ink[900],
                padding: "16px 32px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                transition: "transform 0.2s ease",
                transform: demoHovered ? "translateY(-1px)" : "none",
              }}
            >
              Request a Demo
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/industries"
              onMouseEnter={() => setIndustryHovered(true)}
              onMouseLeave={() => setIndustryHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: industryHovered ? ink[200] : ink[400],
                padding: "16px 32px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: `1.5px solid ${industryHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)"}`,
                transition: "all 0.2s ease",
              }}
            >
              Browse Industries
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
