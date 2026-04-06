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
} from "lucide-react";

/* ─── Golden ratio & proportional constants ─── */
const PHI = 1.618;
const SECTION_Y = 120; // base vertical rhythm
const CONTENT_MAX = 1120;
const NARROW_MAX = 720;

/* ─── Color palette: ink + single accent ─── */
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
const accentDark = "#1e40af";
/* palette: accentLight = "#dbeafe" */

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return value;
}

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

/* ════════════════════════════════════════════════
   1. HERO — Left-aligned, asymmetric 3:2 layout
   ════════════════════════════════════════════════ */
export function HeroSection() {
  const [demoHovered, setDemoHovered] = useState(false);
  const [signInHovered, setSignInHovered] = useState(false);
  const { ref, inView } = useInView(0.1);

  const heroDots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 11) % 100}%`,
    size: 2 + (i % 3),
    duration: 18 + (i % 12) * 3,
    delay: (i % 8) * 2.5,
  }));

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff",
        borderBottom: `1px solid ${ink[100]}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating dots */}
      {heroDots.map((dot) => (
        <div
          key={dot.id}
          style={{
            position: "absolute",
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: accent,
            opacity: 0.07,
            animation: `heroFloat ${dot.duration}s ${dot.delay}s infinite ease-in-out`,
            pointerEvents: "none",
          }}
        />
      ))}
      <div
        style={{
          maxWidth: CONTENT_MAX,
          margin: "0 auto",
          padding: `${SECTION_Y}px 32px ${Math.round(SECTION_Y * 0.75)}px`,
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          position: "relative",
          zIndex: 1,
          gap: 64,
          alignItems: "center",
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
            {["Multi-site visibility", "Compliance-ready", "Real-time tracking"].map((item) => (
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

        {/* Right: proof metrics panel */}
        <HeroMetricsPanel inView={inView} />
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @keyframes heroFloat {
          0% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-8px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes gridShift {
          0% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(12px) translateY(8px); }
          50% { transform: translateX(24px) translateY(0px); }
          75% { transform: translateX(12px) translateY(-8px); }
          100% { transform: translateX(0px) translateY(0px); }
        }
      `}</style>
    </section>
  );
}

/* Animated metric row using useCountUp */
function MetricRow({ target, suffix, label, delay, index, inView }: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
  index: number;
  inView: boolean;
}) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [inView, delay]);
  const count = useCountUp(target, 1800, started);

  return (
    <div
      style={{
        borderTop: index > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
        paddingTop: index > 0 ? 24 : 0,
        marginTop: index > 0 ? 24 : 0,
      }}
    >
      <div
        style={{
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: "-1.5px",
          lineHeight: 1,
          color: "#ffffff",
          marginBottom: 4,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}{suffix}
      </div>
      <div style={{ fontSize: 14, color: ink[400], fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function HeroMetricsPanel({ inView }: { inView: boolean }) {
  const metrics = [
    { target: 500, suffix: "+", label: "Facilities managed", delay: 0.1 },
    { target: 98, suffix: "%", label: "Compliance pass rate", delay: 0.3 },
    { target: 30, suffix: "%", label: "Average cost reduction", delay: 0.5 },
  ];

  return (
    <div style={{ ...revealStyle(inView, 0.15) }}>
      <div
        style={{
          background: ink[800],
          borderRadius: 12,
          padding: "40px 36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated grid texture */}
        <div
          className="hero-grid-texture"
          style={{
            position: "absolute",
            inset: "-24px",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
            animation: "gridShift 30s ease-in-out infinite",
          }}
        />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ink[400], marginBottom: 32 }}>
            Platform metrics
          </div>
          {metrics.map(({ target, suffix, label, delay }, i) => (
            <MetricRow
              key={label}
              target={target}
              suffix={suffix}
              label={label}
              delay={delay}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   2. SOCIAL PROOF BAR — Numbers-first strip
   ════════════════════════════════════════════════ */
export function SocialProofBar() {
  const { ref, inView } = useInView(0.3);

  const items = [
    { stat: "Multi-Site", label: "Visibility across every location" },
    { stat: "6 Frameworks", label: "Compliance standards built in" },
    { stat: "Real-Time", label: "GPS tracking & live dashboards" },
    { stat: "Vendor-Agnostic", label: "Works with any service provider" },
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
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "-0.2px",
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
    solution: "IQS Flow provides independent, third-party quality verification. Your data comes from our inspectors, not your vendors.",
  },
  {
    icon: FileEdit,
    num: "02",
    title: "Manual Inconsistent Audits",
    body: "Paper forms, disconnected spreadsheets, and occasional walkthroughs produce inconsistent results. No photo documentation, no timestamp trail, no defensible audit record when issues escalate.",
    tag: "Process Failure",
    solution: "Digital inspections with GPS stamps, photo evidence, and standardized scoring. Every audit is timestamped and defensible.",
  },
  {
    icon: EyeOff,
    num: "03",
    title: "No Portfolio-Wide Visibility",
    body: "Each site operates as an island. You cannot benchmark standards, identify systemic patterns, or compare contractor performance across locations without weeks of manual data aggregation.",
    tag: "Strategic Blind Spot",
    solution: "One dashboard across every site, every vendor. Benchmark performance, spot patterns, and compare contractors in real time.",
  },
];

/* Floating dots data for ProblemSection background */
const PROBLEM_DOTS = [
  { left: "5%", top: "80%", size: 2, duration: 18, delay: 0 },
  { left: "12%", top: "65%", size: 3, duration: 22, delay: 3 },
  { left: "20%", top: "90%", size: 2, duration: 16, delay: 7 },
  { left: "28%", top: "70%", size: 2, duration: 25, delay: 1 },
  { left: "35%", top: "85%", size: 3, duration: 20, delay: 5 },
  { left: "42%", top: "75%", size: 2, duration: 19, delay: 9 },
  { left: "50%", top: "88%", size: 2, duration: 23, delay: 2 },
  { left: "57%", top: "60%", size: 3, duration: 17, delay: 6 },
  { left: "63%", top: "78%", size: 2, duration: 21, delay: 4 },
  { left: "70%", top: "92%", size: 2, duration: 24, delay: 8 },
  { left: "76%", top: "68%", size: 3, duration: 15, delay: 11 },
  { left: "82%", top: "83%", size: 2, duration: 26, delay: 0 },
  { left: "88%", top: "72%", size: 2, duration: 18, delay: 3 },
  { left: "93%", top: "87%", size: 3, duration: 20, delay: 7 },
  { left: "8%", top: "40%", size: 2, duration: 28, delay: 13 },
  { left: "17%", top: "25%", size: 2, duration: 22, delay: 5 },
  { left: "47%", top: "35%", size: 3, duration: 19, delay: 10 },
  { left: "73%", top: "45%", size: 2, duration: 24, delay: 2 },
  { left: "91%", top: "30%", size: 2, duration: 17, delay: 8 },
];

export function ProblemSection() {
  const { ref, inView } = useInView(0.1);

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
      {/* Animated floating dots */}
      {PROBLEM_DOTS.map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            animation: `floatDot ${dot.duration}s ${dot.delay}s infinite linear`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto", position: "relative" }}>
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
            The Problem
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
          <p style={{ color: ink[400], fontSize: 17, lineHeight: 1.65 }}>
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
          {problems.map(({ icon: ProblemIcon, num, title, body, tag, solution }, i) => (
            <div
              key={title}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                overflow: "hidden",
                ...revealStyle(inView, 0.1 + i * 0.1),
              }}
            >
              {/* Problem half */}
              <div
                style={{
                  padding: i === 0 ? "32px 32px 24px" : "24px 24px 20px",
                  background: "rgba(239,68,68,0.03)",
                }}
              >
                <div
                  className={`problem-tag-${i}`}
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
                    animation: inView ? `tagToGreen 0.6s ${1.5 + i * 0.3}s forwards` : "none",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 800, fontSize: 12 }}>{num}</span>
                  {tag}
                </div>

                <div
                  className={`problem-icon-${i}`}
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.15)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    animation: inView ? `iconToGreen 0.6s ${1.5 + i * 0.3}s forwards` : "none",
                  }}
                >
                  <ProblemIcon size={20} style={{ color: "#ef4444", animation: inView ? `iconColorToGreen 0.6s ${1.5 + i * 0.3}s forwards` : "none" }} />
                </div>

                <h3
                  style={{
                    color: "#f1f5f9",
                    fontSize: i === 0 ? 20 : 17,
                    fontWeight: 700,
                    letterSpacing: "-0.3px",
                    marginBottom: 10,
                    lineHeight: 1.25,
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: ink[300], fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                  {body}
                </p>
              </div>

              {/* Animated divider with chevron */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 0",
                  background: "rgba(255,255,255,0.02)",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Horizontal gradient line */}
                <div style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                  height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.15), transparent)",
                  transform: "translateY(-50%)",
                }} />
                <div
                  style={{
                    animation: "chevronPulse 2.2s ease-in-out infinite",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    position: "relative",
                  }}
                >
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid rgba(34,197,94,0.45)",
                  }} />
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid rgba(34,197,94,0.22)",
                  }} />
                </div>
              </div>

              {/* Solution half */}
              <div
                style={{
                  padding: i === 0 ? "20px 32px 28px" : "16px 24px 22px",
                  background: "rgba(34,197,94,0.03)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#22c55e",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={9} style={{ color: "#22c55e" }} />
                  </div>
                  IQS Flow Solution
                </div>
                <p style={{ color: ink[200], fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                  {solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .problem-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes floatDot {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-120px) translateX(18px); opacity: 0; }
        }
        @keyframes chevronPulse {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(3px); opacity: 1; }
        }
        @keyframes tagToGreen {
          to { color: #22c55e; }
        }
        @keyframes iconToGreen {
          to { background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.15); }
        }
        @keyframes iconColorToGreen {
          to { color: #22c55e; }
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
            Three integrated modules that give operations leaders the independent
            data they need to manage quality at scale.
          </p>
        </div>

        {/* Feature cards — first card is 2:1 width ratio to emphasize */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
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
                borderRadius: 10,
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
                  width: 40,
                  height: 40,
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  border: `2px solid ${ink[200]}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: accent,
                }}
              >
                <StepIcon size={18} />
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: ink[300],
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Step {num}
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
const industries = [
  {
    id: "airlines",
    label: "Airlines",
    icon: Plane,
    stat: "400+",
    statLabel: "Gates tracked daily",
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
    quote: "We went from monthly PDF reports to live dashboards. Our team can now hold vendors accountable the same day an issue occurs.",
    role: "VP Operations, Major US Airline",
  },
  {
    id: "airports",
    label: "Airports",
    icon: Plane,
    stat: "99%",
    statLabel: "Inspection coverage",
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
    quote: "IQS Flow gave our operations team a live view of every terminal without adding headcount. We finally have an independent record to stand behind.",
    role: "Director of Operations, Major US Airport",
  },
  {
    id: "corporate",
    label: "Banks & Corporate",
    icon: Building2,
    stat: "30%",
    statLabel: "Average cost reduction",
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
    quote: "We renegotiated three vendor contracts using IQS Flow data. The ROI paid for the platform in the first quarter.",
    role: "COO, Fortune 500 Real Estate Portfolio",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: Hospital,
    stat: "99.2%",
    statLabel: "Audit pass rate",
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
    quote: "IQS Flow gave us the documentation infrastructure we needed to pass our next JCAHO review with confidence.",
    role: "Director of Environmental Services, Regional Health System",
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
          {industries.map(({ label, icon: IndustryIcon }, i) => (
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
                borderBottom: activeTab === i ? `2px solid ${accent}` : "2px solid transparent",
                color: activeTab === i ? ink[900] : tabHovered === i ? ink[600] : ink[400],
                fontWeight: activeTab === i ? 700 : 500,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginBottom: -1,
              }}
            >
              <IndustryIcon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content — 3:2 split */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: 32,
            alignItems: "start",
          }}
          className="industry-grid"
          key={activeTab}
        >
          {/* Left */}
          <div>
            {/* Stat block */}
            <div
              style={{
                background: ink[800],
                borderRadius: 10,
                padding: "32px 28px",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-2px", color: "#ffffff", lineHeight: 1, marginBottom: 4 }}>
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
                borderRadius: 10,
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
                borderRadius: 10,
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
   9. STATS + CTA — dark, confident
   ════════════════════════════════════════════════ */
function AnimatedStat({
  target,
  suffix,
  label,
  inView,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const value = useCountUp(target, 2000, inView);

  return (
    <div style={{ textAlign: "center", ...revealStyle(inView, delay) }}>
      <div
        style={{
          fontSize: "clamp(40px, 5vw, 64px)",
          fontWeight: 800,
          letterSpacing: "-2.5px",
          lineHeight: 1,
          color: "#ffffff",
        }}
      >
        {value}
        {suffix}
      </div>
      <div style={{ color: ink[400], fontSize: 14, fontWeight: 500, marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
}

export function StatsCTASection() {
  const { ref, inView } = useInView(0.15);
  const [demoHovered, setDemoHovered] = useState(false);
  const [industryHovered, setIndustryHovered] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        background: ink[900],
        padding: `${SECTION_Y}px 32px`,
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
            marginBottom: 80,
            paddingBottom: 80,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          className="stats-grid"
        >
          <AnimatedStat target={500} suffix="+" label="Facilities managed" inView={inView} delay={0} />
          <AnimatedStat target={98} suffix="%" label="Compliance pass rate" inView={inView} delay={0.1} />
          <AnimatedStat target={30} suffix="%" label="Average cost reduction" inView={inView} delay={0.2} />
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
