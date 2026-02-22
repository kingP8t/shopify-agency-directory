import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    url: BASE_URL,
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
      </body>
    </html>
  );
}
