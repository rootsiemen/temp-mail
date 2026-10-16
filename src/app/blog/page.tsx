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
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          The Temp Mail Blog
        </h1>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
          <p>
            Disposable email is a small tool with an outsized impact on your
            privacy — but only if you use it well. The Temp Mail Blog is where
            we explain how it all works: what temporary email is and how the
            technology behind it functions, the smartest everyday situations
            for a throwaway address, and the honest limits you need to know
            about (OTP codes, account recovery, and platform blocklists).
          </p>
          <p>
            You will find practical privacy strategy here, not just product
            tips. Our guides cover building a tiered inbox system so one-off
            signups never pollute your real address, how Gmail aliases compare
            against true disposable inboxes, where the legal lines sit, and
            side-by-side comparisons of the best temporary email services in
            2026. Every article is written to answer one question completely —
            whether that is how to sign up for Facebook with a disposable
            address, or whether a temp inbox is safe for verification codes.
          </p>
          <p>
            New to the topic? Start with{" "}
            <Link
              href="/blog/what-is-temporary-email"
              className="font-semibold text-blue-600 hover:underline"
            >
              what a temporary email is
            </Link>
            , then pick up{" "}
            <Link
              href="/blog/smart-ways-to-use-disposable-email"
              className="font-semibold text-blue-600 hover:underline"
            >
              seven practical ways to use one
            </Link>
            . If privacy is the goal, the{" "}
            <Link
              href="/blog/temporary-email-vs-real-inbox-privacy"
              className="font-semibold text-blue-600 hover:underline"
            >
              privacy guide
            </Link>{" "}
            shows how disposable addresses fit into a realistic setup. Browse
            all articles below.
          </p>
        </div>

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
