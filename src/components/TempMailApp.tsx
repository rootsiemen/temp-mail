"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EMAIL_DOMAINS,
  randomPrefix,
  sanitizePrefix,
  timeAgo,
  formatDateTime,
  type TempEmail,
} from "@/lib/mail";

const STORAGE_KEY = "abahi-temp-mail-address";
const DOMAIN_KEY = "abahi-temp-mail-domain";
const POLL_INTERVAL = 5000;

export default function TempMailApp() {
  const [prefix, setPrefix] = useState("");
  const [draft, setDraft] = useState("");
  const [domain, setDomain] = useState(EMAIL_DOMAINS[0]);
  const [emails, setEmails] = useState<TempEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState<TempEmail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const address = prefix ? `${prefix}@${domain}` : "";
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchInbox = useCallback(async (addr: string) => {
    if (!addr) return;
    try {
      const res = await fetch(`/api/inbox?address=${encodeURIComponent(addr)}`);
      if (!res.ok) throw new Error("Failed to load inbox");
      const data = await res.json();
      setEmails(Array.isArray(data.emails) ? data.emails : []);
      setError(null);
    } catch {
      setError("Could not refresh the inbox. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const applyPrefix = useCallback(
    (p: string, d: string = domain) => {
      const clean = sanitizePrefix(p) || randomPrefix();
      setPrefix(clean);
      setDraft(clean);
      setEmails([]);
      setLoading(true);
      setSelected(null);
      try {
        localStorage.setItem(STORAGE_KEY, clean);
        localStorage.setItem(DOMAIN_KEY, d);
      } catch {
        /* storage unavailable */
      }
      fetchInbox(`${clean}@${d}`);
    },
    [fetchInbox, domain]
  );

  const changeDomain = (d: string) => {
    setDomain(d);
    applyPrefix(prefix || randomPrefix(), d);
  };

  useEffect(() => {
    let initial = "";
    let savedDomain = EMAIL_DOMAINS[0];
    try {
      initial = localStorage.getItem(STORAGE_KEY) || "";
      const sd = localStorage.getItem(DOMAIN_KEY) || "";
      if (EMAIL_DOMAINS.includes(sd)) savedDomain = sd;
    } catch {
      /* storage unavailable */
    }
    setDomain(savedDomain);
    applyPrefix(initial || randomPrefix(), savedDomain);

    timer.current = setInterval(() => {
      const current = (() => {
        try {
          return localStorage.getItem(STORAGE_KEY) || "";
        } catch {
          return "";
        }
      })();
      const curDomain = (() => {
        try {
          return localStorage.getItem(DOMAIN_KEY) || EMAIL_DOMAINS[0];
        } catch {
          return EMAIL_DOMAINS[0];
        }
      })();
      if (current) fetchInbox(`${current}@${curDomain}`);
    }, POLL_INTERVAL);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [applyPrefix, fetchInbox]);

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = address;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (draft.trim()) applyPrefix(draft.trim());
  };

  return (
    <div id="generator" className="scroll-mt-24">
      {/* Generator card */}
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-100/50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
            Your temporary email address
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <code className="flex-1 truncate rounded-lg bg-blue-950/40 px-4 py-3 font-mono text-lg font-semibold text-white sm:text-xl">
              {address || "generating…"}
            </code>
            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow transition hover:bg-blue-50 active:scale-95"
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        <div className="px-6 py-5 sm:px-8">
          <form onSubmit={handleCustomSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(sanitizePrefix(e.target.value))}
                placeholder="choose-your-name"
                maxLength={40}
                aria-label="Custom email prefix"
                className="w-full bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-slate-400"
              />
              <select
                value={domain}
                onChange={(e) => changeDomain(e.target.value)}
                aria-label="Email domain"
                className="shrink-0 cursor-pointer bg-transparent pr-4 text-sm font-semibold text-blue-700 outline-none"
              >
                {EMAIL_DOMAINS.map((d) => (
                  <option key={d} value={d}>@{d}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-95 sm:flex-none"
              >
                Use this
              </button>
              <button
                type="button"
                onClick={() => applyPrefix(randomPrefix())}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700 active:scale-95 sm:flex-none"
                title="Generate a random address"
              >
                Random
              </button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Inbox auto-refreshes every 5 seconds
            </span>
            <span>Messages auto-delete after 1 hour</span>
            <span>Receiving only — sending is disabled</span>
          </div>
        </div>
      </div>

      {/* Inbox */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
            Inbox
            {emails.length > 0 && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                {emails.length}
              </span>
            )}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                fetchInbox(address);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-700"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
              </svg>
              Refresh
            </button>
            <button
              type="button"
              onClick={() => applyPrefix(randomPrefix())}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-red-400 hover:text-red-600"
              title="Discard this address and get a new one"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        {error && (
          <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-sm text-amber-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3 px-6 py-6" aria-label="Loading inbox">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse rounded-lg bg-slate-100 p-4">
                <div className="h-3 w-1/3 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-2/3 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : emails.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Waiting for emails…</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Copy your address above and use it to sign up anywhere. New
              messages will appear here automatically within seconds.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {emails.map((email) => (
              <li key={email.id}>
                <button
                  type="button"
                  onClick={() => setSelected(email)}
                  className="flex w-full items-start gap-4 px-6 py-4 text-left transition hover:bg-blue-50/60"
                >
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    {(email.from || "?").trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-sm font-semibold text-slate-900">
                        {email.from}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400">
                        {timeAgo(email.date)}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-slate-700">
                      {email.subject || "(no subject)"}
                    </span>
                    {email.preview && (
                      <span className="mt-0.5 block truncate text-xs text-slate-400">
                        {email.preview}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Email modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Email: ${selected.subject}`}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-bold text-slate-900">
                  {selected.subject || "(no subject)"}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Close email"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <dl className="mt-3 space-y-1 text-xs text-slate-500">
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-semibold uppercase">From</dt>
                  <dd className="break-all text-slate-700">{selected.from}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-semibold uppercase">To</dt>
                  <dd className="break-all text-slate-700">{selected.to}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-semibold uppercase">Date</dt>
                  <dd className="text-slate-700">{formatDateTime(selected.date)}</dd>
                </div>
              </dl>
            </div>
            <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-5">
              {selected.html ? (
                <iframe
                  title="Email content"
                  sandbox=""
                  srcDoc={selected.html}
                  className="min-h-[300px] w-full rounded-lg border border-slate-200 bg-white"
                />
              ) : (
                <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-800">
                  {selected.text || "(This message has no readable content.)"}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
