import type { TempEmail } from "@/lib/mail";

/**
 * GET /api/inbox?address=someone@tempmaill.tech
 * Reads the stored message list for an address from Cloudflare KV
 * via the KV REST API. Returns { emails: [] } gracefully when the
 * Cloudflare credentials are not configured or the key is missing.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawAddress = (searchParams.get("address") || "").trim().toLowerCase();

  if (!rawAddress || !/^[a-z0-9._-]+@abahi\.tech$/.test(rawAddress)) {
    return Response.json(
      { emails: [], error: "A valid @tempmaill.tech address is required." },
      { status: 400 }
    );
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !namespaceId || !apiToken) {
    // Email receiving not wired up yet — behave as an empty inbox.
    return Response.json({ emails: [], configured: false });
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

    if (res.status === 404) {
      return Response.json({ emails: [] });
    }
    if (!res.ok) {
      return Response.json(
        { emails: [], error: "Inbox temporarily unavailable." },
        { status: 502 }
      );
    }

    const stored = (await res.json()) as unknown;
    const emails: TempEmail[] = Array.isArray(stored) ? stored : [];
    return Response.json({ emails });
  } catch {
    return Response.json(
      { emails: [], error: "Inbox temporarily unavailable." },
      { status: 502 }
    );
  }
}
