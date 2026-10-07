import type { Metadata } from "next";
import Link from "next/link";
import {
  generateWebApplicationJsonLd,
  generateBreadcrumbJsonLd,
  withSocialMetadata,
} from "@/lib/seo";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PlanComparisonCalculator from "@/app/components/PlanComparisonCalculator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

export const metadata: Metadata = withSocialMetadata({
  title: "Shopify Plan Comparison Calculator — Basic, Shopify, Advanced, Plus",
  description:
    "Compare Shopify Basic, Shopify, Advanced, and Plus side-by-side. Enter your revenue, staff and feature needs to see the total monthly cost (plan fee + card processing + transaction fees) and get a recommendation.",
  keywords: [
    "shopify plan comparison",
    "shopify plan calculator",
    "shopify basic vs advanced",
    "shopify advanced vs plus",
    "shopify plus cost",
    "shopify transaction fees",
    "which shopify plan",
    "shopify pricing",
  ],
  alternates: { canonical: `${SITE_URL}/tools/plan-calculator` },
}, "/tools/plan-calculator");

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Plan Comparison Calculator", href: "/tools/plan-calculator" },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which Shopify plan should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basic ($29/mo) suits solo merchants under ~$20k/mo revenue. Shopify ($79/mo) fits small teams at $20k–$80k/mo. Advanced ($299/mo) is worth it above ~$100k/mo when the lower card rate and custom reports pay for the jump. Plus ($2,300/mo+) is for enterprise brands, unlimited B2B catalogs, or checkout extensibility.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Shopify actually cost per month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The total cost is the plan fee + card processing (2.25%–2.9% + $0.30 per transaction) + Shopify's transaction fee (only charged when you do not use Shopify Payments — 0.15% to 2% depending on plan). Our calculator estimates all three components so you see the true monthly bill.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need Shopify Plus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Since April 2026 every paid plan includes native B2B, with caps on companies and price lists. You need Plus if you require full checkout customisation (UI extensions), expansion stores, a dedicated wholesale storefront, unlimited B2B price lists, or Shopify Markets Pro for advanced international selling. Most merchants doing under $1M/year do not need Plus.",
      },
    },
    {
      "@type": "Question",
      name: "How do I save on Shopify transaction fees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use Shopify Payments as your processor — it removes the 0.15%–2% transaction fee entirely. If you must use a third-party gateway, upgrading plans reduces the fee (Basic: 2%, Shopify: 1%, Advanced: 0.5%, Plus: 0.15%). At higher revenue the fee saving often covers the plan upgrade cost.",
      },
    },
    {
      "@type": "Question",
      name: "Is Shopify Plus worth it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plus starts at ~$2,300/mo (and scales with revenue above roughly $800k/mo). It becomes worth it once you need unlimited staff, multiple storefronts, deep checkout customisation, unlimited B2B catalogs with a fully separate wholesale setup, or when the 0.15% transaction fee and 2.25% card rate savings on high volume exceed the plan cost.",
      },
    },
  ],
};

export default function PlanCalculatorPage() {
  const appSchema = generateWebApplicationJsonLd({
    name: "Shopify Plan Comparison Calculator",
    description:
      "Free interactive tool that compares Shopify Basic, Shopify, Advanced and Plus based on your revenue, staff count and feature needs. Shows total monthly cost and recommends the cheapest eligible plan.",
    path: "/tools/plan-calculator",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
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
              Shopify Plan Comparison Calculator
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Basic, Shopify, Advanced or Plus? Enter your monthly revenue,
              staff count and feature needs to see a full cost breakdown for
              all 4 plans &mdash; including transaction fee savings &mdash;
              and get a recommendation in seconds.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Includes card processing &amp; transaction fees
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <PlanComparisonCalculator />
        </section>

        {/* Bottom CTA band */}
        <section className="bg-gray-900 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to upgrade your Shopify plan?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Our matching service connects you with vetted Shopify agencies
              that handle plan upgrades, Plus migrations, and checkout
              optimisation &mdash; completely free.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/get-matched"
                className="rounded-lg bg-green-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
              >
                Get Matched &mdash; Free
              </Link>
              <Link
                href="/agencies?specialization=Shopify+Plus"
                className="rounded-lg border border-gray-600 px-8 py-3.5 text-sm font-semibold text-gray-300 hover:border-gray-400 hover:text-white"
              >
                Browse Plus Partners
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
