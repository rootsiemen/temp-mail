import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact the Temp Mail team: support questions, abuse reports, privacy requests, and business inquiries. Email us and we will get back to you.",
  alternates: { canonical: "https://tempmaill.tech/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Contact Us
        </h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
          <p>
            Temp Mail has no accounts and no support tickets — but there are
            real people behind it, and email is the way to reach us. Whether
            something is not working, you spotted abuse, or you just have a
            question the{" "}
            <Link href="/faq" className="font-semibold text-blue-600 hover:underline">
              FAQ
            </Link>{" "}
            did not answer, write to us at:
          </p>
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <a
              href="mailto:neilsonsmarry@gmail.com"
              className="text-lg font-bold text-blue-700 hover:underline"
            >
              neilsonsmarry@gmail.com
            </a>
          </p>

          <h2 className="pt-2 text-xl font-bold text-slate-900">
            What to write about
          </h2>
          <p>
            <strong className="text-slate-900">Help and feedback.</strong>{" "}
            An email that never arrived, a domain that misbehaves, or an idea
            that would make Temp Mail better — tell us what happened and which
            address/domain you were using, and we will look into it.
          </p>
          <p>
            <strong className="text-slate-900">Abuse reports.</strong> If one
            of our domains (@abahi.tech, @abahi.page, @abahi.me) is being used
            to send you spam or phishing, forward the message to us with its
            full headers. Temporary addresses are receive-only on our side, so
            anything that looks like outgoing abuse matters to us and we act
            on it.
          </p>
          <p>
            <strong className="text-slate-900">Privacy requests.</strong>{" "}
            Questions about what we store (very little — messages are deleted
            after one hour) are covered in our{" "}
            <Link href="/privacy" className="font-semibold text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            . If your question goes further, email us and we will answer
            directly.
          </p>
          <p>
            <strong className="text-slate-900">Business inquiries.</strong>{" "}
            Partnerships, press, and anything commercial — same address, just
            say so in the subject line.
          </p>

          <h2 className="pt-2 text-xl font-bold text-slate-900">
            One thing we cannot do
          </h2>
          <p>
            We cannot recover a discarded temporary address or a message that
            has passed its one-hour window — they are permanently deleted by
            design, for your privacy as much as ours. If an account you care
            about is tied to a lost temporary address, the service you signed
            up with is the only one who can help you regain access.
          </p>
          <p>
            We read every message and usually reply within a few business
            days. For the fastest self-service answers, start with the{" "}
            <Link href="/faq" className="font-semibold text-blue-600 hover:underline">
              FAQ
            </Link>{" "}
            or learn more{" "}
            <Link href="/about" className="font-semibold text-blue-600 hover:underline">
              about Temp Mail
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
