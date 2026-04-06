"use client";

import { useState } from "react";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import type { BlogPost } from "@/lib/blog";

// ── Types ──────────────────────────────────────────────────────────────────
type FilterTab =
  | "All"
  | "Case Studies"
  | "Whitepapers"
  | "Blog Posts"
  | "Aviation"
  | "Corporate";

// ── Badge colors ───────────────────────────────────────────────────────────
function typeBadgeStyle(category: string): React.CSSProperties {
  if (category === "Case Study")
    return {
      background: "#dcfce7",
      color: "#166534",
      border: "1px solid #bbf7d0",
    };
  if (category === "Whitepaper")
    return {
      background: "#dbeafe",
      color: "#1e40af",
      border: "1px solid #bfdbfe",
    };
  return {
    background: "#f3e8ff",
    color: "#6b21a8",
    border: "1px solid #e9d5ff",
  };
}

// ── Filter logic ───────────────────────────────────────────────────────────
function filterPosts(posts: BlogPost[], tab: FilterTab): BlogPost[] {
  if (tab === "All") return posts;
  if (tab === "Case Studies") return posts.filter((p) => p.category === "Case Study");
  if (tab === "Whitepapers") return posts.filter((p) => p.category === "Whitepaper");
  if (tab === "Blog Posts") return posts.filter((p) => p.category === "Blog Post");
  if (tab === "Aviation") return posts.filter((p) => p.tags.includes("aviation"));
  if (tab === "Corporate") return posts.filter((p) => p.tags.includes("multi-site") || p.tags.includes("global operations"));
  return posts;
}

// ── Sub-components ─────────────────────────────────────────────────────────
function FilterPill({
  label,
  selected,
  onClick,
}: {
  label: FilterTab;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "8px 18px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.18s",
        border: selected ? "none" : "1.5px solid #cbd5e1",
        background: selected
          ? "#0f172a"
          : hovered
          ? "#f8fafc"
          : "#ffffff",
        color: selected ? "#ffffff" : hovered ? "#0f172a" : "#475569",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 20px 48px rgba(0,0,0,0.12)"
          : "0 2px 16px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.22s, transform 0.22s",
        border: "1px solid #f1f5f9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Photo thumbnail */}
      <div
        style={{
          height: 148,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <img
          src={post.image}
          alt={post.imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 999,
            alignSelf: "flex-start",
            ...typeBadgeStyle(post.category),
          }}
        >
          {post.category}
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1.4,
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 13.5,
            color: "#64748b",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.description}
        </p>
        <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>{post.readTime} min read</span>
          <ReadLink slug={post.slug} />
        </div>
      </div>
    </div>
  );
}

function ReadLink({ slug }: { slug: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/resources/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: hovered ? "#1d4ed8" : "#2563eb",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: 4,
        transition: "color 0.15s",
      }}
    >
      Read Article
    </Link>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
const FILTER_TABS: FilterTab[] = [
  "All",
  "Case Studies",
  "Whitepapers",
  "Blog Posts",
  "Aviation",
  "Corporate",
];

export default function ResourcesClient({ posts }: { posts: BlogPost[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const featuredPost = posts.find((p) => p.featured);
  const nonFeaturedPosts = posts.filter((p) => !p.featured);
  const filtered = filterPosts(nonFeaturedPosts, activeFilter);
  const showFeatured =
    activeFilter === "All" || activeFilter === "Case Studies" || activeFilter === "Aviation";

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          '"DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
        color: "#0f172a",
        background: "#f8fafc",
      }}
    >
      <MarketingNav />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 32px 72px",
          position: "relative",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(10,15,30,0.88), rgba(15,23,42,0.92)), url('/safwan-mahmud-6xQFm9TFwmk-unsplash.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#60a5fa",
              background: "rgba(37,99,235,0.12)",
              border: "1px solid rgba(96,165,250,0.25)",
              padding: "6px 16px",
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            Knowledge Hub
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 20px",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            Resources and{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Case Studies
            </span>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#94a3b8",
              margin: "0 0 40px",
              lineHeight: 1.7,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Practical insights, research, and real-world results for operations
            leaders navigating quality oversight.
          </p>
        </div>
      </section>

      {/* ── Filter tabs ────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "0 32px",
          position: "sticky",
          top: 57,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            overflowX: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "16px 0",
            scrollbarWidth: "none",
          }}
        >
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

      {/* ── Main content ──────────────────────────────────────────────── */}
      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "48px 32px 64px",
        }}
      >
        {/* ── Assessment Banner ───────────────────────────────────────── */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            borderRadius: 16,
            padding: "40px 32px",
            marginBottom: 48,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#60a5fa",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Free Assessment
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            Vendor Accountability Score
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#94a3b8",
              maxWidth: 500,
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            Take the 2-minute assessment to benchmark your vendor oversight
            maturity. Get personalized recommendations.
          </p>
          <Link
            href="/resources/vendor-accountability-assessment"
            style={{
              display: "inline-block",
              background: "#2563eb",
              color: "#fff",
              padding: "12px 28px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Take the Assessment
          </Link>
        </div>

        {/* ── Featured article ──────────────────────────────────────── */}
        {showFeatured && featuredPost && (
          <FeaturedCard post={featuredPost} />
        )}

        {/* ── Grid ─────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 32px",
              color: "#94a3b8",
            }}
          >
            <p style={{ margin: 0, fontSize: 16 }}>
              No resources match this filter yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {filtered.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          padding: "64px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            Want a personalized deep-dive?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#94a3b8",
              margin: "0 0 32px",
              lineHeight: 1.7,
            }}
          >
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

function FeaturedCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.13)"
          : "0 4px 24px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.25s, transform 0.25s",
        border: "1px solid #f1f5f9",
        display: "flex",
        flexDirection: "row" as const,
        marginBottom: 48,
        minHeight: 280,
      }}
    >
      <div
        style={{
          width: "38%",
          minWidth: 240,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Featured
          </span>
        </div>
      </div>

      <div
        style={{
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 999,
              ...typeBadgeStyle(post.category),
            }}
          >
            {post.category}
          </span>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: 15,
            color: "#64748b",
            lineHeight: 1.7,
            maxWidth: 560,
          }}
        >
          {post.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap" as const,
            marginTop: 4,
          }}
        >
          <FeaturedReadButton slug={post.slug} />
          <span style={{ fontSize: 13, color: "#94a3b8" }}>
            {post.readTime} min read
          </span>
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
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 24px",
        background: hovered ? "#1d4ed8" : "#2563eb",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        transition: "background 0.18s",
        letterSpacing: "0.01em",
      }}
    >
      Read Case Study
    </Link>
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
        padding: "14px 32px",
        background: hovered ? "#1d4ed8" : "#2563eb",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: 12,
        fontSize: 15,
        fontWeight: 700,
        transition: "background 0.18s",
        letterSpacing: "0.01em",
      }}
    >
      Talk to an expert
    </a>
  );
}
