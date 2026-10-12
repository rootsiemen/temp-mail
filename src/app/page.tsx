import type { Metadata } from "next";
import Link from "next/link";
import TempMailApp from "@/components/TempMailApp";

export const metadata: Metadata = {
  title: "Temp Mail — Free Temporary Disposable Email Address",
  description:
    "Get a free temporary email address instantly. Use it for signups, trials, and downloads — keep your real inbox 100% spam-free. No signup required.",
  alternates: { canonical: "https://tempmaill.tech" },
};

const STEPS = [
  {
    title: "Get your address",
    text: "Your disposable address is generated instantly — or type your own custom name. No signup, no personal details, no waiting.",
  },
  {
    title: "Use it anywhere",
    text: "Paste the address into any signup form, free trial, or download gate instead of your real email.",
  },
  {
    title: "Read & forget",
    text: "Messages arrive in seconds and auto-delete after 1 hour. Delete the address anytime and it is gone forever.",
  },
];

const FEATURES = [
  {
    title: "Instant & anonymous",
    text: "Addresses are created in one click. We never ask for your name, phone number, or real email.",
  },
  {
    title: "Custom addresses",
    text: "Pick a memorable prefix like your-name@abahi.tech instead of a random string — still fully disposable.",
  },
  {
    title: "Real-time inbox",
    text: "Your inbox refreshes automatically every 5 seconds, so verification codes and links arrive without delay.",
  },
  {
    title: "Auto-delete in 1 hour",
    text: "Every message is permanently deleted after one hour. Nothing is stored, sold, or kept longer than needed.",
  },
  {
    title: "Spam stays away",
    text: "Newsletters, promos, and data brokers never reach your real inbox — because they never learn it.",
  },
  {
    title: "Free forever",
    text: "No accounts, no subscriptions, no hidden limits. Create as many temporary addresses as you need.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Free Temporary Email —{" "}
              <span className="text-blue-600">Keep Spam Out</span> of Your
              Real Inbox
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Get an instant disposable email address for signups, free trials,
              and downloads. No account needed — messages arrive in seconds and
              delete themselves after one hour.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <TempMailApp />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              How temp mail works
            </h2>
            <p className="mt-3 text-slate-600">
              Three simple steps between you and a spam-free inbox.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-base font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Why use Temp Mail?
            </h2>
            <p className="mt-3 text-slate-600">
              A throwaway email is the simplest privacy tool you are not using
              yet.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-6 w-6 text-blue-600"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <h3 className="mt-3 text-base font-bold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            What is a temporary email address?
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              A temporary email address — also called disposable email,
              throwaway email, or temp mail — is a real, working inbox that
              exists for a short time. You can receive verification codes,
              confirmation links, and one-time passwords with it, exactly like
              a normal email address. The difference is that it is not tied to
              your identity, and everything in it is deleted automatically after
              a short period (on Temp Mail, after one hour).
            </p>
            <p>
              Every day, websites ask for your email before letting you download
              a file, read an article, or try a free trial. Handing out your
              real address means newsletters you never wanted, promotional
              offers, and — in the worst case — your address ending up in a
              leaked database. A disposable address breaks that chain: the site
              gets a working inbox, you get what you needed, and your real
              inbox stays clean.
            </p>
            <p>
              Common uses include signing up for free trials without the
              follow-up marketing emails, downloading ebooks and whitepapers,
              testing your own website&apos;s signup flow as a developer,
              joining forums you will visit once, and grabbing discount codes
              that require an email. Because Temp Mail needs no account
              and stores nothing beyond the one-hour window, it is also a
              practical step toward everyday online privacy.
            </p>
            <p>
              A quick note on limits: temporary addresses are receive-only, so
              you cannot send email or reset passwords on accounts you care
              about later. For banking, work, and anything you need long-term,
              always use your real address. Temp mail is for the other 90% of
              the internet — the signups you will never think about again.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/faq"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Read the FAQ
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
            >
              Privacy guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
