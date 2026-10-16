import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-store";
import { formatPostDate } from "@/lib/posts";


export const metadata: Metadata = {
  title: "Blog — Email Privacy Guides",
  description:
    "Practical guides on temporary email, disposable addresses, online privacy, and keeping your real inbox completely spam-free.",
  alternates: { canonical: "https://tempmaill.tech/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Temp Mail Blog — Email Privacy Guides",
    url: "https://tempmaill.tech/blog",
    description:
      "Practical guides on temporary email, disposable addresses, and everyday online privacy.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `https://tempmaill.tech/blog/${p.slug}`,
      datePublished: p.date,
      author: {
        "@type": "Organization",
        name: "Temp Mail",
        url: "https://tempmaill.tech",
      },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tempmaill.tech" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://tempmaill.tech/blog" },
    ],
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-slate-600">
          Practical guides on temporary email, disposable addresses, and
          everyday online privacy.
        </p>

        <div className="mt-10 grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:shadow-md sm:p-8"
            >
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readMinutes} min read</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-blue-700 sm:text-2xl">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                Read article
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
