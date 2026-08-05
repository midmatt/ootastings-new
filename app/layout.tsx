import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { OG_IMAGE, PARENT_ORG, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

/**
 * Root metadata. `metadataBase` makes every relative canonical/OG URL below
 * resolve to an absolute one, which crawlers and social scrapers require.
 * `title.template` gives interior routes the "… | OOT Tastings" suffix without
 * each page repeating the brand.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OOT Tastings — Guided Olive Oil Tastings & Pairings",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Guided olive oil tastings, flights and pairings for corporate events, retreats and private groups — hosted on location by the team who source the oil.",
  applicationName: SITE_NAME,
  authors: [{ name: PARENT_ORG }],
  creator: PARENT_ORG,
  publisher: PARENT_ORG,
  // No canonical here on purpose. Metadata is shallow-merged, so a canonical
  // set on the layout is inherited by every route that does not override it —
  // one forgotten `alternates` on a future page would self-canonicalise it to
  // the homepage and drop it from the index. Each route declares its own.
  icons: {
    icon: "/logo-olive.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "OOT Tastings — Guided Olive Oil Tastings & Pairings",
    description:
      "Guided olive oil tastings, flights and pairings for corporate events, retreats and private groups — hosted on location by the team who source the oil.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "OOT Tastings — Guided Olive Oil Tastings & Pairings",
    description:
      "Guided olive oil tastings, flights and pairings for corporate events, retreats and private groups — hosted on location by the team who source the oil.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // TODO: add `verification: { google: "…", other: { "msvalidate.01": "…" } }`
  // once Search Console and Bing Webmaster Tools issue their codes.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      {/*
        suppressHydrationWarning: browser extensions (Grammarly and friends)
        inject attributes like data-gr-ext-installed onto <body> before React
        hydrates, which React reports as a mismatch. It only affects this
        element's own attributes, not any content inside it.
      */}
      <body className="bg-cream text-ink antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
