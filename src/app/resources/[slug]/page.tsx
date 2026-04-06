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
    <div style={{ minHeight: "100vh", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', background: "#fff" }}>
      <MarketingNav />

      {meta.image && (
        <div style={{ width: "100%", height: 400, overflow: "hidden", position: "relative" }}>
          <img src={meta.image} alt={meta.imageAlt ?? meta.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
        </div>
      )}

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px 80px" }}>
        <Link href="/resources" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#2563eb", textDecoration: "none", marginBottom: 24 }}>
          <ArrowLeft size={14} /> Back to Resources
        </Link>
        <div style={{ marginBottom: 12 }}>
          <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, color: "#fff", background: meta.categoryColor }}>
            {meta.category}
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.15, color: "#0f172a", marginBottom: 16 }}>
          {meta.title}
        </h1>
        <div style={{ display: "flex", gap: 16, fontSize: 14, color: "#64748b", marginBottom: 40, flexWrap: "wrap" }}>
          <span>{meta.author}</span>
          <span>{new Date(meta.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span>{meta.readTime} min read</span>
        </div>
        <style>{`
          .blog-prose h2 { font-size: 24px; font-weight: 700; color: #0f172a; margin: 48px 0 16px; letter-spacing: -0.5px; line-height: 1.3; }
          .blog-prose h3 { font-size: 20px; font-weight: 600; color: #0f172a; margin: 36px 0 12px; line-height: 1.35; }
          .blog-prose h4 { font-size: 17px; font-weight: 600; color: #1e293b; margin: 28px 0 8px; }
          .blog-prose p { margin: 0 0 20px; }
          .blog-prose ul, .blog-prose ol { margin: 0 0 24px; padding-left: 24px; }
          .blog-prose li { margin-bottom: 8px; }
          .blog-prose blockquote { margin: 32px 0; padding: 20px 24px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 0 8px 8px 0; font-style: italic; color: #334155; }
          .blog-prose blockquote p { margin: 0; }
          .blog-prose strong { color: #0f172a; font-weight: 600; }
          .blog-prose a { color: #2563eb; text-decoration: none; font-weight: 500; }
          .blog-prose a:hover { text-decoration: underline; }
          .blog-prose hr { border: none; border-top: 1px solid #e2e8f0; margin: 40px 0; }
          .blog-prose table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 15px; }
          .blog-prose th { text-align: left; padding: 10px 16px; background: #f8fafc; border-bottom: 2px solid #e2e8f0; font-weight: 600; color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; }
          .blog-prose td { padding: 10px 16px; border-bottom: 1px solid #f1f5f9; }
          .blog-prose code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 15px; color: #0f172a; }
          .blog-prose pre { background: #0f172a; color: #e2e8f0; padding: 20px 24px; border-radius: 10px; overflow-x: auto; margin: 24px 0; font-size: 14px; line-height: 1.6; }
          .blog-prose pre code { background: none; padding: 0; color: inherit; font-size: inherit; }
          .blog-prose img { max-width: 100%; border-radius: 10px; margin: 24px 0; }
          .blog-prose h2:first-child { margin-top: 0; }
        `}</style>
        <div
          className="blog-prose"
          style={{ fontSize: 17, lineHeight: 1.75, color: "#1e293b" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        {meta.tags?.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 48, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
            {meta.tags.map((tag: string) => (
              <span key={tag} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, background: "#f1f5f9", color: "#475569" }}>{tag}</span>
            ))}
          </div>
        )}
        <div style={{ marginTop: 48, padding: "32px", background: "#f8fafc", borderRadius: 12, textAlign: "center" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Ready to see IQS Flow in action?</h3>
          <p style={{ fontSize: 15, color: "#475569", marginBottom: 20 }}>See how independent quality intelligence transforms vendor oversight.</p>
          <Link href="/contact" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            Request a Demo
          </Link>
        </div>
      </article>
      <MarketingFooter />
    </div>
  );
}
