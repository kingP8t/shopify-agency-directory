import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/app/components/SiteNav";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://shopifyagencydirectory.com";

export const metadata: Metadata = {
  title: "Agency Badge Programme",
  description:
    "Get your 'Verified on Shopify Agency Directory' badge to embed on your website. Show potential clients you're a trusted Shopify agency.",
  alternates: { canonical: `${SITE}/badge` },
};

const STEPS = [
  {
    num: "1",
    title: "Find Your Profile",
    text: "Search the directory for your agency listing. Every published agency is eligible for a badge.",
  },
  {
    num: "2",
    title: "Choose a Style",
    text: "Pick from Light, Dark, or Minimal badge styles to match your website's design.",
  },
  {
    num: "3",
    title: "Embed on Your Site",
    text: "Copy the HTML snippet and paste it into your website. The badge links back to your verified profile.",
  },
];

export default function BadgePage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Badge Programme
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Show You&apos;re Verified
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Embed a &ldquo;Verified on Shopify Agency Directory&rdquo; badge on
            your website. Build trust with potential clients and link back to
            your profile.
          </p>
        </div>

        {/* Badge preview examples — inline SVGs so they always render */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl border bg-gray-50 p-8">
            {/* Light */}
            <svg width="280" height="56" viewBox="0 0 280 56" xmlns="http://www.w3.org/2000/svg" className="h-14">
              <rect width="280" height="56" rx="8" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1"/>
              <rect width="4" height="56" rx="2" fill="#16a34a"/>
              <circle cx="28" cy="28" r="14" fill="#16a34a"/>
              <path d="M21.5 28.5l4 4 8-8" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="52" y="24" fontFamily="Arial,Helvetica,sans-serif" fontSize="13" fontWeight="700" fill="#111827">Your Agency</text>
              <text x="52" y="40" fontFamily="Arial,Helvetica,sans-serif" fontSize="10" fill="#6b7280">Verified on Shopify Agency Directory</text>
            </svg>
            {/* Dark */}
            <svg width="280" height="56" viewBox="0 0 280 56" xmlns="http://www.w3.org/2000/svg" className="h-14">
              <rect width="280" height="56" rx="8" fill="#111827" stroke="#374151" strokeWidth="1"/>
              <rect width="4" height="56" rx="2" fill="#16a34a"/>
              <circle cx="28" cy="28" r="14" fill="#16a34a"/>
              <path d="M21.5 28.5l4 4 8-8" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="52" y="24" fontFamily="Arial,Helvetica,sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">Your Agency</text>
              <text x="52" y="40" fontFamily="Arial,Helvetica,sans-serif" fontSize="10" fill="#9ca3af">Verified on Shopify Agency Directory</text>
            </svg>
            {/* Minimal */}
            <svg width="240" height="40" viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg" className="h-10">
              <circle cx="20" cy="20" r="12" fill="#16a34a"/>
              <path d="M14.5 20.5l3.5 3.5 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="40" y="17" fontFamily="Arial,Helvetica,sans-serif" fontSize="11" fontWeight="600" fill="#16a34a">Verified</text>
              <text x="40" y="30" fontFamily="Arial,Helvetica,sans-serif" fontSize="9" fill="#6b7280">Shopify Agency Directory</text>
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            Available in Light, Dark &amp; Minimal styles
          </p>
        </div>

        {/* How it works */}
        <div className="mt-16">
          <h2 className="text-center text-xl font-semibold text-gray-900">
            How It Works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-xl border bg-white p-6 text-center shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  {step.num}
                </span>
                <h3 className="mt-3 font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/agencies"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
          >
            Find Your Agency
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Visit your agency profile page to get your personalised embed code.
          </p>
        </div>
      </main>
    </>
  );
}
