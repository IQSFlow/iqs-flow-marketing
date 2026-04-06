"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  PlayCircle,
  LogIn,
  Check,
  AlertTriangle,
  LayoutGrid,
  Navigation,
  Layers,
  XCircle,
  X,
  CheckCircle2,
  TrendingUp,
  Compass,
  Network,
  Shield,
  Radio,
  Handshake,
  ShieldX,
  FileEdit,
  EyeOff,
  ClipboardCheck,
  BarChart2,
  Link2,
  CheckSquare,
  Plane,
  Hospital,
  Building2,
} from "lucide-react";

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
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

/* ─── 1. HERO SECTION ─── */
export function HeroSection() {
  const [demoHovered, setDemoHovered] = useState(false);
  const [signInHovered, setSignInHovered] = useState(false);
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#ffffff",
        paddingTop: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "120px 32px 100px",
          textAlign: "center",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            border: "1px solid #bfdbfe",
            color: "#1d4ed8",
            borderRadius: 99,
            padding: "6px 16px 6px 10px",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 36,
            letterSpacing: "0.01em",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              background: "#2563eb",
              borderRadius: "50%",
              color: "#fff",
              fontSize: 11,
            }}
          >
            <BadgeCheck size={13} />
          </span>
          Quality Intelligence Platform
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 900,
            letterSpacing: "-2.5px",
            lineHeight: 1.0,
            marginBottom: 28,
            color: "#0f172a",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Stop Guessing.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Start Seeing.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            color: "#475569",
            lineHeight: 1.65,
            maxWidth: 620,
            margin: "0 auto 44px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          Your service vendors grade their own homework. IQS Flow gives you
          independent, real-time quality data across every site, every partner,
          every shift - so you can hold teams accountable with proof, not promises.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 40,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <Link
            href="/contact"
            onMouseEnter={() => setDemoHovered(true)}
            onMouseLeave={() => setDemoHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: demoHovered
                ? "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)"
                : "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              color: "#ffffff",
              padding: "15px 30px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: demoHovered
                ? "0 8px 24px rgba(37,99,235,0.4), 0 2px 6px rgba(37,99,235,0.2)"
                : "0 4px 16px rgba(37,99,235,0.3), 0 1px 4px rgba(37,99,235,0.15)",
              transform: demoHovered ? "translateY(-2px)" : "translateY(0)",
              transition: "all 0.2s ease",
            }}
          >
            <PlayCircle size={18} />
            Request a Demo
          </Link>
          <Link
            href="https://app.iqsflow.com/login"
            onMouseEnter={() => setSignInHovered(true)}
            onMouseLeave={() => setSignInHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: signInHovered ? "#f8fafc" : "#ffffff",
              color: "#0f172a",
              padding: "15px 30px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              border: "1.5px solid #e2e8f0",
              boxShadow: signInHovered
                ? "0 4px 12px rgba(0,0,0,0.08)"
                : "0 1px 4px rgba(0,0,0,0.04)",
              transform: signInHovered ? "translateY(-1px)" : "translateY(0)",
              transition: "all 0.2s ease",
            }}
          >
            <LogIn size={18} />
            Sign In
          </Link>
        </div>

        {/* Trust checks */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 28,
            flexWrap: "wrap",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          {["Multi-site visibility", "Compliance-ready", "Real-time tracking"].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "#475569",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              >
                <Check size={13} style={{ color: "#fff" }} />
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

/* ─── 2. SOCIAL PROOF BAR ─── */
const proofItems = [
  { icon: Network, label: "Multi-Site", desc: "Visibility across every location" },
  { icon: Shield, label: "6 Frameworks", desc: "Compliance standards built in" },
  { icon: Radio, label: "Real-Time", desc: "GPS tracking & live dashboards" },
  { icon: Handshake, label: "Vendor-Agnostic", desc: "Works with any service provider" },
];

export function SocialProofBar() {
  const { ref, inView } = useInView(0.2);
  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
        padding: "40px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {proofItems.map(({ icon: IconComp, label, desc }, i) => (
          <div
            key={label}
            style={{
              textAlign: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                borderRadius: 12,
                marginBottom: 10,
              }}
            >
              <IconComp size={22} style={{ color: "#2563eb" }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.3px" }}>
              {label}
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 3, lineHeight: 1.4 }}>
              {desc}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .proof-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── 3. THE PROBLEM (dark section) ─── */
const problems = [
  {
    icon: ShieldX,
    title: "Vendor-Controlled Data",
    body: "Your cleaning contractor reports their own performance metrics. Self-graded homework means conflicts of interest go undetected, and compliance gaps remain hidden until audits expose them.",
    accent: "#ef4444",
    tag: "Accountability Gap",
  },
  {
    icon: FileEdit,
    title: "Manual Inconsistent Audits",
    body: "Paper forms, disconnected spreadsheets, and occasional walkthroughs produce inconsistent results. No photo documentation, no timestamp trail, no defensible audit record when issues escalate.",
    accent: "#f59e0b",
    tag: "Process Failure",
  },
  {
    icon: EyeOff,
    title: "No Portfolio-Wide Visibility",
    body: "Each site operates as an island. You can't benchmark standards, identify systemic patterns, or compare contractor performance across locations without weeks of manual data aggregation.",
    accent: "#f97316",
    tag: "Strategic Blind Spot",
  },
];

export function ProblemSection() {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{
        background: "#0f172a",
        padding: "100px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#fca5a5",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <AlertTriangle size={14} />
            The Problem
          </div>
          <h2
            style={{
              color: "#f8fafc",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              margin: "0 0 16px",
            }}
          >
            Your quality data has a
            <br />
            <span style={{ color: "#ef4444" }}>trust problem.</span>
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 17,
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Three systemic failures that put your facilities, your compliance,
            and your reputation at risk every day.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {problems.map(({ icon: ProblemIcon, title, body, accent, tag }, i) => (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${hovered === i ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 16,
                padding: "32px 28px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                cursor: "default",
                transform: inView
                  ? hovered === i ? "translateY(-4px)" : "translateY(0)"
                  : "translateY(24px)",
                opacity: inView ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.3s ease`,
                boxShadow: hovered === i
                  ? `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent}20`
                  : "none",
              }}
            >
              {/* Tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: `${accent}18`,
                  border: `1px solid ${accent}35`,
                  borderRadius: 99,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {tag}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: `${accent}15`,
                  border: `1px solid ${accent}30`,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                <ProblemIcon size={24} style={{ color: accent }} />
              </div>

              <h3
                style={{
                  color: "#f1f5f9",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.4px",
                  marginBottom: 12,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: 14,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. PLATFORM OVERVIEW ─── */
const features = [
  {
    icon: ClipboardCheck,
    title: "Intelligent Work Orders",
    body: "Dispatch, track, and close work orders with full photo documentation, geolocation stamps, and SLA enforcement. Every task is timestamped and audit-ready from creation to completion.",
    bullets: ["Automated SLA escalation", "Photo + GPS evidence capture", "Multi-vendor assignment"],
  },
  {
    icon: Navigation,
    title: "Real-Time GPS Inspections",
    body: "Independent inspectors verify completion on-site using structured digital forms. Live GPS tracks every crew member and inspection event - no more self-reporting, no more gaps.",
    bullets: ["Live crew location tracking", "Standardized inspection scoring", "Offline-capable mobile app"],
  },
  {
    icon: BarChart2,
    title: "Compliance & Analytics Engine",
    body: "Aggregate performance data across every site, vendor, and compliance framework. Drill from portfolio-wide trends down to individual shift records in seconds.",
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
        padding: "100px 32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#1d4ed8",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <LayoutGrid size={14} />
            The Platform
          </div>
          <h2
            style={{
              color: "#0f172a",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              margin: "0 0 16px",
            }}
          >
            One platform.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Complete visibility.
            </span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: 17,
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Three integrated modules that give operations leaders the independent
            data they need to manage quality at scale.
          </p>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {features.map(({ icon: FeatureIcon, title, body, bullets }, i) => (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i
                  ? "linear-gradient(165deg, #f0f7ff 0%, #e8f2ff 100%)"
                  : "#fafbfc",
                border: `1.5px solid ${hovered === i ? "#bfdbfe" : "#e2e8f0"}`,
                borderRadius: 20,
                padding: "32px 28px",
                cursor: "default",
                transform: inView
                  ? hovered === i ? "translateY(-6px)" : "translateY(0)"
                  : "translateY(24px)",
                opacity: inView ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.3s ease, background 0.3s ease, border-color 0.3s ease`,
                boxShadow: hovered === i
                  ? "0 12px 36px rgba(37,99,235,0.12), 0 4px 12px rgba(37,99,235,0.06)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              {/* Icon badge */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: hovered === i
                    ? "linear-gradient(135deg, #1d4ed8, #2563eb)"
                    : "linear-gradient(135deg, #eff6ff, #dbeafe)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  transition: "background 0.3s ease",
                  boxShadow: hovered === i
                    ? "0 4px 12px rgba(37,99,235,0.3)"
                    : "none",
                }}
              >
                <FeatureIcon
                  size={26}
                  style={{
                    color: hovered === i ? "#fff" : "#2563eb",
                    transition: "color 0.3s ease",
                  }}
                />
              </div>

              <h3
                style={{
                  color: "#0f172a",
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "-0.4px",
                  marginBottom: 12,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: 14,
                  lineHeight: 1.65,
                  marginBottom: 20,
                }}
              >
                {body}
              </p>

              {/* Bullets */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {bullets.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 18,
                        height: 18,
                        background: "#dbeafe",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={11} style={{ color: "#2563eb" }} />
                    </span>
                    <span style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. HOW IT WORKS ─── */
const steps = [
  {
    num: "01",
    icon: Link2,
    title: "Integrate",
    body: "Connect your sites, vendors, and existing systems in hours - not months. Our flexible data model adapts to your operational structure.",
  },
  {
    num: "02",
    icon: CheckSquare,
    title: "Validate",
    body: "Deploy independent inspectors with structured digital forms. Every visit creates a timestamped, GPS-verified audit record.",
  },
  {
    num: "03",
    icon: BarChart2,
    title: "Analyze",
    body: "Aggregate data flows into dashboards automatically. Spot trends, benchmark vendors, and identify risk - from any device.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Optimize",
    body: "Use evidence-based insights to renegotiate contracts, reward performance, and systematically raise standards across your portfolio.",
  },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "100px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#1d4ed8",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <Navigation size={14} />
            How It Works
          </div>
          <h2
            style={{
              color: "#0f172a",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              margin: "0 0 16px",
            }}
          >
            From setup to insight in four steps
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: 17,
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            A structured approach that delivers measurable results from day one.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            position: "relative",
          }}
          className="how-it-works-grid"
        >
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: 36,
              left: "12.5%",
              right: "12.5%",
              height: 2,
              background: "linear-gradient(90deg, #bfdbfe 0%, #93c5fd 50%, #bfdbfe 100%)",
              zIndex: 0,
            }}
            className="how-it-works-line"
          />

          {steps.map(({ num, icon: StepIcon, title, body }, i) => (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textAlign: "center",
                padding: "0 20px",
                position: "relative",
                zIndex: 1,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
              }}
            >
              {/* Number circle */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                  background: hovered === i
                    ? "linear-gradient(135deg, #1e40af, #2563eb)"
                    : "linear-gradient(135deg, #dbeafe, #eff6ff)",
                  border: "3px solid #ffffff",
                  boxShadow: hovered === i
                    ? "0 8px 24px rgba(37,99,235,0.3), 0 0 0 4px rgba(37,99,235,0.1)"
                    : "0 2px 12px rgba(37,99,235,0.12), 0 0 0 4px #f0f7ff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  transition: "all 0.3s ease",
                }}
              >
                <StepIcon
                  size={22}
                  style={{
                    color: hovered === i ? "#fff" : "#2563eb",
                    transition: "color 0.3s ease",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#94a3b8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Step {num}
              </div>
              <h3
                style={{
                  color: "#0f172a",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                  marginBottom: 10,
                }}
              >
                {title}
              </h3>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .how-it-works-line {
            display: none !important;
          }
        }
        @media (max-width: 1023px) and (min-width: 768px) {
          .how-it-works-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
          .how-it-works-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── 6. INDUSTRY SOLUTIONS ─── */
const industries = [
  {
    id: "aviation",
    label: "Aviation",
    icon: Plane,
    stat: "400+",
    statLabel: "Gates Tracked Daily",
    title: "Aircraft turnaround quality, verified independently.",
    painPoints: [
      "Vendor-reported cleaning completion with no independent verification",
      "Gate-level compliance gaps invisible until a passenger complaint",
      "Multi-carrier, multi-vendor coordination with no unified data",
    ],
    features: [
      "Gate-level task completion tracking",
      "Real-time turnaround visibility per aircraft",
      "Multi-vendor performance benchmarking",
      "Regulatory compliance scoring by framework",
    ],
    quote: "We went from monthly PDF reports to live dashboards. Our team can now hold vendors accountable the same day an issue occurs.",
    role: "VP Facilities, Major US Airline",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: Hospital,
    stat: "99.2%",
    statLabel: "Audit Pass Rate",
    title: "Compliance-grade cleanliness, proven and traceable.",
    painPoints: [
      "Regulatory inspections require complete, timestamped documentation",
      "HAI risk driven by inconsistent environmental services standards",
      "Contractor performance varies by shift with no real-time oversight",
    ],
    features: [
      "JCAHO, APIC, and CDC framework scoring",
      "Room-level inspection with photo evidence",
      "Shift-by-shift contractor performance data",
      "Complete audit trails exportable on demand",
    ],
    quote: "IQS Flow gave us the documentation infrastructure we needed to pass our next JCAHO review with confidence.",
    role: "Director of Environmental Services, Regional Health System",
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: Building2,
    stat: "30%",
    statLabel: "Average Cost Reduction",
    title: "Portfolio-wide quality standards across every location.",
    painPoints: [
      "Hundreds of facilities with different contractors, standards, and reporting",
      "No way to benchmark performance or justify contract renegotiations",
      "Quality issues discovered through employee complaints, not proactive monitoring",
    ],
    features: [
      "Multi-site portfolio dashboard",
      "Automated SLA monitoring and escalation",
      "Vendor performance scorecards",
      "Cost-per-square-foot quality analytics",
    ],
    quote: "We renegotiated three vendor contracts using IQS Flow data. The ROI paid for the platform in the first quarter.",
    role: "COO, Fortune 500 Real Estate Portfolio",
  },
];

export function IndustrySolutionsSection() {
  const { ref, inView } = useInView(0.1);
  const [activeTab, setActiveTab] = useState(0);
  const active = industries[activeTab];

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff",
        padding: "100px 32px",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 48,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#1d4ed8",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <Layers size={14} />
            Industry Solutions
          </div>
          <h2
            style={{
              color: "#0f172a",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              margin: "0 0 16px",
            }}
          >
            Built for your industry
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: 17,
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            IQS Flow adapts to the compliance requirements and operational
            realities of your sector.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 48,
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {industries.map(({ label, icon: IndustryIcon }, i) => (
            <button
              key={label}
              onClick={() => setActiveTab(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 10,
                border: activeTab === i ? "1.5px solid #2563eb" : "1.5px solid #e2e8f0",
                background: activeTab === i
                  ? "linear-gradient(135deg, #eff6ff, #dbeafe)"
                  : "#ffffff",
                color: activeTab === i ? "#1d4ed8" : "#64748b",
                fontWeight: activeTab === i ? 700 : 500,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: activeTab === i ? "0 2px 8px rgba(37,99,235,0.15)" : "none",
              }}
            >
              <IndustryIcon size={18} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "start",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease 0.3s",
          }}
          className="industry-grid"
          key={activeTab}
        >
          {/* Left: stat + pain points */}
          <div>
            {/* Stat */}
            <div
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                borderRadius: 20,
                padding: "32px 28px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(40px, 5vw, 56px)",
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  background: "linear-gradient(135deg, #60a5fa, #93c5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {active.stat}
              </div>
              <div style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
                {active.statLabel}
              </div>
              <h3
                style={{
                  color: "#f1f5f9",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                  lineHeight: 1.35,
                  margin: 0,
                }}
              >
                {active.title}
              </h3>
            </div>

            {/* Pain points */}
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 16,
                padding: "24px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#ef4444",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <XCircle size={14} />
                Common Pain Points
              </div>
              {active.painPoints.map((p) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <X size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ color: "#7f1d1d", fontSize: 14, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: features + testimonial */}
          <div>
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 16,
                padding: "24px 24px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#059669",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <BadgeCheck size={14} />
                IQS Flow Capabilities
              </div>
              {active.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: "#059669", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ color: "#14532d", fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div
              style={{
                background: "linear-gradient(165deg, #f8fafc, #f1f5f9)",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: "24px 28px",
              }}
            >
              <span style={{ fontSize: 28, color: "#93c5fd", marginBottom: 12, display: "block", lineHeight: 1 }}>&ldquo;</span>
              <p
                style={{
                  color: "#0f172a",
                  fontSize: 15,
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  margin: "0 0 14px",
                  fontWeight: 500,
                }}
              >
                &ldquo;{active.quote}&rdquo;
              </p>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 600 }}>
                - {active.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .industry-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── 7. STATS + CTA (dark) ─── */
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
  const value = useCountUp(target, 1800, inView);

  return (
    <div
      style={{
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div
        style={{
          fontSize: "clamp(44px, 6vw, 72px)",
          fontWeight: 900,
          letterSpacing: "-3px",
          lineHeight: 1,
          background: "linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
        {suffix}
      </div>
      <div
        style={{
          color: "#94a3b8",
          fontSize: 15,
          fontWeight: 600,
          marginTop: 8,
          letterSpacing: "0.01em",
        }}
      >
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
        background: "#0f172a",
        padding: "100px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(37,99,235,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
            marginBottom: 80,
          }}
          className="stats-grid"
        >
          <AnimatedStat target={500} suffix="+" label="Facilities Managed" inView={inView} delay={0} />
          <AnimatedStat target={98} suffix="%" label="Compliance Pass Rate" inView={inView} delay={0.1} />
          <AnimatedStat target={30} suffix="%" label="Average Cost Reduction" inView={inView} delay={0.2} />
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            marginBottom: 64,
          }}
        />

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <h2
            style={{
              color: "#f8fafc",
              fontSize: "clamp(28px, 4vw, 44px)",
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
              color: "#94a3b8",
              fontSize: 17,
              maxWidth: 480,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Join operations leaders across aviation, healthcare, and corporate
            facilities who trust IQS Flow.
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
              onMouseEnter={() => setDemoHovered(true)}
              onMouseLeave={() => setDemoHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: demoHovered
                  ? "linear-gradient(135deg, #f0f7ff, #ffffff)"
                  : "#ffffff",
                color: "#1d4ed8",
                padding: "15px 30px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                boxShadow: demoHovered
                  ? "0 8px 24px rgba(0,0,0,0.25)"
                  : "0 4px 16px rgba(0,0,0,0.2)",
                transform: demoHovered ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.2s ease",
              }}
            >
              <PlayCircle size={18} />
              Request a Demo
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
                color: industryHovered ? "#93c5fd" : "#94a3b8",
                padding: "15px 30px",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: `1.5px solid ${industryHovered ? "rgba(147,197,253,0.4)" : "rgba(255,255,255,0.12)"}`,
                transform: industryHovered ? "translateY(-1px)" : "translateY(0)",
                transition: "all 0.2s ease",
              }}
            >
              <Compass size={18} />
              Browse Industries
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
