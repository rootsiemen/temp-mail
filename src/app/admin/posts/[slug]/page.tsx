export const instant = false;
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getPostBySlug, serializeContent } from "@/lib/blog-store";
import { PostForm } from "../_form";


export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href="/admin"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Wapas
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
          Edit Article
        </h1>
        <p className="mt-1 text-sm text-slate-500">/{post.slug}</p>
        <PostForm
          mode="edit"
          slug={post.slug}
          initial={{
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            readMinutes: post.readMinutes,
            content: serializeContent(post.content),
          }}
        />
      </div>
    </div>
  );
}
