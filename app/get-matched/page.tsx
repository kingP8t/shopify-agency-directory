import type { Metadata } from "next";
import LeadForm from "@/app/components/LeadForm";

export const metadata: Metadata = {
  title: "Get Matched with a Shopify Agency",
  description:
    "Tell us about your project and we'll connect you with the best Shopify agency for your needs and budget.",
  alternates: { canonical: "/get-matched" },
};

export default function GetMatchedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="text-lg font-bold text-gray-900">
            Shopify Agency Directory
          </a>
          <a href="/agencies" className="text-sm text-gray-500 hover:text-gray-900">
            Browse Agencies
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-16">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Free Service
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Get Matched with the Right Shopify Agency
          </h1>
          <p className="mt-3 text-gray-600">
            Tell us about your project and we&apos;ll personally connect you with
            the best agency for your needs, timeline, and budget. No spam, ever.
          </p>
        </div>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "⚡", label: "Response in 24hrs" },
            { icon: "🎯", label: "Curated Matches" },
            { icon: "🔒", label: "No Spam" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="mt-1 text-xs font-medium text-gray-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
          <LeadForm />
        </div>
      </main>
    </div>
  );
}
