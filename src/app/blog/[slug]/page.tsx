import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog-store";
import { formatPostDate } from "@/lib/posts";

/** Render [label](/path) inline links inside paragraph text. */
function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    const [, label, href] = m;
    const cls = "font-semibold text-blue-600 hover:underline";
    return href.startsWith("/") ? (
      <Link key={i} href={href} className={cls}>
        {label}
      </Link>
    ) : (
      <a key={i} href={href} className={cls}>
        {label}
      </a>
    );
  });
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  // Template appends " | Temp Mail" (12 chars), so keep base title ≤ 48 chars
  const title = post.title.length > 48 ? post.title.slice(0, 45).trimEnd() + "..." : post.title;
  let description = (post.excerpt || "").replace(/\s+/g, " ").trim();
  if (description.length > 160) description = description.slice(0, 157).trimEnd() + "...";
  const url = `https://tempmaill.tech/blog/${post.slug}`;
  const ogImage = "https://tempmaill.tech/og-image.png";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const others = (await getAllPosts()).filter((p) => p.slug !== post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Temp Mail",
      url: "https://tempmaill.tech",
    },
    publisher: {
      "@type": "Organization",
      name: "Temp Mail",
      url: "https://tempmaill.tech",
      logo: {
        "@type": "ImageObject",
        url: "https://tempmaill.tech/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tempmaill.tech/blog/${post.slug}`,
    },
    image: "https://tempmaill.tech/og-image.png",
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
              {section.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  loading="lazy"
                  className="mt-4 w-full rounded-xl"
                />
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="mt-4 text-sm leading-7 text-slate-600 sm:text-base"
                >
                  {renderInline(p)}
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
