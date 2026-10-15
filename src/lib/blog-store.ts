import { POSTS, type BlogPost } from "./posts";
import { cacheTag, cacheLife } from "next/cache";

/**
 * Blog post storage: Cloudflare KV (primary, via the same env vars the
 * inbox API already uses) with the baked-in posts.ts as fallback/seed.
 * Posts created or edited in /admin live in KV and override same-slug
 * file posts. If KV is not configured, everything falls back to posts.ts.
 */

const POST_PREFIX = "blog:post:";
const HIDDEN_PREFIX = "blog:hidden:";

function kvConfig() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !namespaceId || !apiToken) return null;
  return { accountId, namespaceId, apiToken };
}

export function kvConfigured(): boolean {
  return kvConfig() !== null;
}

async function kvRead(key: string): Promise<BlogPost | null> {
  const cfg = kvConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}` +
        `/storage/kv/namespaces/${cfg.namespaceId}/values/${encodeURIComponent(key)}`,
      { headers: { Authorization: `Bearer ${cfg.apiToken}` }, cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as unknown;
    if (!data || typeof data !== "object" || !("slug" in data)) return null;
    return data as BlogPost;
  } catch {
    return null;
  }
}

async function kvWrite(key: string, post: BlogPost): Promise<boolean> {
  const cfg = kvConfig();
  if (!cfg) return false;
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}` +
        `/storage/kv/namespaces/${cfg.namespaceId}/values/${encodeURIComponent(key)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cfg.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

async function kvDelete(key: string): Promise<boolean> {
  const cfg = kvConfig();
  if (!cfg) return false;
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}` +
        `/storage/kv/namespaces/${cfg.namespaceId}/values/${encodeURIComponent(key)}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${cfg.apiToken}` } }
    );
    return res.ok;
  } catch {
    return false;
  }
}

async function kvListKeys(prefix: string = POST_PREFIX): Promise<string[]> {
  const cfg = kvConfig();
  if (!cfg) return [];
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}` +
        `/storage/kv/namespaces/${cfg.namespaceId}/keys?prefix=${encodeURIComponent(prefix)}&limit=1000`,
      { headers: { Authorization: `Bearer ${cfg.apiToken}` }, cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { result?: { name: string }[] };
    return (data.result || []).map((k) => k.name);
  } catch {
    return [];
  }
}

/** All keys used by the blog (posts + hidden tombstones). */
async function kvListAllBlogKeys(): Promise<string[]> {
  const [posts, hidden] = await Promise.all([
    kvListKeys(POST_PREFIX),
    kvListKeys(HIDDEN_PREFIX),
  ]);
  return [...posts, ...hidden];
}

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** All posts: KV posts override same-slug file posts, newest first. */
export async function getAllPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheTag("blog-posts");
  cacheLife("hours");
  const keys = await kvListAllBlogKeys();
  const hidden = new Set(
    keys
      .filter((k) => k.startsWith(HIDDEN_PREFIX))
      .map((k) => k.slice(HIDDEN_PREFIX.length))
  );
  const postKeys = keys.filter((k) => k.startsWith(POST_PREFIX));
  if (postKeys.length === 0 && hidden.size === 0) return sortByDateDesc(POSTS);
  const kvPosts = (await Promise.all(postKeys.map((k) => kvRead(k)))).filter(
    (p): p is BlogPost => p !== null && !hidden.has(p.slug)
  );
  const kvSlugs = new Set(kvPosts.map((p) => p.slug));
  const merged = [
    ...kvPosts,
    ...POSTS.filter((p) => !kvSlugs.has(p.slug) && !hidden.has(p.slug)),
  ];
  return sortByDateDesc(merged);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  "use cache";
  cacheTag("blog-posts");
  cacheLife("hours");
  const fromKv = await kvRead(POST_PREFIX + slug);
  if (fromKv) return fromKv;
  const hidden = await kvRead(HIDDEN_PREFIX + slug);
  if (hidden) return undefined;
  return POSTS.find((p) => p.slug === slug);
}

export async function hidePost(slug: string): Promise<boolean> {
  return kvWrite(HIDDEN_PREFIX + slug, {
    slug,
    title: "",
    excerpt: "",
    date: "",
    readMinutes: 0,
    content: [],
  });
}

export async function savePost(post: BlogPost): Promise<boolean> {
  return kvWrite(POST_PREFIX + post.slug, post);
}

export async function deletePost(slug: string): Promise<boolean> {
  return kvDelete(POST_PREFIX + slug);
}

/**
 * Admin editor format: simple markdown-ish text.
 *   ## Heading
 *   Paragraph text, blank line separated.
 * Converts to/from the { heading?, paragraphs[] } structure.
 */
export function parseContent(md: string): BlogPost["content"] {
  const sections: BlogPost["content"] = [];
  let current: { heading?: string; paragraphs: string[] } = { paragraphs: [] };
  let prevBlank = true;
  const pushCurrent = () => {
    if (current.heading || current.paragraphs.length > 0) sections.push(current);
    current = { paragraphs: [] };
  };
  for (const rawLine of md.split("\n")) {
    const line = rawLine.trim();
    if (line.startsWith("## ")) {
      pushCurrent();
      current.heading = line.slice(3).trim();
      prevBlank = true;
    } else if (line.length === 0) {
      prevBlank = true;
    } else if (!prevBlank && current.paragraphs.length > 0) {
      // soft-wrapped continuation of the same paragraph
      current.paragraphs[current.paragraphs.length - 1] += " " + line;
    } else {
      current.paragraphs.push(line);
      prevBlank = false;
    }
  }
  pushCurrent();
  return sections;
}

export function serializeContent(content: BlogPost["content"]): string {
  return content
    .map((s) => `${s.heading ? `## ${s.heading}\n\n` : ""}${s.paragraphs.join("\n\n")}`)
    .join("\n\n");
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
