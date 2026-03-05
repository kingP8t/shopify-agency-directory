import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import SiteFooter from "@/app/components/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shopify Agency Directory | Find Top Shopify Experts",
    template: "%s | Shopify Agency Directory",
  },
  description:
    "Find and compare the best Shopify agencies and experts. Browse verified Shopify partners by specialization, budget, and location.",
  keywords: [
    "Shopify agency",
    "Shopify experts",
    "Shopify partners",
    "ecommerce agency",
    "Shopify development",
    "Shopify design",
  ],
  authors: [{ name: "Shopify Agency Directory" }],
  creator: "Shopify Agency Directory",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Shopify Agency Directory",
    title: "Shopify Agency Directory | Find Top Shopify Experts",
    description:
      "Find and compare the best Shopify agencies and experts. Browse verified Shopify partners by specialization, budget, and location.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Agency Directory | Find Top Shopify Experts",
    description:
      "Find and compare the best Shopify agencies and experts. Browse verified Shopify partners by specialization, budget, and location.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SiteFooter />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FBXDCWGZKS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FBXDCWGZKS');
          `}
        </Script>
      </body>
    </html>
  );
}
