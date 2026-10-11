import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn what Temp Mail is, why we built a free temporary email service, and how we protect your privacy.",
  alternates: { canonical: "https://tempmaill.tech/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          About Temp Mail
        </h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
          <p>
            Temp Mail is a free temporary email service. It gives you a
            real, working email address in one click — no signup, no personal
            details — so you can receive verification codes, confirmation
            links, and one-time passwords without exposing your real inbox.
          </p>
          <p>
            We built it for a simple reason: the modern web asks for your email
            address far too often. Download a file, read an article, try a free
            trial — each request is another chance for your address to end up
            on a marketing list or in a leaked database. A disposable address
            breaks that chain.
          </p>
          <h2 className="pt-2 text-xl font-bold text-slate-900">
            How we handle your privacy
          </h2>
          <p>
            Privacy is not a feature here — it is the whole product. We do not
            ask for your name, phone number, or real email address. Every
            message received by a temporary address is automatically and
            permanently deleted after one hour. We do not sell data, we do not
            run ad trackers on the inbox, and there is nothing to leak because
            we keep almost nothing.
          </p>
          <h2 className="pt-2 text-xl font-bold text-slate-900">
            What temp mail is (and is not) for
          </h2>
          <p>
            Temporary email is perfect for one-off signups, free trials,
            downloads, forum registrations, and testing. It is receive-only:
            you cannot send email from a temporary address. For banking, work,
            and accounts you need long-term access to, always use your real
            email address.
          </p>
          <p>
            Questions? Check our{" "}
            <Link href="/faq" className="font-semibold text-blue-600 hover:underline">
              FAQ
            </Link>{" "}
            or start using your first address on the{" "}
            <Link href="/" className="font-semibold text-blue-600 hover:underline">
              homepage
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
