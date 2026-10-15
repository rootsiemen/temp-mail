import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import {
  getAllPosts,
  getPostBySlug,
  kvConfigured,
  parseContent,
  savePost,
  slugify,
} from "@/lib/blog-store";
import type { BlogPost } from "@/lib/posts";

async function requireAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!token && (await verifySessionToken(token));
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

async function buildPost(body: Record<string, unknown>, existingSlug?: string) {
  const title = String(body.title || "").trim();
  const excerpt = String(body.excerpt || "").trim();
  const contentMd = String(body.content || "").trim();
  if (!title || !excerpt || !contentMd) {
    return { error: "Title, excerpt aur content teeno zaroori hain." };
  }
  let slug = existingSlug || slugify(title);
  if (!SLUG_RE.test(slug)) slug = slugify(title);
  if (!slug) return { error: "Slug ban nahi saka — title check karo." };

  const dateRaw = String(body.date || "").trim();
  const date = /^\d{4}-\d{2}-\d{2}$/.test(dateRaw) ? dateRaw : todayISO();
  const readMinutes = Math.max(
    1,
    Math.min(30, parseInt(String(body.readMinutes || "5"), 10) || 5)
  );
  const content = parseContent(contentMd);
  if (content.length === 0) return { error: "Content khaali hai." };

  const post: BlogPost = { slug, title, excerpt, date, readMinutes, content };
  return { post };
}

// POST /api/admin/posts — create a new post
export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!kvConfigured()) {
    return NextResponse.json(
      { error: "KV storage configured nahi hai." },
      { status: 503 }
    );
  }
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  let { post, error } = await buildPost(body);
  if (error || !post) return NextResponse.json({ error }, { status: 400 });

  // ensure unique slug
  const existing = await getAllPosts();
  const slugs = new Set(existing.map((p) => p.slug));
  let slug = post.slug;
  let n = 2;
  while (slugs.has(slug)) slug = `${post.slug}-${n++}`;
  post = { ...post, slug };

  if (!(await savePost(post))) {
    return NextResponse.json({ error: "Save nahi ho saka." }, { status: 500 });
  }
  revalidateTag("blog-posts", { expire: 0 });
  revalidateTag("blog-posts", { expire: 0 });
  return NextResponse.json({ ok: true, slug: post.slug });
}

// PUT /api/admin/posts — update an existing post (body.slug required)
export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!kvConfigured()) {
    return NextResponse.json(
      { error: "KV storage configured nahi hai." },
      { status: 503 }
    );
  }
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const slug = String(body.slug || "").trim();
  if (!slug) return NextResponse.json({ error: "Slug missing." }, { status: 400 });

  // Only KV posts can be edited; file posts get copied into KV on first edit.
  const existing = await getPostBySlug(slug);
  if (!existing) return NextResponse.json({ error: "Post nahi mila." }, { status: 404 });

  const { post, error } = await buildPost(body, slug);
  if (error || !post) return NextResponse.json({ error }, { status: 400 });

  if (!(await savePost(post))) {
    return NextResponse.json({ error: "Save nahi ho saka." }, { status: 500 });
  }
  revalidateTag("blog-posts", { expire: 0 });
  revalidateTag("blog-posts", { expire: 0 });
  return NextResponse.json({ ok: true, slug: post.slug });
}
