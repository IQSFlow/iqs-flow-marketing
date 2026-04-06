"use client";

import { useState } from "react";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import type { BlogPost } from "@/lib/blog";

// ── Ink palette ───────────────────────────────────────────────────────────
const ink = {
  900: "#0a0f1a",
  800: "#0f172a",
  500: "#475569",
  400: "#64748b",
  300: "#94a3b8",
  200: "#cbd5e1",
  100: "#e2e8f0",
  50:  "#f1f5f9",
  25:  "#f8fafc",
};
const accent = "#2563eb";

// ── Types ─────────────────────────────────────────────────────────────────
type FilterTab =
  | "All"
  | "Case Studies"
  | "Whitepapers"
  | "Blog Posts"
  | "Aviation"
  | "Corporate";

// ── Badge styles ──────────────────────────────────────────────────────────
function categoryBadge(category: string): React.CSSProperties {
  if (category === "Case Study")
    return { background: "rgba(5,150,105,0.1)", color: "#059669", border: "1px solid rgba(5,150,105,0.2)" };
  if (category === "Whitepaper")
    return { background: "rgba(37,99,235,0.1)", color: accent, border: "1px solid rgba(37,99,235,0.2)" };
  return { background: "rgba(71,85,105,0.1)", color: ink[400], border: `1px solid ${ink[200]}` };
}

// ── Filter logic ──────────────────────────────────────────────────────────
function filterPosts(posts: BlogPost[], tab: FilterTab): BlogPost[] {
  if (tab === "All") return posts;
  if (tab === "Case Studies") return posts.filter((p) => p.category === "Case Study");
  if (tab === "Whitepapers") return posts.filter((p) => p.category === "Whitepaper");
  if (tab === "Blog Posts") return posts.filter((p) => p.category === "Blog Post");
  if (tab === "Aviation") return posts.filter((p) => p.tags.includes("aviation"));
  if (tab === "Corporate") return posts.filter((p) => p.tags.includes("multi-site") || p.tags.includes("global operations"));
  return posts;
}

