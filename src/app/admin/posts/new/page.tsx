export const instant = false;
import Link from "next/link";
import { connection } from "next/server";
import { PostForm } from "../_form";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default async function NewPostPage() {
  await connection();
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
          Naya Article
        </h1>
        <PostForm
          mode="new"
          initial={{
            title: "",
            excerpt: "",
            date: todayISO(),
            readMinutes: 5,
            content: "",
          }}
        />
      </div>
    </div>
  );
}
