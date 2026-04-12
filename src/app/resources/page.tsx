import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, assessments, and tools to improve your operations quality and vendor management.",
};

export default function ResourcesPage() {
  const posts = getAllPosts();
  return <ResourcesClient posts={posts} />;
}
