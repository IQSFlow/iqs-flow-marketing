"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import {
  ArrowRight,
  Camera,
  Languages,
  Brain,
  TrendingUp,
  Sparkles,
  Check,
} from "lucide-react";
import { marketing } from "@/lib/design-tokens";

const ink = marketing.ink;

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function revealStyle(inView: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  };
}

const CONTENT_MAX = 1120;

const aiFeatures = [
  {
    icon: Camera,
    title: "Photo Verification",
    subtitle: "Vision AI",
    tagline: "Every photo is analyzed automatically",
    description:
      "Workers submit cleaning photos and AI scores cleanliness in seconds. The system detects debris, stains, and disorganization, flagging issues before managers see them.",
    bullets: [
      "Automatic cleanliness scoring on every submitted photo",
      "Detects debris, stains, and disorganization",
      "Flags issues before they reach management review",
      "No more staged photos or cherry-picked evidence",
    ],
    color: "#7c3aed",
  },
  {
    icon: Languages,
    title: "Smart Translation",
    subtitle: "Cloud Translation",
    tagline: "One form, every language",
    description:
      "Inspection forms auto-translate to Spanish and French so workers see forms in their language, while managers see results in theirs. No manual translation maintenance required.",
    bullets: [
      "Inspection forms auto-translate to Spanish and French",
      "Workers see forms in their preferred language",
      "Managers see results in their language",
      "No manual translation files to maintain",
    ],
    color: "#3b82f6",
  },
  {
    icon: Brain,
    title: "Ticket Intelligence",
    subtitle: "NLP Analysis",
    tagline: "Priority before you read it",
    description:
      "Incoming tickets are analyzed for urgency and sentiment. Negative sentiment auto-escalates priority so trends surface before they become incidents.",
    bullets: [
      "Automatic urgency and sentiment analysis on every ticket",
      "Negative sentiment triggers priority escalation",
      "Trend detection across sites and time periods",
      "Faster response to critical issues",
    ],
    color: "#059669",
  },
  {
    icon: TrendingUp,
    title: "Predictive Quality",
    subtitle: "Coming Soon",
    tagline: "Know before it happens",
    description:
      "Historical inspection data will predict which sites are likely to fail next. Anomaly detection flags unusual patterns and trend comparison surfaces insights across sites, vendors, and time periods.",
    bullets: [
      "Predict which sites will need attention next",
      "Anomaly detection flags unusual inspection patterns",
      "Trend comparison across sites and vendors",
      "Data-driven preventive quality management",
    ],
    color: "#b45309",
    comingSoon: true,
  },
];

export default function AIFeaturesPage() {
  const heroObs = useInView(0.1);
  const cardsObs = useInView(0.1);
  const ctaObs = useInView(0.15);

  return (
    <div style={{ minHeight: "100vh", color: ink[900], background: "#ffffff" }}>
      <MarketingNav />

      {/* ── Hero ── */}
      <section
        ref={heroObs.ref}
        style={{
          background: ink[900],
          padding: "120px 32px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow effect */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: "100%",
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.06) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: CONTENT_MAX,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
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
              color: "#7c3aed",
              marginBottom: 24,
              ...revealStyle(heroObs.inView, 0),
            }}
          >
            <Sparkles size={14} />
            AI-Powered Intelligence
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 4.5vw, 60px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              color: "#f8fafc",
              marginBottom: 24,
              maxWidth: 700,
              ...revealStyle(heroObs.inView, 0.05),
            }}
          >
            AI that sees what
            <br />
            inspectors miss.
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: ink[300],
              maxWidth: 560,
              marginBottom: 40,
              ...revealStyle(heroObs.inView, 0.1),
            }}
          >
            IQS Flow is the only quality intelligence platform with built-in
            Vision AI, automatic translation, and NLP sentiment analysis.
            Every photo scored. Every ticket prioritized. Every language
            supported.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              ...revealStyle(heroObs.inView, 0.15),
            }}
          >
            <Link
              href="/contact"
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
              }}
            >
              See AI in Action
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/features"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: ink[300],
                padding: "16px 32px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.1)",
              }}
            >
              All Features
            </Link>
          </div>
        </div>
      </section>

      {/* ── AI Feature Cards ── */}
      <section
        ref={cardsObs.ref}
        style={{
          background: ink[800],
          padding: "100px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle particle/grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(124,58,237,0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(37,99,235,0.06) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: CONTENT_MAX,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 64,
              ...revealStyle(cardsObs.inView),
            }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                color: "#f8fafc",
                marginBottom: 16,
              }}
            >
              Four AI capabilities. Zero manual effort.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: ink[400],
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              Each capability runs automatically in the background, turning raw
              data into actionable intelligence.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
            className="ai-cards-grid"
          >
            {aiFeatures.map(
              (
                {
                  icon: Icon,
                  title,
                  subtitle,
                  tagline,
                  description,
                  bullets,
                  color,
                  comingSoon,
                },
                i
              ) => (
                <div
                  key={title}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: "36px 32px",
                    position: "relative",
                    overflow: "hidden",
                    ...revealStyle(cardsObs.inView, 0.1 + i * 0.08),
                  }}
                >
                  {/* Top glow accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    }}
                  />

                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#f1f5f9",
                            margin: 0,
                            letterSpacing: "-0.3px",
                          }}
                        >
                          {title}
                        </h3>
                        {comingSoon && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              color,
                              background: `${color}15`,
                              border: `1px solid ${color}30`,
                              padding: "2px 8px",
                              borderRadius: 4,
                            }}
                          >
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: ink[400],
                          marginTop: 2,
                        }}
                      >
                        {subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color,
                      marginBottom: 12,
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{tagline}&rdquo;
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 14,
                      color: ink[300],
                      lineHeight: 1.7,
                      marginBottom: 20,
                    }}
                  >
                    {description}
                  </p>

                  {/* Bullets */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {bullets.map((b) => (
                      <div
                        key={b}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <Check
                          size={13}
                          style={{
                            color,
                            flexShrink: 0,
                            marginTop: 3,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            color: ink[300],
                            lineHeight: 1.55,
                          }}
                        >
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .ai-cards-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaObs.ref}
        style={{ padding: "96px 32px", background: ink[900] }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            textAlign: "center",
            ...revealStyle(ctaObs.inView),
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              lineHeight: 1.12,
              marginBottom: 18,
              color: "#f8fafc",
            }}
          >
            See AI-powered quality intelligence in action
          </h2>
          <p
            style={{
              fontSize: 17,
              color: ink[400],
              lineHeight: 1.65,
              marginBottom: 40,
            }}
          >
            Book a demo and we will show you how Vision AI, smart translation,
            and ticket intelligence work with your real data.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 32px",
                background: "#ffffff",
                color: ink[900],
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Book a Demo <ArrowRight size={16} />
            </Link>
            <Link
              href="/features"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 32px",
                background: "transparent",
                color: ink[300],
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.1)",
              }}
            >
              All Features
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
