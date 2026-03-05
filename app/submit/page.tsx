import type { Metadata } from "next";
import Link from "next/link";
import SubmitAgencyForm from "@/app/components/SubmitAgencyForm";

export const metadata: Metadata = {
  title: "Submit Your Shopify Agency",
  description:
    "List your Shopify agency in our directory. Reach thousands of merchants looking for Shopify experts. Free to submit.",
  alternates: { canonical: "/submit" },
};

export default function SubmitAgencyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900">
            Shopify Agency Directory
          </Link>
          <Link href="/agencies" className="text-sm text-gray-500 hover:text-gray-900">
            Browse Agencies
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Free Listing
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Submit Your Shopify Agency
          </h1>
          <p className="mt-3 text-gray-600">
            Get discovered by thousands of merchants looking for Shopify
            experts. Listings are reviewed and published within 1–2 business
            days.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "🎯", title: "Targeted Traffic", desc: "Reach merchants actively looking for Shopify agencies" },
            { icon: "✅", title: "Verified Listing", desc: "Our review ensures quality and trust for all parties" },
            { icon: "💸", title: "100% Free", desc: "No fees to list — ever" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="text-2xl">{item.icon}</div>
              <p className="mt-2 text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-8">
          <SubmitAgencyForm />
        </div>
      </main>
    </div>
  );
}
