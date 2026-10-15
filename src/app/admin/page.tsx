export const instant = false;
import Link from "next/link";
import { getAllPosts, kvConfigured } from "@/lib/blog-store";
import { formatPostDate } from "@/lib/posts";
import { DeleteButton, LogoutButton, NewPostLink } from "./_components";
import { connection } from "next/server";


export default async function AdminDashboard() {
  await connection();
  const posts = await getAllPosts();
  const kv = kvConfigured();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Temp Mail — Blog Admin
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {posts.length} articles
              {!kv && (
                <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                  KV not configured — sirf file wale posts nazar aayenge
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <NewPostLink />
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {post.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {formatPostDate(post.date)} · {post.readMinutes} min ·{" "}
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    /blog/{post.slug}
                  </Link>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Edit
                </Link>
                <DeleteButton slug={post.slug} title={post.title} />
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              Abhi koi article nahi. "+ Naya Article" se pehla likho.
            </p>
          )}
        </div>

        <p className="mt-8 text-xs leading-6 text-slate-400">
          Naya article likhne ke baad wo foran site pe live ho jayega. Content{" "}
          <span className="font-mono">## Heading</span> aur khaali line se alag
          paragraphs mein likho.
        </p>
      </div>
    </div>
  );
}
