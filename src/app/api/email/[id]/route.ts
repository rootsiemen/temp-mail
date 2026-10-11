import type { TempEmail } from "@/lib/mail";

/**
 * GET /api/email/:id?address=someone@tempmaill.tech
 * Returns a single stored message by looking it up inside the
 * address's inbox list in Cloudflare KV.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const rawAddress = (searchParams.get("address") || "").trim().toLowerCase();

  if (!id || !rawAddress || !/^[a-z0-9._-]+@abahi\.tech$/.test(rawAddress)) {
    return Response.json({ error: "Valid id and @tempmaill.tech address required." }, { status: 400 });
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !namespaceId || !apiToken) {
    return Response.json({ error: "Email storage is not configured." }, { status: 503 });
  }

  const key = `inbox:${rawAddress}`;
  const url =
    `https://api.cloudflare.com/client/v4/accounts/${accountId}` +
    `/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiToken}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return Response.json({ error: "Message not found." }, { status: 404 });
    }
    const stored = (await res.json()) as unknown;
    const emails: TempEmail[] = Array.isArray(stored) ? stored : [];
    const email = emails.find((e) => e.id === id);
    if (!email) {
      return Response.json({ error: "Message not found." }, { status: 404 });
    }
    return Response.json({ email });
  } catch {
    return Response.json({ error: "Message temporarily unavailable." }, { status: 502 });
  }
}
