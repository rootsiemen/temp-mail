import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { deletePost, hidePost, kvConfigured } from "@/lib/blog-store";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!kvConfigured()) {
    return NextResponse.json(
      { error: "KV storage configured nahi hai." },
      { status: 503 }
    );
  }
  const { slug } = await params;
  // KV-created posts are deleted; baked-in file posts get a tombstone so
  // they stay hidden instead of reappearing from the file fallback.
  await deletePost(slug);
  await hidePost(slug);
  revalidateTag("blog-posts", { expire: 0 });
  revalidateTag("blog-posts", { expire: 0 });
  return NextResponse.json({ ok: true });
}
