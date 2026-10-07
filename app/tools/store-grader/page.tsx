import type { Metadata } from "next";
import Link from "next/link";
import {
  generateWebApplicationJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import StoreGrader from "@/app/components/StoreGrader";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

// Lighthouse audits via PageSpeed Insights can take 30-45s on slow sites
export const maxDuration = 60;

export const metadata: Metadata = {
  title: "Shopify Store Speed & Health Grader — Free Audit Tool",
  description:
    "Free Shopify store audit. Enter your URL and get a health grade covering page speed, mobile responsiveness, SEO, structured data and app bloat. No signup required.",
  keywords: [
    "shopify store audit",
    "shopify speed test",
    "shopify seo checker",
    "shopify app bloat",
    "shopify store grader",
    "shopify health check",
    "shopify site audit tool",
    "shopify performance test",
  ],
  alternates: { canonical: `${SITE_URL}/tools/store-grader` },
  openGraph: {
    title: "Shopify Store Speed & Health Grader — Free Audit",
    description:
      "Audit any Shopify store for speed, SEO, mobile, structured data, and app bloat, with an A–F grade in under a minute.",
    url: `${SITE_URL}/tools/store-grader`,
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Store Speed & Health Grader", href: "/tools/store-grader" },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the Shopify store grader check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The grader audits six categories from your homepage HTML: performance (server response time, HTML size, script count), SEO (title, description, canonical, H1, robots, image alt coverage), mobile responsiveness, structured data (JSON-LD, Open Graph, Twitter card), app bloat (number of third-party script domains), and security (HTTPS).",
      },
    },
    {
      "@type": "Question",
      name: "How does the grader detect app bloat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool counts every unique third-party domain loading a <script> tag on your homepage — excluding Shopify's own CDN and your own domain. Each unique domain typically represents a different app or tracker. More than 8–12 domains usually indicates significant bloat adding 1–3 seconds of load time.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Shopify Store Speed & Health Grader is 100% free with no signup, email, or account required. We do not store your URL or the audit report. The URL is sent to Google PageSpeed Insights to run the Lighthouse test, and we keep a short lived request count per visitor to prevent abuse.",
      },
    },
    {
      "@type": "Question",
      name: "Does the grader work for non-Shopify sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the audit works on any public website. However, the app-bloat detection and several Shopify-specific heuristics are tuned for Shopify stores, so results are most actionable on Shopify sites.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my server response time slow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common culprits on Shopify stores are heavy theme Liquid loops, un-cached app blocks in the header, excessive metafield lookups, or expensive third-party app endpoints. A Shopify performance agency can typically cut TTFB by 40–70% through theme audits and app consolidation.",
      },
    },
  ],
};

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to audit your Shopify store speed and SEO",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter your store URL",
      text: "Paste your Shopify store URL (e.g. yourstore.com) into the input field.",
    },
    {
      "@type": "HowToStep",
      name: "Run the audit",
      text: "Click 'Grade my store'. The tool audits your homepage HTML and adds a Google Lighthouse test when available, which can take up to 40 seconds.",
    },
    {
      "@type": "HowToStep",
      name: "Review your grade",
      text: "Get an overall A–F grade plus scores for Performance, SEO, Mobile, Apps, Structured Data, and Security.",
    },
    {
      "@type": "HowToStep",
      name: "Act on the findings",
      text: "Each check shows severity and remediation guidance. Fix critical failures first, then warnings.",
    },
  ],
};

export default function StoreGraderPage() {
  const appSchema = generateWebApplicationJsonLd({
    name: "Shopify Store Speed & Health Grader",
    description:
      "Free tool that audits any Shopify store's speed, SEO, mobile responsiveness, structured data, and app bloat — returning an A–F grade and actionable findings in under a minute.",
    path: "/tools/store-grader",
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
              Shopify Store Speed &amp; Health Grader
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Enter any Shopify store URL and get a real Google Lighthouse
              audit plus an A&ndash;F grade covering speed, mobile, SEO,
              structured data, and app bloat &mdash; with a prioritised fix
              list. No signup.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Real Lighthouse scores
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-green-700">
                Core Web Vitals (LCP / CLS / TBT)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-gray-600">
                No signup required
              </span>
            </div>
          </div>
        </section>

        {/* Grader tool */}
        <section className="mx-auto max-w-4xl px-6 py-12">
          <StoreGrader />
        </section>

        {/* What we check */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <div className="rounded-2xl border bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">What the audit checks</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <AuditPillar
                title="Performance"
                items={["Server response time (TTFB)", "HTML document size", "Script count"]}
              />
              <AuditPillar
                title="SEO"
                items={[
                  "Meta title & description length",
                  "Canonical URL",
                  "H1 heading structure",
                  "Robots directive (indexable?)",
                  "Image alt-text coverage",
                ]}
              />
              <AuditPillar
                title="Mobile"
                items={["Responsive viewport meta tag"]}
              />
              <AuditPillar
                title="Apps & bloat"
                items={[
                  "Unique third-party script domains",
                  "Duplicate trackers (manual review)",
                ]}
              />
              <AuditPillar
                title="Structured data"
                items={[
                  "JSON-LD schema blocks",
                  "Open Graph tags",
                  "Twitter card",
                  "Favicon declaration",
                ]}
              />
              <AuditPillar title="Security" items={["HTTPS enforcement"]} />
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gray-900 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Found issues? Get an expert to fix them.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Our matching service connects you with Shopify performance, SEO
              and CRO specialists &mdash; all vetted, all free to contact.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/get-matched"
                className="rounded-lg bg-green-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
              >
                Get Matched &mdash; Free
              </Link>
              <Link
                href="/agencies?specialization=Performance+Optimization"
                className="rounded-lg border border-gray-600 px-8 py-3.5 text-sm font-semibold text-gray-300 hover:border-gray-400 hover:text-white"
              >
                Browse Performance Agencies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function AuditPillar({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-600">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
