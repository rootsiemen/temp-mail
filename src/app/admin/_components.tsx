"use client";

import { useState } from "react";
import Link from "next/link";

export function DeleteButton({ slug, title }: { slug: string; title: string }) {
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm(`"${title}" delete karna hai? Ye wapas nahi aayega.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      window.location.reload();
    } else {
      alert("Delete nahi ho saka. Dobara koshish karo.");
      setBusy(false);
    }
  }

  return (
    <button
      onClick={onDelete}
      disabled={busy}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {busy ? "..." : "Delete"}
    </button>
  );
}

export function LogoutButton() {
  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <button
      onClick={onLogout}
      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
    >
      Logout
    </button>
  );
}

export function NewPostLink() {
  return (
    <Link
      href="/admin/posts/new"
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      + Naya Article
    </Link>
  );
}
