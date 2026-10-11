import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Abahi Temp Mail terms of service: acceptable use, limitations of temporary email, and service availability.",
  alternates: { canonical: "https://abahi.tech/terms" },
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. The service",
    body: [
      "Abahi Temp Mail provides free, temporary, receive-only email addresses. Addresses and all messages in them are automatically deleted — messages after one hour. The service requires no account and is provided on an 'as is' basis.",
    ],
  },
  {
    heading: "2. Acceptable use",
    body: [
      "You agree not to use temporary addresses for unlawful activity, fraud, harassment, phishing, spamming others, or attempting to disrupt the service. We may block addresses or patterns associated with abuse without notice.",
      "Temporary addresses must not be used where a long-term, verifiable identity is required — including banking, government services, employment, or password recovery for important accounts. If you lose access to a temporary address, we cannot recover it or the messages it received.",
    ],
  },
  {
    heading: "3. No guarantee of delivery or availability",
    body: [
      "We do our best to deliver messages quickly, but we do not guarantee that any particular email will be received, that the service will be uninterrupted, or that messages will be retained for the full one-hour window. Do not rely on temporary email for anything critical or time-sensitive beyond casual signups.",
    ],
  },
  {
    heading: "4. Content responsibility",
    body: [
      "Messages received by temporary addresses come from third-party senders. We do not review, endorse, or take responsibility for their content. Email bodies are displayed as received; HTML content is sandboxed in your browser for safety, but you should still avoid clicking suspicious links or downloading unexpected attachments.",
    ],
  },
  {
    heading: "5. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, Abahi Temp Mail is not liable for any direct or indirect damages arising from your use of the service, including missed messages, deleted messages, or inability to access an address.",
    ],
  },
  {
    heading: "6. Changes",
    body: [
      "We may update these terms from time to time. The current version will always be posted on this page with its last-updated date. Continued use of the service after changes take effect constitutes acceptance of the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: October 11, 2026</p>
        <div className="mt-8 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold text-slate-900">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
