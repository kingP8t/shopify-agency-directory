import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Shopify Agency Directory — how we collect, use, and protect your data.",
};

const SITE = "Shopify Agency Directory";
const CONTACT_EMAIL = process.env.ADMIN_EMAIL ?? "hello@shopifyagencydirectory.com";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900">
            {SITE}
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
            ← Home
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-400">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="prose prose-gray mt-8 max-w-none space-y-8 text-gray-700">

            <section>
              <h2 className="text-lg font-semibold text-gray-900">1. Who We Are</h2>
              <p className="mt-2 leading-relaxed">
                {SITE} operates a directory of Shopify agencies to help merchants find the right partner for their projects. We are committed to protecting your personal information and being transparent about how we use it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">2. Information We Collect</h2>
              <p className="mt-2 leading-relaxed">We collect information you provide directly when you:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li><strong>Submit an enquiry</strong> — name, email, company, budget, and project message</li>
                <li><strong>Submit your agency</strong> — agency name, description, website, location, and contact email</li>
                <li><strong>Leave a review</strong> — your name and review content</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                We also collect standard server logs including IP addresses and browser information when you visit our site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">3. How We Use Your Information</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>To connect merchants with Shopify agencies matching their requirements</li>
                <li>To review and approve agency listings and reviews</li>
                <li>To improve the directory and user experience</li>
                <li>To send you transactional communications related to your submission</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                We do <strong>not</strong> sell your personal data to third parties or use it for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">4. Data Storage</h2>
              <p className="mt-2 leading-relaxed">
                Your data is stored securely in Supabase (PostgreSQL) hosted on AWS. All data is encrypted at rest and in transit. We retain form submissions for up to 2 years unless you request deletion earlier.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">5. Cookies</h2>
              <p className="mt-2 leading-relaxed">
                We use a single session cookie (<code className="rounded bg-gray-100 px-1 text-sm">admin_session</code>) for admin authentication only. We do not use tracking cookies or third-party advertising cookies. We do not use Google Analytics or Facebook Pixel.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">6. Your Rights</h2>
              <p className="mt-2 leading-relaxed">You have the right to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to our processing of your data</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                To exercise any of these rights, please email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">7. Contact</h2>
              <p className="mt-2 leading-relaxed">
                If you have any questions about this privacy policy, please contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white px-6 py-6 text-center text-sm text-gray-400">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE}</p>
          <div className="flex justify-center gap-4">
            <Link href="/privacy" className="text-green-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
