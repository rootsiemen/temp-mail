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
const SITE_NAME = "Abahi Temp Mail";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Abahi Temp Mail — Free Temporary Disposable Email Address",
    template: "%s | Abahi Temp Mail",
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
  authors: [{ name: "Abahi" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Abahi Temp Mail — Free Temporary Disposable Email Address",
    description:
      "Instant disposable email addresses. Keep your real inbox clean — no signup, no spam, emails auto-delete after 1 hour.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abahi Temp Mail — Free Temporary Disposable Email Address",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
