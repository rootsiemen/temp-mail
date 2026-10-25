import Link from "next/link";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/#generator", label: "Temp email generator" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact us" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
  {
    title: "Our Sites",
    links: [
      { href: "https://games.tempmaill.tech", label: "PlayZone — free online games" },
      { href: "https://frinjo.me", label: "Frinjo — web development" },
      { href: "https://tarm.tech", label: "WebStore Dev — web development" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Temp Mail
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Free temporary email addresses that protect your real inbox from
              spam. No signup required — messages are automatically deleted
              after one hour.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) =>
                  link.href.startsWith("http") ? (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener"
                        className="text-sm text-slate-600 transition hover:text-blue-600"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition hover:text-blue-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 Temp Mail. All rights reserved.
          </p>
          <a
            href="https://dododirectory.com"
            target="_blank"
            rel="dofollow"
            title="Featured on DodoDirectory"
          >
            <img
              src="https://dododirectory.com/badge-light.png"
              alt="Featured on DodoDirectory"
              width="120"
              height="32"
              loading="lazy"
            />
          </a>
          <p className="text-sm text-slate-500">
            Temporary emails are for receiving messages only — sending is not
            supported.
          </p>
        </div>
      </div>
    </footer>
  );
}
