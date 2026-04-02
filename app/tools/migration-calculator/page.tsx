import type { Metadata } from "next";
import Link from "next/link";
import { generateWebApplicationJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import MigrationCalculator from "@/app/components/MigrationCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

export const metadata: Metadata = {
  title: "Shopify Migration Complexity Calculator — Free Tool",
  description:
    "Assess how complex your Shopify migration will be in 2 minutes. Get a complexity score, estimated timeline, risk factors, and agency recommendations based on your current platform and store setup.",
  keywords: [
    "shopify migration calculator",
    "shopify migration complexity",
    "migrate to shopify",
    "shopify migration cost",
    "magento to shopify migration",
    "woocommerce to shopify migration",
    "shopify platform migration",
    "ecommerce migration tool",
  ],
  alternates: { canonical: `${SITE_URL}/tools/migration-calculator` },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Migration Calculator", href: "/tools/migration-calculator" },
];

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Assess Your Shopify Migration Complexity",
  description:
    "Evaluate the complexity of migrating your ecommerce store to Shopify. Answer 5 sections of questions about your current platform, store size, customizations, integrations, and requirements to get a detailed complexity assessment.",
  totalTime: "PT2M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  tool: { "@type": "HowToTool", name: "Shopify Agency Directory Migration Calculator" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Select Your Current Platform",
      text: "Choose the ecommerce platform you are migrating from, such as Magento, WooCommerce, BigCommerce, Squarespace, Wix, or a custom solution.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter Your Store Size",
      text: "Specify your product count, customer base size, and order history volume to assess data migration complexity.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Describe Your Customizations",
      text: "Indicate whether you have a custom theme, custom apps or plugins, and a customized checkout flow.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Detail Your Integrations",
      text: "Select your integration count, multi-language and multi-currency requirements, and any custom data structures.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Set Your Requirements",
      text: "Indicate whether you need Shopify Plus and how urgent your migration timeline is to complete your assessment.",
    },
  ],
};

export default function MigrationCalculatorPage() {
  const appSchema = generateWebApplicationJsonLd({
    name: "Shopify Migration Complexity Calculator",
    description:
      "Free interactive tool to assess the complexity of migrating your ecommerce store to Shopify. Get a complexity score, timeline estimate, risk factors, and agency recommendations.",
    path: "/tools/migration-calculator",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_SCHEMA) }}
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
              Shopify Migration Complexity Calculator
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Assess how complex your migration to Shopify will be. Answer 5
              quick sections about your current store and get a complexity
              score, timeline estimate, and risk assessment.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Covers Magento, WooCommerce, BigCommerce, and more
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <MigrationCalculator />
        </section>

        {/* Bottom CTA band */}
        <section className="bg-gray-900 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Need Expert Help With Your Migration?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Tell us about your project and we&apos;ll match you with 3
              vetted Shopify migration specialists that fit your requirements
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
                href="/agencies?specialization=Migration"
                className="rounded-lg border border-gray-600 px-8 py-3.5 text-sm font-semibold text-gray-300 hover:border-gray-400 hover:text-white"
              >
                Browse Migration Agencies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
