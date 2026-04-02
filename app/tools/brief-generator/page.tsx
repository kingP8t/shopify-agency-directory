import type { Metadata } from "next";
import Link from "next/link";
import { generateWebApplicationJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import BriefGenerator from "@/app/components/BriefGenerator";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

export const metadata: Metadata = {
  title: "Free Shopify Project Brief Generator — Create Your RFP in Minutes",
  description:
    "Create a professional Shopify project brief in minutes. Answer a few questions about your business, goals, and requirements — then download a polished PDF to send to agencies.",
  keywords: [
    "shopify project brief template",
    "shopify RFP generator",
    "agency brief template",
    "how to brief a shopify agency",
    "shopify project brief",
    "ecommerce RFP template",
    "shopify agency brief",
  ],
  alternates: { canonical: `${SITE_URL}/tools/brief-generator` },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Brief Generator", href: "/tools/brief-generator" },
];

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a Shopify Agency Project Brief",
  description:
    "Create a professional Shopify project brief in minutes using our free interactive generator. Answer 7 sections, then download a polished PDF.",
  totalTime: "PT10M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  tool: { "@type": "HowToTool", name: "Shopify Agency Directory Brief Generator" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Describe Your Business",
      text: "Enter your company name, website URL, industry, current platform, and monthly revenue range.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select Your Project Type",
      text: "Choose from new store build, redesign, platform migration, Shopify Plus upgrade, headless build, or ongoing support.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Define Goals & Requirements",
      text: "Select your primary goals (e.g. increase conversion rate, improve mobile experience) and list must-have and nice-to-have features.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Set Design Preferences",
      text: "Choose a design style (minimal, bold, corporate, luxury), add example websites you like, and indicate whether you have brand guidelines.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Specify Technical Requirements",
      text: "Select integrations needed (ERP, PIM, email marketing, etc.), catalog size, and whether you need multi-language or multi-currency support.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Set Timeline & Budget",
      text: "Enter your desired launch date, select a budget range, and indicate your timeline flexibility.",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Download Your Brief",
      text: "Add your contact information, review the brief preview, and download a professional PDF to send to agencies.",
    },
  ],
};

export default function BriefGeneratorPage() {
  const appSchema = generateWebApplicationJsonLd({
    name: "Shopify Project Brief Generator",
    description:
      "Free interactive tool to create a professional Shopify project brief. Answer questions about your business, goals, timeline, and budget — then download a polished PDF to send to agencies.",
    path: "/tools/brief-generator",
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
              Shopify Project Brief Generator
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Create a professional project brief in minutes. Answer 7 quick
              sections about your business and requirements, then download a
              polished PDF you can send to any agency.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No signup required
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Downloadable PDF
              </span>
            </div>
          </div>
        </section>

        {/* Generator */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <BriefGenerator />
        </section>

        {/* Bottom CTA band */}
        <section className="bg-gray-900 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Send Your Brief to Agencies?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Submit your brief through our free matching service and receive
              3 curated agency recommendations within 24 hours.
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
