/**
 * Simple password auth for /admin. The session cookie is a stateless
 * HMAC-SHA256 signature (Web Crypto, works in edge + node runtimes).
 * Set ADMIN_PASSWORD in the environment to enable the admin panel.
 */

export const ADMIN_COOKIE = "tm_admin";
const SESSION_LABEL = "tempmail-admin-session";

async function hmacHex(key: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(data));
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function adminPasswordSet(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

export async function createSessionToken(): Promise<string | null> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return hmacHex(pw, SESSION_LABEL);
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || !token) return false;
  const expected = await hmacHex(pw, SESSION_LABEL);
  if (expected.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return diff === 0;
}

export async function checkPassword(input: string): Promise<boolean> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || !input) return false;
  const a = await hmacHex(pw, input);
  const b = await hmacHex(pw, pw);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
