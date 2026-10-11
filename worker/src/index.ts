import PostalMime from "postal-mime";

interface Env {
  INBOX_KV: KVNamespace;
}

interface StoredEmail {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  text?: string;
  html?: string;
  preview?: string;
}

const MAX_PER_ADDRESS = 50;
const TTL_SECONDS = 3600; // 1 hour — messages auto-delete

function makePreview(text: string | undefined, html: string | undefined): string {
  const source = (text || "").trim();
  if (source) return source.replace(/\s+/g, " ").slice(0, 140);
  if (html) {
    return html
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 140);
  }
  return "";
}

export default {
  async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
    const recipient = message.to.trim().toLowerCase();

    // Safety: only handle our own domain.
    if (!recipient.endsWith("@tempmaill.tech")) {
      message.setReject("Address not served here.");
      return;
    }

    let parsed;
    try {
      const raw = await new Response(message.raw).arrayBuffer();
      parsed = await PostalMime.parse(raw);
    } catch {
      message.setReject("Could not parse message.");
      return;
    }

    const from =
      parsed.from?.address ||
      (parsed.headers.find((h) => h.key === "from")?.value as string) ||
      "unknown sender";

    const email: StoredEmail = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
      from: String(from).slice(0, 200),
      to: recipient,
      subject: (parsed.subject || "(no subject)").slice(0, 300),
      date: parsed.date || new Date().toISOString(),
      text: parsed.text?.slice(0, 8000),
      html: parsed.html?.slice(0, 30000),
      preview: makePreview(parsed.text, parsed.html),
    };

    const key = `inbox:${recipient}`;
    let existing: StoredEmail[] = [];
    try {
      const stored = await env.INBOX_KV.get<StoredEmail[]>(key, "json");
      if (Array.isArray(stored)) existing = stored;
    } catch {
      existing = [];
    }

    existing.unshift(email);
    const trimmed = existing.slice(0, MAX_PER_ADDRESS);

    await env.INBOX_KV.put(key, JSON.stringify(trimmed), {
      expirationTtl: TTL_SECONDS,
    });
  },
};
