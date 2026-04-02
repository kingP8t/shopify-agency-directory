import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

export const metadata: Metadata = {
  title: "Free Shopify Tools — Cost Estimator, Brief Generator & Migration Calculator",
  description:
    "Free tools for Shopify merchants. Estimate project costs, create a professional agency brief, or assess your migration complexity — all in minutes.",
  keywords: [
    "shopify tools",
    "shopify cost calculator",
    "shopify project brief",
    "shopify migration calculator",
    "shopify agency tools",
    "free shopify resources",
  ],
  alternates: { canonical: `${SITE_URL}/tools` },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Free Tools", href: "/tools" },
];

const TOOLS = [
  {
    title: "Project Cost Estimator",
    description:
      "Estimate your Shopify project cost in 60 seconds. Get price ranges for store builds, redesigns, migrations, and Shopify Plus upgrades based on data from 900+ agencies.",
    href: "/tools/cost-estimator",
    icon: (
      <svg
        className="h-8 w-8 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    badges: ["60-second estimate", "900+ agency data"],
  },
  {
    title: "Agency Brief Generator",
    description:
      "Create a professional Shopify project brief in minutes. Answer 7 quick sections about your business and requirements, then download a polished PDF to send to any agency.",
    href: "/tools/brief-generator",
    icon: (
      <svg
        className="h-8 w-8 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    badges: ["No signup required", "Downloadable PDF"],
  },
  {
    title: "Migration Complexity Calculator",
    description:
      "Assess how complex your Shopify migration will be. Answer questions about your current platform, store size, customizations, and integrations — then get a complexity score, timeline, and risk factors.",
    href: "/tools/migration-calculator",
    icon: (
      <svg
        className="h-8 w-8 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    badges: ["2-minute assessment", "Risk analysis"],
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a Shopify store cost to build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shopify store costs vary widely depending on project type and complexity. A theme-based build typically costs $3,000\u2013$15,000, while a fully custom build can range from $15,000 to $100,000+. Use our free Cost Estimator tool to get a personalised estimate based on your specific requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write a project brief for a Shopify agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good Shopify project brief should cover your business background, project type, goals and requirements, design preferences, technical needs (integrations, catalog size), timeline, and budget. Our free Brief Generator walks you through all 7 sections and produces a downloadable PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to sign up to use these tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Both the Cost Estimator and the Brief Generator are completely free to use with no signup or account required. You can optionally save your brief to receive agency recommendations.",
      },
    },
    {
      "@type": "Question",
      name: "How complex is a Shopify migration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Migration complexity depends on your current platform, store size, customizations, and integrations. Magento and custom platform migrations are typically the most complex. Our free Migration Complexity Calculator assesses your specific situation and provides a complexity score, timeline estimate, and risk factors.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the Shopify cost estimator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our estimates are based on pricing data from 900+ verified Shopify agencies worldwide. The ranges reflect real market rates across different regions and project complexities. Actual costs will depend on your specific requirements, which is why we recommend using the Brief Generator to detail your needs before contacting agencies.",
      },
    },
  ],
};

export default function ToolsPage() {
  const crumbSchema = generateBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
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
              Free Resources
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Free Shopify Tools
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Everything you need to plan your Shopify project and find the right
              agency. No signup, no cost &mdash; just useful tools.
            </p>
          </div>
        </section>

        {/* Tools grid */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-all hover:border-green-200 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 transition-colors group-hover:bg-green-100">
                  {tool.icon}
                </div>
                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  {tool.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {tool.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-600 group-hover:text-green-700">
                  Try it free
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gray-900 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Need Help Finding the Right Agency?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Use our free matching service to get 3 curated agency
              recommendations within 24 hours.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/get-matched"
                className="rounded-lg bg-green-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
              >
                Get Matched &mdash; Free
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
