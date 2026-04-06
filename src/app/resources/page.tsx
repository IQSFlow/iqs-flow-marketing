import { getAllPosts } from "@/lib/blog";
import ResourcesClient from "./ResourcesClient";

export default function ResourcesPage() {
  const posts = getAllPosts();
  return <ResourcesClient posts={posts} />;
}
