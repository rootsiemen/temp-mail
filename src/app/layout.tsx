import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://tempmaill.tech";
const SITE_NAME = "Temp Mail";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Temp Mail — Free Temporary Disposable Email Address",
    template: "%s | Temp Mail",
  },
  description:
    "Get a free temporary email address instantly at tempmaill.tech. Protect your real inbox from spam when signing up for websites, free trials, and downloads. No signup required — emails auto-delete after 1 hour.",
  keywords: [
    "temp mail",
    "temporary email",
    "disposable email",
    "fake email address",
    "throwaway email",
    "10 minute mail",
    "free temp email",
    "anonymous email",
  ],
  authors: [{ name: "Temp Mail" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Temp Mail — Free Temporary Disposable Email Address",
    description:
      "Instant disposable email addresses. Keep your real inbox clean — no signup, no spam, emails auto-delete after 1 hour.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Temp Mail — Free Temporary Disposable Email Address",
    description:
      "Instant disposable email addresses. Keep your real inbox clean — no signup, no spam, emails auto-delete after 1 hour.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Temp Mail",
  url: SITE_URL,
  applicationCategory: "CommunicationApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free temporary disposable email addresses. Instant inbox, no signup required — emails auto-delete after 1 hour.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta
          name="google-site-verification"
          content="WJfsQ2_qRNJmlkRiUTtLJ4SOtunciiV5nMdTX7ED86w"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
