import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, formatPostDate } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://tempmaill.tech/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://tempmaill.tech/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <div className="bg-white">
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M19 12H5m6 6-6-6 6-6" />
          </svg>
          All articles
        </Link>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readMinutes} min read</span>
        </div>

        <div className="mt-8 space-y-8">
          {post.content.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-xl font-bold text-slate-900">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="mt-4 text-sm leading-7 text-slate-600 sm:text-base"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-blue-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">
            Try a temporary address right now
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            No signup needed — your disposable inbox is one click away.
          </p>
          <Link
            href="/#generator"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get a free temp email
          </Link>
        </div>

        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-slate-900">Keep reading</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/blog/${o.slug}`}
                  className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <h3 className="text-sm font-bold text-slate-900">{o.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {o.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
