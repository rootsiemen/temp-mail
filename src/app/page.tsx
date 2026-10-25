import type { Metadata } from "next";
import Link from "next/link";
import TempMailApp from "@/components/TempMailApp";
import { getAllPosts } from "@/lib/blog-store";
import { formatPostDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Free Temporary Email — Instant Disposable Temp Mail (No Signup)",
  description:
    "Get a free temporary email address instantly. Use it for signups, trials, and downloads — keep your real inbox 100% spam-free. No signup required.",
  alternates: { canonical: "https://tempmaill.tech" },
};

const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "Is Temp Mail really free?",
    a: "Yes — 100% free, with no accounts, subscriptions, or hidden limits. Create as many temporary email addresses as you need.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. Your disposable address is generated instantly when you open the page. We never ask for your name, phone number, or real email address.",
  },
  {
    q: "How long do emails last?",
    a: "Every message is permanently deleted one hour after it arrives. You can also discard your address anytime to get a fresh one.",
  },
  {
    q: "Which domains can I use?",
    a: "Addresses come on @abahi.tech, @abahi.page, and @abahi.me — and you can set a custom prefix like your-name@abahi.tech.",
  },
  {
    q: "Is it safe to use temp mail?",
    a: "Yes. We collect no personal details, messages auto-delete after one hour, and we never sell data. Still, avoid suspicious links and never use a temporary address for banking or accounts you need long-term access to.",
  },
];

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Temp Mail",
  url: "https://tempmaill.tech",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web)",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free temporary disposable email addresses. Instant inbox, no signup required — emails auto-delete after 1 hour. Use for OTP codes, signups, trials, and spam-free registration.",
  featureList:
    "Instant disposable inbox, custom address prefix, real-time email refresh, auto-delete after 1 hour, no signup, no personal data collected",
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

const USE_CASES = [
  {
    title: "Free trials without the follow-up",
    text: "Streaming, software, and fitness trials all want an email up front — and a permanent seat on their marketing list as part of the deal. Start the trial on a disposable address. If you stay, move the account to your real address; if you walk away, the weekly drip campaign dies with the address it was sent to.",
  },
  {
    title: "Downloads, ebooks, and discount codes",
    text: "Gated PDFs, templates, and one-time coupon codes all trade content for your address. A temp inbox collects the download link or the code in seconds, and your real inbox is spared the 'insights' newsletter that was the actual price of the freebie.",
  },
  {
    title: "One-off accounts and forums",
    text: "The support forum you will visit twice. The comment section under one article. The Wi-Fi portal at the airport. A throwaway address fits every signup that does not deserve a permanent place in your digital life — useful for ten minutes, gone in an hour.",
  },
  {
    title: "Testing and development",
    text: "Developers and QA teams spin up fresh addresses to test signup flows, password resets, and notification emails. No test accounts to maintain, no real inbox flooded with staging messages, and every test run starts from a clean, empty inbox.",
  },
];

export default async function Home() {
  const latestPosts = (await getAllPosts()).slice(0, 3);
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

      {/* Use cases */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Everyday ways people use Temp Mail
            </h2>
            <p className="mt-3 text-slate-600">
              Most signups do not deserve your real address. These are the
              moments a disposable one earns its keep.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-base font-bold text-slate-900">{u.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-slate-50">
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

      {/* Temp Mail vs real inbox */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Temp Mail vs. your regular inbox
            </h2>
            <p className="mt-3 text-slate-600">
              They are not competitors — they are two tools for two different
              jobs. The mistake is using one address for both.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-base font-bold text-slate-900">
                Your real inbox is for keeps
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>Accounts you will still log into next month</li>
                <li>Password recovery, receipts, and order history</li>
                <li>Banking, work, government, and health services</li>
                <li>Conversations with actual people</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="text-base font-bold text-slate-900">
                Temp Mail is for the moment
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>Signups you will probably never revisit</li>
                <li>Verification codes and one-time download links</li>
                <li>Trials, coupons, and email-gated content</li>
                <li>Testing your own website&apos;s signup flow</li>
              </ul>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900">
              When temp mail is the wrong tool
            </h3>
            <div className="mt-3 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                A temporary address deletes itself — that is the feature, and
                it is also the limit. Never use one for anything tied to money
                or identity, for an account you cannot afford to lose access
                to, or for anything a sender might email you about next week:
                the message will have nowhere to land. If a service matters,
                it gets your real address. No exceptions for banking, primary
                password recovery, or two-factor recovery on important
                accounts.
              </p>
              <p>
                Used well, temp mail is a hygiene habit, not a hiding place.
                Keep one habit in mind: use a different address per service,
                so no two signups can be linked together if one of them leaks.
                Treat links inside a temporary inbox with the same caution as
                any email — we sandbox the HTML, but a too-good-to-be-true
                offer is still a too-good-to-be-true offer. And when you are
                done, press Delete: an address you discard cannot receive
                another message, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From the blog */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Guides from the Temp Mail blog
            </h2>
            <p className="mt-3 text-slate-600">
              Practical, honest writing on disposable email and inbox privacy —
              the strategy behind the tool.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-blue-700">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse all guides
            </Link>
          </div>
        </div>
      </section>

      {/* Homepage FAQ */}
      <section className="bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Temporary email FAQs
            </h2>
            <p className="mt-3 text-slate-600">
              Quick answers about free disposable email addresses.
            </p>
          </div>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {HOME_FAQS.map((f) => (
              <details
                key={f.q}
                className="group px-6 py-5 open:bg-slate-50"
              >
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
          <p className="mt-6 text-center text-sm text-slate-600">
            Still curious?{" "}
            <Link
              href="/faq"
              className="font-semibold text-blue-600 hover:underline"
            >
              Read the full FAQ
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
