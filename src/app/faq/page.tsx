import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Temporary Email Questions Answered",
  description:
    "Frequently asked questions about Temp Mail: how temporary email works, how long messages are kept, whether it is free, and more.",
  alternates: { canonical: "https://tempmaill.tech/faq" },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a temporary email address?",
    a: "It is a real, working email address that exists for a short time. You can receive verification codes, confirmation links, and one-time passwords with it — but it is not tied to your identity, and everything in it is deleted automatically after one hour.",
  },
  {
    q: "Is Temp Mail really free?",
    a: "Yes — completely free, with no accounts, subscriptions, or hidden limits. You can create as many temporary addresses as you need.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. Your address is generated instantly when you open the homepage. We never ask for your name, phone number, or real email address.",
  },
  {
    q: "Can I choose my own address instead of a random one?",
    a: "Yes. Type any prefix you like (letters, numbers, dots, dashes, underscores) in the box under your address and click 'Use this'. Your address becomes your-choice@tempmaill.tech.",
  },
  {
    q: "How long are messages kept?",
    a: "Every message is permanently deleted one hour after it arrives. Addresses themselves can be discarded anytime with the Delete button, which immediately gives you a fresh address.",
  },
  {
    q: "How fast do emails arrive?",
    a: "Usually within seconds. Your inbox refreshes automatically every 5 seconds, so verification codes appear without you needing to reload the page.",
  },
  {
    q: "Can I send emails from a temporary address?",
    a: "No — temporary addresses are receive-only. This is intentional: it keeps the service simple, free, and abuse-resistant.",
  },
  {
    q: "Can I recover a deleted address or message?",
    a: "No. Once an address is discarded or a message's hour expires, it is gone permanently. Never use a temporary address for accounts you need long-term access to, like banking or password recovery.",
  },
  {
    q: "Will websites accept a temporary email?",
    a: "Most sites that simply need to send you a code or link work fine. A small number of services block known disposable domains; if a signup rejects your address, that is the site's policy, not a malfunction.",
  },
  {
    q: "Is it safe to click links in received emails?",
    a: "Treat them like any email: be cautious. We sandbox HTML content in your browser, but you should still avoid suspicious links and never download unexpected attachments.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Frequently asked questions
        </h1>
        <p className="mt-3 text-slate-600">
          Everything you need to know about temporary email. Still curious?{" "}
          <Link href="/" className="font-semibold text-blue-600 hover:underline">
            Try it live
          </Link>
          .
        </p>
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 py-5 open:bg-slate-50">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
