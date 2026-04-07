import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { remark } from "remark";
import remarkHtml from "remark-html";
import rehypeParse from "rehype-parse";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

// ── Ink palette ─────────────────────────────────────────────────────────────
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

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | IQS Flow`,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const processedContent = await remark().use(remarkHtml).process(content);
  const sanitized = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(processedContent.toString());
  const htmlContent = sanitized.toString();

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
      background: "#f8fafc",
    }}>
      <MarketingNav />

      {/* ── Hero image ─────────────────────────────────────────────────── */}
      {meta.image && (
        <div style={{ width: "100%", height: 380, overflow: "hidden", position: "relative" }}>
          <img
            src={meta.image}
            alt={meta.imageAlt ?? meta.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }} />
        </div>
      )}

      <article style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "48px 32px 88px",
        background: "#ffffff",
        borderLeft: `1px solid ${ink[100]}`,
        borderRight: `1px solid ${ink[100]}`,
        boxShadow: "0 0 40px rgba(0,0,0,0.03)",
      }}>

        {/* ── Back link ──────────────────────────────────────────────── */}
        <Link
          href="/resources"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: ink[400],
            textDecoration: "none",
            marginBottom: 28,
            letterSpacing: "0.01em",
          }}
        >
          <ArrowLeft size={13} />
          Back to Resources
        </Link>

        {/* ── Category badge ─────────────────────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <span style={{
            display: "inline-block",
            padding: "4px 11px",
            borderRadius: 5,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#fff",
            background: meta.categoryColor,
          }}>
            {meta.category}
          </span>
        </div>

        {/* ── Title ──────────────────────────────────────────────────── */}
        <h1 style={{
          fontSize: "clamp(26px, 4vw, 38px)",
          fontWeight: 700,
          letterSpacing: "-1px",
          lineHeight: 1.15,
          color: ink[900],
          marginBottom: 16,
        }}>
          {meta.title}
        </h1>

        {/* ── Meta row ───────────────────────────────────────────────── */}
        <div style={{
          display: "flex",
          gap: 20,
          fontSize: 13,
          color: ink[400],
          marginBottom: 44,
          flexWrap: "wrap",
          paddingBottom: 24,
          borderBottom: `1px solid ${ink[100]}`,
        }}>
          <span>{meta.author}</span>
          <span>{new Date(meta.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span>{meta.readTime} min read</span>
        </div>

        {/* ── Prose ──────────────────────────────────────────────────── */}
        <style>{`
          .blog-prose h2 { font-size: 22px; font-weight: 700; color: ${ink[900]}; margin: 48px 0 14px; letter-spacing: -0.5px; line-height: 1.3; }
          .blog-prose h3 { font-size: 18px; font-weight: 700; color: ${ink[800]}; margin: 36px 0 10px; line-height: 1.35; }
          .blog-prose h4 { font-size: 16px; font-weight: 600; color: ${ink[800]}; margin: 28px 0 8px; }
          .blog-prose p { margin: 0 0 20px; }
          .blog-prose ul, .blog-prose ol { margin: 0 0 24px; padding-left: 24px; }
          .blog-prose li { margin-bottom: 8px; }
          .blog-prose blockquote { margin: 32px 0; padding: 18px 22px; background: ${ink[25]}; border-left: 3px solid ${accent}; font-style: italic; color: ${ink[500]}; }
          .blog-prose blockquote p { margin: 0; }
          .blog-prose strong { color: ${ink[900]}; font-weight: 600; }
          .blog-prose a { color: ${accent}; text-decoration: none; font-weight: 500; }
          .blog-prose a:hover { text-decoration: underline; }
          .blog-prose hr { border: none; border-top: 1px solid ${ink[100]}; margin: 40px 0; }
          .blog-prose table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px; }
          .blog-prose th { text-align: left; padding: 10px 14px; background: ${ink[25]}; border-bottom: 2px solid ${ink[100]}; font-weight: 700; color: ${ink[800]}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
          .blog-prose td { padding: 10px 14px; border-bottom: 1px solid ${ink[50]}; color: ${ink[500]}; }
          .blog-prose code { background: ${ink[50]}; padding: 2px 6px; border-radius: 4px; font-size: 14px; color: ${ink[800]}; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; }
          .blog-prose pre { background: ${ink[900]}; color: ${ink[200]}; padding: 20px 24px; border-radius: 10px; overflow-x: auto; margin: 24px 0; font-size: 13px; line-height: 1.7; }
          .blog-prose pre code { background: none; padding: 0; color: inherit; font-size: inherit; }
          .blog-prose img { max-width: 100%; border-radius: 8px; margin: 24px 0; }
          .blog-prose h2:first-child { margin-top: 0; }
        `}</style>
        <div
          className="blog-prose"
          style={{ fontSize: 17, lineHeight: 1.8, color: ink[500] }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* ── Tags ───────────────────────────────────────────────────── */}
        {meta.tags?.length > 0 && (
          <div style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 48,
            paddingTop: 24,
            borderTop: `1px solid ${ink[100]}`,
          }}>
            {meta.tags.map((tag: string) => (
              <span key={tag} style={{
                padding: "4px 11px",
                borderRadius: 5,
                fontSize: 12,
                background: ink[50],
                color: ink[500],
                border: `1px solid ${ink[100]}`,
              }}>{tag}</span>
            ))}
          </div>
        )}

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <div style={{
          marginTop: 52,
          padding: "36px 32px",
          background: ink[900],
          borderRadius: 10,
          color: "#fff",
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.4px" }}>
            Ready to see IQS Flow in action?
          </h3>
          <p style={{ fontSize: 15, color: ink[400], marginBottom: 22 }}>
            See how independent quality intelligence transforms vendor oversight.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: accent,
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Request a Demo
          </Link>
        </div>
      </article>

      <MarketingFooter />
    </div>
  );
}
