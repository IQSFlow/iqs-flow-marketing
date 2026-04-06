import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: "Case Study" | "Whitepaper" | "Blog Post";
  categoryColor: string;
  tags: string[];
  date: string;
  author: string;
  readTime: number;
  image: string;
  imageAlt: string;
  featured: boolean;
  published: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

const CATEGORY_COLORS: Record<string, string> = {
  "Case Study": "#059669",
  "Whitepaper": "#7c3aed",
  "Blog Post": "#2563eb",
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        categoryColor: CATEGORY_COLORS[data.category] ?? "#2563eb",
        ...data,
      } as BlogPost;
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): { meta: BlogPost; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      categoryColor: CATEGORY_COLORS[data.category] ?? "#2563eb",
      ...data,
    } as BlogPost,
    content,
  };
}
