import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BASE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us & How We Verify Agencies",
  description:
    "Learn how Shopify Agency Directory verifies, reviews, and ranks agencies. Our transparent methodology ensures every listing meets strict quality standards.",
  keywords: [
    "Shopify agency verification",
    "agency directory methodology",
    "how we verify agencies",
    "trusted Shopify agencies",
  ],
  alternates: { canonical: "/about" },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const VERIFICATION_STEPS = [
  {
    number: "01",
    title: "Shopify Partner Validation",
    description:
      "We cross-reference every agency against the official Shopify Partner Directory. Only agencies with an active Shopify Partner or Shopify Plus Partner status are eligible for inclusion.",
    detail: "Checked at submission and re-verified quarterly",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Portfolio & Track Record Review",
    description:
      "Our editorial team reviews each agency's live Shopify store portfolio. We look for production-quality work, design standards, site performance, and evidence of real client projects — not mockups.",
    detail: "Minimum 3 verifiable live stores required",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Client Review Collection",
    description:
      "We aggregate public review data from the Shopify Partner Directory and supplement it with first-party reviews submitted directly on our platform. Every first-party review is moderated before publication.",
    detail: "Reviews checked for authenticity and relevance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Service & Pricing Transparency",
    description:
      "We categorize agencies by their core specializations, budget ranges, and geographic focus. This data is sourced from agency profiles, Shopify Partner data, and direct outreach to ensure accuracy.",
    detail: "Updated when agencies report changes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Ongoing Monitoring",
    description:
      "Listing in our directory is not permanent. We re-check partner status quarterly, monitor review sentiment, and promptly investigate any merchant complaints. Agencies that fall below our standards are flagged or removed.",
    detail: "Quarterly re-verification cycle",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
];

const QUALITY_CRITERIA = [
  {
    label: "Active Shopify Partnership",
    description: "Confirmed partner status on the official Shopify Partner Directory",
  },
  {
    label: "Live Store Portfolio",
    description: "At least 3 verifiable, production Shopify stores built for real clients",
  },
  {
    label: "Public Review History",
    description: "Review data aggregated from Shopify and our platform",
  },
  {
    label: "Accurate Contact Information",
    description: "Working website, valid business email, and responsive to inquiries",
  },
  {
    label: "Defined Service Offering",
    description: "Clear specializations, budget ranges, and geographic areas served",
  },
  {
    label: "No Unresolved Complaints",
    description: "No open, unresolved merchant disputes flagged on our platform",
  },
];

const EDITORIAL_PRINCIPLES = [
  {
    title: "Independence",
    body: "We are not affiliated with Shopify Inc. Our recommendations and rankings are not influenced by any agency's advertising spend or commercial relationship with us. Every agency listing is held to the same verification standard.",
  },
  {
    title: "Transparency",
    body: "This page exists because we believe you should know exactly how we decide which agencies to include. If an agency is featured or highlighted, it is based on verified metrics — not payment. We clearly label any sponsored content.",
  },
  {
    title: "Accuracy",
    body: "We source data from Shopify's official Partner Directory, public review platforms, and direct agency submissions. If an agency claims a specialization or budget range, we look for evidence to support it before publishing.",
  },
  {
    title: "Accountability",
    body: "If you believe any agency listing is inaccurate or misleading, contact us. We investigate every report and will update or remove listings that no longer meet our standards. Agencies can claim their profiles to correct information.",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AboutPage() {
  // Static, trusted data — safe for JSON-LD injection
  const aboutSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about`,
    name: "About Us & How We Verify Agencies",
    description:
      "Learn how Shopify Agency Directory verifies, reviews, and ranks agencies. Our transparent methodology ensures every listing meets strict quality standards.",
    url: `${BASE_URL}/about`,
    mainEntity: { "@id": `${BASE_URL}/#organization` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    isPartOf: { "@id": `${BASE_URL}/#website` },
  });

  // FAQPage schema — targets featured snippets for common trust queries
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do agencies pay to be listed in the Shopify Agency Directory?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Listing in our directory is free. Agencies cannot pay for inclusion, higher rankings, or removal of negative reviews. Our verification process is the same for every agency, regardless of size or budget.",
        },
      },
      {
        "@type": "Question",
        name: "How often does Shopify Agency Directory re-verify agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We run a full re-verification cycle every quarter. This includes checking Shopify Partner status, reviewing new complaint reports, and updating agency information. Between cycles, we investigate any issues reported by merchants.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if a Shopify agency fails verification?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If an agency no longer meets our criteria — for example, their Shopify partnership lapses or they receive multiple unresolved complaints — we either flag their listing with a notice or remove them from the directory entirely.",
        },
      },
      {
        "@type": "Question",
        name: "Can an agency dispute its listing or reviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Agencies can claim their profile, correct factual errors, and respond to reviews publicly. We encourage agencies to engage with feedback. However, they cannot remove legitimate reviews or alter their verification status.",
        },
      },
      {
        "@type": "Question",
        name: "How does the free agency matching service work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When you submit a matching request, our team manually reviews your project brief and connects you with 2-3 agencies that fit your budget, timeline, and requirements. This service is completely free for merchants. We may receive a referral fee from the agency, which is always disclosed.",
        },
      },
      {
        "@type": "Question",
        name: "How can I report an issue with a listed agency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contact us through the form on any agency profile page or email us directly. We take every report seriously and will investigate within 5 business days. If we find a genuine issue, we will update or remove the listing.",
        },
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: aboutSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <div className="min-h-screen bg-gray-50">
        <SiteNav />

        <main>
          {/* ----------------------------------------------------------------- */}
          {/* Hero */}
          {/* ----------------------------------------------------------------- */}
          <section className="relative overflow-hidden bg-white">
            {/* Subtle dot-grid background texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #000 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-12">
              <Breadcrumbs
                items={[
                  { name: "Home", href: "/" },
                  { name: "About & Methodology", href: "/about" },
                ]}
              />

              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
                    Our Methodology
                  </p>
                  <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    How We Verify
                    <br />
                    Every Agency
                  </h1>
                  <p className="mt-5 text-lg leading-relaxed text-gray-600">
                    {SITE_NAME} is an independent, editorially curated directory.
                    Every agency listed here has passed a multi-step verification
                    process designed to protect merchants and surface genuinely
                    qualified Shopify partners.
                  </p>
                </div>

                {/* Trust stat badge */}
                <div className="flex shrink-0 flex-col items-center rounded-2xl border border-green-200 bg-green-50 px-8 py-6 text-center">
                  <span className="text-3xl font-bold text-green-700">5-Step</span>
                  <span className="mt-1 text-sm font-medium text-green-600">
                    Verification
                    <br />
                    Process
                  </span>
                </div>
              </div>
            </div>

            {/* Green accent bar */}
            <div className="h-1 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600" />
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* Verification Process — numbered steps */}
          {/* ----------------------------------------------------------------- */}
          <section className="mx-auto max-w-4xl px-6 py-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Our 5-Step Verification Process
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-500">
                From initial submission to ongoing monitoring, here is exactly how
                an agency earns and maintains a place in our directory.
              </p>
            </div>

            <div className="relative mt-14">
              {/* Vertical timeline line (desktop) */}
              <div
                className="absolute bottom-0 left-[39px] top-0 hidden w-px sm:block"
                style={{
                  background:
                    "repeating-linear-gradient(to bottom, #d1d5db 0, #d1d5db 6px, transparent 6px, transparent 12px)",
                }}
              />

              <ol className="space-y-10">
                {VERIFICATION_STEPS.map((step) => (
                  <li key={step.number} className="relative sm:pl-24">
                    {/* Step number badge */}
                    <div className="absolute left-0 top-0 hidden sm:block">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200 bg-white text-2xl font-bold tracking-tight text-gray-900 shadow-sm">
                        {step.number}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex items-start gap-4">
                        {/* Mobile step number */}
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-sm font-bold text-white sm:hidden">
                          {step.number}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-green-600">{step.icon}</span>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {step.title}
                            </h3>
                          </div>
                          <p className="mt-3 leading-relaxed text-gray-600">
                            {step.description}
                          </p>
                          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
                            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-green-500" fill="currentColor">
                              <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm3.844-8.791a.75.75 0 00-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 10-1.114 1.004l2.25 2.5a.75.75 0 001.15-.043l4.25-5.5z" clipRule="evenodd" />
                            </svg>
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* Quality Criteria checklist */}
          {/* ----------------------------------------------------------------- */}
          <section className="border-y border-gray-200 bg-white px-6 py-20">
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    What Every Agency Must Meet
                  </h2>
                  <p className="mt-3 max-w-lg text-gray-500">
                    These six criteria are non-negotiable. An agency must satisfy
                    all of them to appear in our directory.
                  </p>
                </div>
                <p className="shrink-0 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700">
                  All 6 required
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {QUALITY_CRITERIA.map((criterion) => (
                  <div
                    key={criterion.label}
                    className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-5 transition-colors hover:border-green-200 hover:bg-green-50/30"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" fill="currentColor">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{criterion.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        {criterion.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* Editorial Principles */}
          {/* ----------------------------------------------------------------- */}
          <section className="mx-auto max-w-4xl px-6 py-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Our Editorial Standards
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-500">
                Four principles guide every editorial decision we make —
                from which agencies to include, to how we present their information.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {EDITORIAL_PRINCIPLES.map((principle, index) => (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-gray-600">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* FAQ — builds trust & supports featured snippets */}
          {/* ----------------------------------------------------------------- */}
          <section className="border-t border-gray-200 bg-white px-6 py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                Frequently Asked Questions
              </h2>

              <dl className="mt-12 divide-y divide-gray-100">
                {[
                  {
                    q: "Do agencies pay to be listed?",
                    a: "No. Listing in our directory is free. Agencies cannot pay for inclusion, higher rankings, or removal of negative reviews. Our verification process is the same for every agency, regardless of size or budget.",
                  },
                  {
                    q: "How often do you re-verify agencies?",
                    a: "We run a full re-verification cycle every quarter. This includes checking Shopify Partner status, reviewing new complaint reports, and updating agency information. Between cycles, we investigate any issues reported by merchants.",
                  },
                  {
                    q: "What happens if an agency fails verification?",
                    a: "If an agency no longer meets our criteria — for example, their Shopify partnership lapses or they receive multiple unresolved complaints — we either flag their listing with a notice or remove them from the directory entirely.",
                  },
                  {
                    q: "Can an agency dispute its listing or reviews?",
                    a: "Yes. Agencies can claim their profile, correct factual errors, and respond to reviews publicly. We encourage agencies to engage with feedback. However, they cannot remove legitimate reviews or alter their verification status.",
                  },
                  {
                    q: "How does the free matching service work?",
                    a: "When you submit a matching request, our team manually reviews your project brief and connects you with 2-3 agencies that fit your budget, timeline, and requirements. This service is completely free for merchants. We may receive a referral fee from the agency, which is always disclosed.",
                  },
                  {
                    q: "How can I report an issue with a listed agency?",
                    a: "Contact us through the form on any agency profile page or email us directly. We take every report seriously and will investigate within 5 business days. If we find a genuine issue, we will update or remove the listing.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="py-6">
                    <dt className="font-semibold text-gray-900">{q}</dt>
                    <dd className="mt-2 leading-relaxed text-gray-600">{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* CTA band */}
          {/* ----------------------------------------------------------------- */}
          <section className="bg-gray-900 px-6 py-16">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to find a verified Shopify agency?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-gray-400">
                Every agency in our directory has been through the process above.
                Browse with confidence, or let us match you for free.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/get-matched"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-green-700"
                >
                  Get Matched — Free
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/agencies"
                  className="inline-flex items-center gap-1 rounded-xl border border-gray-700 bg-gray-800 px-8 py-3.5 text-base font-medium text-gray-300 hover:border-gray-600 hover:text-white"
                >
                  Browse Directory
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
