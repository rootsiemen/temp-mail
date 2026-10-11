import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abahi.tech";
  const now = new Date();

  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${base}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...POSTS.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date + "T00:00:00"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
