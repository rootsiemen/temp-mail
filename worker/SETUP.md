# Abahi Temp Mail — Cloudflare Setup Guide

This guide wires up real email receiving for `abahi.tech` using **Cloudflare
Email Routing (free)** + a **Worker** + **KV storage**. The Next.js site on
Vercel then reads inboxes through the Cloudflare KV REST API.

Estimated time: 20–30 minutes. Cost: $0.

---

## Part 1 — Add the domain to Cloudflare

1. Sign up / log in at <https://dash.cloudflare.com>.
2. **Add a site** → enter `abahi.tech` → choose the **Free** plan.
3. Cloudflare shows you 2 nameservers. At your domain registrar (wherever
   `abahi.tech` is registered), replace the current nameservers with the
   Cloudflare ones.
4. Wait for the domain status to become **Active** (usually a few minutes,
   can take up to 24h).

## Part 2 — Enable Email Routing

1. In the Cloudflare dashboard, open `abahi.tech` → **Email** → **Email Routing**.
2. Click **Get started** and follow the wizard. Cloudflare automatically adds
   the required MX and TXT records — **do not skip this**, it is what lets
   Cloudflare receive mail for your domain.
3. When asked about a destination address, you can enter any address you own
   (it is only a fallback; our catch-all rule below will handle temp mail).
4. Verify Email Routing shows **Enabled**.

## Part 3 — Create the KV namespace

On your own computer (with Node.js installed):

```bash
cd worker
npm install
npx wrangler login
npx wrangler kv namespace create INBOX_KV
```

Copy the `id` from the output and paste it into `worker/wrangler.toml`,
replacing `REPLACE_WITH_KV_NAMESPACE_ID`.

## Part 4 — Deploy the Worker

```bash
cd worker
npm run deploy
```

You should see `abahi-temp-mail-worker` deployed successfully.

## Part 5 — Route all mail to the Worker (catch-all)

1. In the Cloudflare dashboard: `abahi.tech` → **Email** → **Email Routing** →
   **Routing rules** → **Catch-all address**.
2. Click **Edit**, set the action to **Send to a Worker**.
3. Choose **abahi-temp-mail-worker** from the dropdown and **Save**.
4. From now on, **any** address `@abahi.tech` (e.g. `ali@abahi.tech`,
   `test123@abahi.tech`) is delivered to the Worker, which parses it with
   `postal-mime` and stores it in KV under `inbox:<address>` for 1 hour
   (max 50 messages per address).

## Part 6 — Connect the website (Vercel env vars)

The site reads KV through the Cloudflare API. Create an API token:

1. Cloudflare dashboard → **My Profile** → **API Tokens** → **Create Token**.
2. Use the **Custom token** template with these permissions:
   - Account → **Workers KV Storage: Read**
   - Include → your account. (The token never leaves your server — it is only
     used in Vercel server-side API routes.)
3. In your Vercel project → **Settings** → **Environment Variables**, add:
   - `CLOUDFLARE_ACCOUNT_ID` — from the dashboard URL or Workers overview page
   - `CLOUDFLARE_KV_NAMESPACE_ID` — the same id from Part 3
   - `CLOUDFLARE_API_TOKEN` — the token from step 2
4. Redeploy. Until these are set, the inbox simply shows empty (no errors).

## Part 7 — Test end-to-end

1. Open <https://abahi.tech>, copy your temp address.
2. Send a test email to it from your own Gmail.
3. Within seconds it should appear in the inbox (auto-refreshes every 5s).
4. Wait 1 hour (or check KV) to confirm auto-deletion via TTL.

---

## How it works (summary)

```
someone@example.com ──sends──▶ MX @ Cloudflare ──catch-all──▶ Worker
     Worker parses with postal-mime, stores JSON in KV (1h TTL)
Vercel API (/api/inbox) ──KV REST API──▶ returns messages ──▶ site inbox
```

## Notes & limits

- **Receiving only.** The Worker never sends mail; replies/bounces are dropped.
- **1-hour retention** is enforced by KV `expirationTtl` — nothing to clean up.
- **Abuse:** Cloudflare's free Email Routing is generous, but if the domain is
  used for spam signups at high volume, add rate limiting or an allowlist later.
- **Attachments** are ignored (only text/html bodies are stored) to keep KV
  values small. Increase limits in `worker/src/index.ts` if needed.
