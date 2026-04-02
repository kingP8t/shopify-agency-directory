import type { Metadata } from "next";
import Link from "next/link";
import { generateWebApplicationJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CostEstimator from "@/app/components/CostEstimator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

export const metadata: Metadata = {
  title: "Shopify Project Cost Estimator — Free Calculator",
  description:
    "Estimate your Shopify project cost in 60 seconds. Get price ranges for store builds, redesigns, migrations, and Shopify Plus upgrades based on data from 900+ agencies.",
  keywords: [
    "shopify project cost estimator",
    "shopify website cost calculator",
    "shopify development cost",
    "shopify agency pricing",
    "how much does a shopify store cost",
    "shopify plus cost",
    "shopify migration cost",
  ],
  alternates: { canonical: `${SITE_URL}/tools/cost-estimator` },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools/cost-estimator" },
  { name: "Cost Estimator", href: "/tools/cost-estimator" },
];

export default function CostEstimatorPage() {
  const appSchema = generateWebApplicationJsonLd({
    name: "Shopify Project Cost Estimator",
    description:
      "Free interactive calculator to estimate Shopify project costs based on project type, complexity, integrations, catalog size, and agency location.",
    path: "/tools/cost-estimator",
  });
  const crumbSchema = generateBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        <SiteNav />

        {/* Hero */}
        <section className="border-b bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <Breadcrumbs items={breadcrumbs} />

            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-green-600">
              Free Tool
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Shopify Project Cost Estimator
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Answer 5 quick questions and get an instant cost estimate for your
              Shopify project — based on real pricing data from 900+ verified
              agencies worldwide.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Based on data from 900+ verified Shopify agencies
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <CostEstimator />
        </section>

        {/* Bottom CTA band */}
        <section className="bg-gray-900 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Find the Right Agency?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Tell us about your project and we&apos;ll match you with 3
              vetted Shopify agencies that fit your budget and requirements
              — completely free.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/get-matched"
                className="rounded-lg bg-green-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
              >
                Get Matched — Free
              </Link>
              <Link
                href="/agencies"
                className="rounded-lg border border-gray-600 px-8 py-3.5 text-sm font-semibold text-gray-300 hover:border-gray-400 hover:text-white"
              >
                Browse Directory
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