// ── Filter pill ───────────────────────────────────────────────────────────
function FilterPill({ label, selected, onClick }: { label: FilterTab; selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "7px 16px",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.15s",
        border: selected ? "none" : `1.5px solid ${ink[200]}`,
        background: selected ? ink[900] : hovered ? ink[50] : "#fff",
        color: selected ? "#fff" : hovered ? ink[800] : ink[500],
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// ── Article card ──────────────────────────────────────────────────────────
function ArticleCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: hovered ? "0 12px 36px rgba(0,0,0,0.10)" : "0 1px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.2s, transform 0.2s",
        border: `1px solid ${ink[100]}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 148, overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <img
          src={post.image}
          alt={post.imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.35s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
        <span style={{
          display: "inline-block",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "3px 9px",
          borderRadius: 5,
          alignSelf: "flex-start",
          ...categoryBadge(post.category),
        }}>
          {post.category}
        </span>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: ink[800], lineHeight: 1.4 }}>
          {post.title}
        </h3>
        <p style={{
          margin: 0,
          fontSize: 13,
          color: ink[400],
          lineHeight: 1.65,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {post.description}
        </p>
        <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: ink[300] }}>{post.readTime} min read</span>
          <ReadLink slug={post.slug} label={post.category === "Case Study" ? "Read Case Study" : "Read Article"} />
        </div>
      </div>
    </div>
  );
}

function ReadLink({ slug, label }: { slug: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/resources/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: hovered ? "#1d4ed8" : accent,
        textDecoration: "none",
        transition: "color 0.14s",
      }}
    >
      {label}
    </Link>
  );
}

// ── Featured card ─────────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.10)" : "0 2px 16px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "box-shadow 0.22s, transform 0.22s",
        border: `1px solid ${ink[100]}`,
        display: "flex",
        flexDirection: "row" as const,
        marginBottom: 40,
        minHeight: 260,
      }}
    >
      <div style={{ width: "36%", minWidth: 220, position: "relative", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={post.image}
          alt={post.imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s",
          }}
        />
        <div style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.8)",
        }}>
          Featured
        </div>
      </div>
      <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, flex: 1 }}>
        <span style={{
          display: "inline-block",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "3px 9px",
          borderRadius: 5,
          alignSelf: "flex-start",
          ...categoryBadge(post.category),
        }}>
          {post.category}
        </span>
        <h2 style={{
          margin: 0,
          fontSize: "clamp(18px, 2.5vw, 26px)",
          fontWeight: 700,
          color: ink[800],
          lineHeight: 1.3,
          letterSpacing: "-0.5px",
        }}>
          {post.title}
        </h2>
        <p style={{ margin: 0, fontSize: 15, color: ink[400], lineHeight: 1.7, maxWidth: 520 }}>
          {post.description}
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" as const, marginTop: 4 }}>
          <FeaturedReadButton slug={post.slug} />
          <span style={{ fontSize: 13, color: ink[300] }}>{post.readTime} min read</span>
        </div>
      </div>
    </div>
  );
}

function FeaturedReadButton({ slug }: { slug: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/resources/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 22px",
        background: hovered ? "#1d4ed8" : accent,
        color: "#fff",
        textDecoration: "none",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 700,
        transition: "background 0.15s",
      }}
    >
      Read Case Study
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
const FILTER_TABS: FilterTab[] = ["All", "Case Studies", "Whitepapers", "Blog Posts", "Aviation", "Corporate"];

export default function ResourcesClient({ posts }: { posts: BlogPost[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const featuredPost = posts.find((p) => p.featured);
  const nonFeaturedPosts = posts.filter((p) => !p.featured);
  const filtered = filterPosts(nonFeaturedPosts, activeFilter);
  const showFeatured = activeFilter === "All" || activeFilter === "Case Studies" || activeFilter === "Aviation";

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
      color: ink[800],
      background: ink[25],
    }}>
      <MarketingNav />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 40px 72px",
        background: ink[900],
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: ink[300],
            marginBottom: 20,
          }}>
            Knowledge Hub
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 50px)",
            fontWeight: 700,
            color: ink[25],
            margin: "0 0 18px",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            maxWidth: 620,
          }}>
            Resources and Case Studies
          </h1>
          <p style={{
            fontSize: 18,
            color: ink[400],
            margin: 0,
            lineHeight: 1.7,
            maxWidth: 500,
          }}>
            Practical insights, research, and real-world results for operations
            leaders navigating quality oversight.
          </p>
        </div>
      </section>

      {/* ── Filter bar ──────────────────────────────────────────────── */}
      <section style={{
        background: "#fff",
        borderBottom: `1px solid ${ink[100]}`,
        padding: "0 40px",
        position: "sticky",
        top: 57,
        zIndex: 40,
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          overflowX: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 0",
          scrollbarWidth: "none",
        }}>
          {FILTER_TABS.map((tab) => (
            <FilterPill
              key={tab}
              label={tab}
              selected={activeFilter === tab}
              onClick={() => setActiveFilter(tab)}
            />
          ))}
        </div>
      </section>

      {/* ── Main content ────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 40px 64px" }}>

        {/* ── Assessment Banner ──────────────────────────────────── */}
        <div style={{
          background: ink[900],
          borderRadius: 10,
          padding: "36px 32px",
          marginBottom: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ink[300], marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Free Assessment
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>
              Vendor Accountability Score
            </h2>
            <p style={{ fontSize: 15, color: ink[400], maxWidth: 420, lineHeight: 1.6, margin: 0 }}>
              Take the 2-minute assessment to benchmark your vendor oversight
              maturity. Get personalized recommendations.
            </p>
          </div>
          <Link
            href="/resources/vendor-accountability-assessment"
            style={{
              display: "inline-block",
              background: accent,
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            Take the Assessment
          </Link>
        </div>

        {/* ── Featured article ───────────────────────────────────── */}
        {showFeatured && featuredPost && <FeaturedCard post={featuredPost} />}

        {/* ── Grid ──────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 32px", color: ink[300] }}>
            <p style={{ margin: 0, fontSize: 16 }}>No resources match this filter yet.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 22,
          }}>
            {filtered.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: ink[900], padding: "72px 40px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 14px",
            letterSpacing: "-0.5px",
          }}>
            Want a personalized deep-dive?
          </h2>
          <p style={{ fontSize: 16, color: ink[400], margin: "0 0 28px", lineHeight: 1.7, maxWidth: 480 }}>
            Our team can walk you through case studies relevant to your industry
            and build a custom ROI model for your portfolio.
          </p>
          <CtaButton />
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function CtaButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "13px 28px",
        background: hovered ? "#1d4ed8" : accent,
        color: "#fff",
        textDecoration: "none",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 700,
        transition: "background 0.15s",
      }}
    >
      Talk to an expert
    </a>
  );
}
