import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn what Temp Mail is, why we built this free temporary email service, how disposable addresses work, and how we protect your privacy.",
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
            How tempmaill.tech works
          </h2>
          <p>
            Using Temp Mail takes about three seconds. Open the{" "}
            <Link href="/" className="font-semibold text-blue-600 hover:underline">
              homepage
            </Link>{" "}
            and a fresh, working email address is generated for you instantly.
            There is no registration form, no email confirmation loop, and no
            app to install — the address is simply there, ready to receive
            mail.
          </p>
          <p>
            Your inbox refreshes automatically every five seconds, so
            verification codes and confirmation links appear almost as soon as
            they are sent. Every message is stored for exactly one hour and
            then permanently deleted — not archived, not moved to a trash
            folder, just gone. If you no longer need an address, the Delete
            button discards it immediately and hands you a brand-new one.
          </p>
          <p>
            Every address lives on one of our own domains — @abahi.tech,
            @abahi.page, or @abahi.me — and you can personalize the part
            before the @ sign. Type any prefix you like (letters, numbers,
            dots, dashes, underscores) and your address becomes something
            memorable like newsletter@abahi.tech instead of a random string.
          </p>

          <h2 className="pt-2 text-xl font-bold text-slate-900">
            Why disposable email matters
          </h2>
          <p>
            Your real email address is one of the most valuable pieces of
            personal data you own. It is the key to your bank accounts, your
            social profiles, and your password resets — and it is also the
            address that receives every newsletter you never asked for after a
            single careless signup. Data breaches happen weekly; marketing
            databases are bought and sold constantly. Once your address leaks,
            you cannot take it back.
          </p>
          <p>
            A temporary address gives you a buffer zone. Hand the disposable
            address to the forum, the free trial, or the download gate, and
            keep your real inbox for the people and services that actually
            matter to you. If the disposable address starts receiving spam,
            delete it — the spam dies with the address, and your real inbox
            never knew it existed.
          </p>

          <h2 className="pt-2 text-xl font-bold text-slate-900">
            Everyday use cases
          </h2>
          <p>
            People reach for Temp Mail in dozens of small, everyday moments.
            Signing up for a Wi-Fi hotspot at a café. Grabbing a one-time
            discount code. Testing how your own website's signup flow handles
            confirmation emails. Registering on a forum you may visit twice.
            Downloading a whitepaper without subscribing to a sales drip
            campaign. Entering a giveaway without inviting a year of
            promotional email.
          </p>
          <p>
            Developers and QA testers use it too: spinning up fresh addresses
            to test registration flows, password resets, and notification
            emails without polluting real inboxes or maintaining test
            accounts. Because addresses are free and unlimited, you can create
            a new one for every test run.
          </p>

          <h2 className="pt-2 text-xl font-bold text-slate-900">
            Temp Mail vs. other disposable email services
          </h2>
          <p>
            We are not the only temporary email service, and we will not
            pretend the others are useless — many of them work fine. What we
            focus on is simplicity: one click to get an address, automatic
            inbox refresh, automatic deletion after an hour, and no ad trackers
            or popups inside the inbox itself. No accounts to manage, no
            premium tier gating basic features, no clutter between you and
            your verification code.
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

          <h2 className="pt-2 text-xl font-bold text-slate-900">
            Quick answers
          </h2>
          <h3 className="text-base font-semibold text-slate-900">
            Is Temp Mail really free?
          </h3>
          <p>
            Yes — completely free, with no accounts, subscriptions, or hidden
            limits. You can create as many temporary addresses as you need,
            and every feature on the site works without paying anything.
          </p>
          <h3 className="text-base font-semibold text-slate-900">
            How long are my messages kept?
          </h3>
          <p>
            Every message is permanently deleted one hour after it arrives.
            The address itself keeps working for new mail until you discard
            it with the Delete button.
          </p>
          <h3 className="text-base font-semibold text-slate-900">
            Can I send email from a temporary address?
          </h3>
          <p>
            No. Temporary addresses are receive-only by design — this keeps
            the service simple, free, and resistant to abuse. If you need to
            reply to someone, use your real email address.
          </p>
          <h3 className="text-base font-semibold text-slate-900">
            Will every website accept my temporary address?
          </h3>
          <p>
            Most sites that simply need to send you a code or link work fine.
            A small number of services block known disposable domains; if a
            signup rejects your address, try one of our other domains
            (@abahi.tech, @abahi.page, @abahi.me) — the block is the site's
            policy, not a malfunction on our side.
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
