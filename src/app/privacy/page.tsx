import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Temp Mail privacy policy: what data we collect (almost none), how long your messages are kept (1 hour max), your rights, and how we handle your information.",
  alternates: { canonical: "https://tempmaill.tech/privacy" },
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Data we collect",
    body: [
      "We collect as little as possible. To provide temporary email addresses, our servers temporarily process incoming email messages (sender, subject, body, and timestamps) addressed to your temporary address. We do not ask for — and do not store — your name, phone number, real email address, or any account credentials, because accounts do not exist on this service.",
      "Like most websites, our hosting provider may log basic technical data (such as IP addresses and user-agent strings) for security and abuse prevention. These logs are retained for a short period and are never sold or shared for marketing.",
    ],
  },
  {
    heading: "2. How long we keep messages",
    body: [
      "Every email received by a temporary address is automatically and permanently deleted after one hour. There is no archive, no backup of message contents, and no way to recover a message after deletion. Temporary addresses themselves are not linked to any identity.",
    ],
  },
  {
    heading: "3. How we use data",
    body: [
      "Message contents are used solely to display them to whoever holds the matching temporary address in their browser. We do not read, mine, sell, or share message contents with third parties for advertising or any other purpose.",
    ],
  },
  {
    heading: "4. Cookies",
    body: [
      "We use a single functional browser storage entry to remember your current temporary address on your own device so your inbox survives a page refresh. We do not set our own advertising or cross-site tracking cookies. Advertising shown on this site is served by third-party partners, whose cookies are described in the next section.",
    ],
  },
  {
    heading: "5. Advertising (Google AdSense and third-party ad partners)",
    body: [
      "This website is supported by advertising served through Google AdSense. Google and other third-party vendors use cookies — including Google's advertising (DART) cookies — to serve ads on this site based on your prior visits to this website and other websites on the internet.",
      "Google's use of advertising cookies enables Google and its partners to serve ads to you based on your visits to this site and/or other sites. We do not control the cookies set by these third-party vendors, and their use of data is governed by their own privacy policies (see Google's Privacy Policy at policies.google.com/privacy).",
      "You can opt out of personalized advertising by visiting Google Ads Settings (google.com/settings/ads). You can also opt out of many third-party vendors' use of cookies for personalized advertising at aboutads.info. Please note that even with personalized advertising disabled, you may still see non-personalized ads on this site.",
    ],
  },
  {
    heading: "6. Third parties",
    body: [
      "Email delivery is handled through Cloudflare's Email Routing infrastructure, and the website is hosted on Vercel. These providers process data only as necessary to operate the service and are bound by their own privacy policies.",
      "We use Simple Analytics, a privacy-first analytics service that does not use cookies and does not collect personal data, only to understand aggregate page views so we can improve the site.",
    ],
  },
  {
    heading: "7. Children",
    body: [
      "This service is not directed at children under 13, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "8. Changes to this policy",
    body: [
      "If we change this policy in a way that affects your privacy, we will update the date below and post the new version on this page. Continued use of the service after changes take effect means you accept the updated policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: October 26, 2026</p>
        <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
          Short version: we do not want your data. Temporary messages are
          deleted after one hour, we never ask for your identity, and we never
          sell anything we process. The details are below.
        </p>
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
