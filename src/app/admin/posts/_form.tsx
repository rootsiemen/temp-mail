"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface PostFormData {
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  content: string;
}

export function PostForm({
  initial,
  slug,
  mode,
}: {
  initial: PostFormData;
  slug?: string;
  mode: "new" | "edit";
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function set<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/posts", {
      method: mode === "new" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slug }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(data.error || "Save nahi ho saka.");
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
          Title
        </label>
        <input
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Article ka title"
          className={inputCls}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
          Excerpt <span className="font-normal text-slate-400">(chhota sa intro, 1-2 lines)</span>
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          rows={2}
          placeholder="Search aur blog list mein nazar aayega"
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Read minutes
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={form.readMinutes}
            onChange={(e) => set("readMinutes", parseInt(e.target.value, 10) || 5)}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
          Content{" "}
          <span className="font-normal text-slate-400">
            (## se heading, khaali line se naya paragraph)
          </span>
        </label>
        <textarea
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          rows={18}
          placeholder={"Pehla paragraph yahan...\n\n## Heading\n\nAgla paragraph yahan..."}
          className={`${inputCls} font-mono leading-6`}
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? "Save ho raha hai..." : mode === "new" ? "Publish karo" : "Update karo"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
