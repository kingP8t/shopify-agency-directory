import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Shopify Agency Directory.",
  robots: { index: false, follow: false },
};

const SITE = "Shopify Agency Directory";
const CONTACT_EMAIL = process.env.ADMIN_EMAIL ?? "hello@shopifyagencydirectory.com";

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-400">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="prose prose-gray mt-8 max-w-none space-y-8 text-gray-700">

            <section>
              <h2 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h2>
              <p className="mt-2 leading-relaxed">
                By accessing and using {SITE}, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">2. What We Provide</h2>
              <p className="mt-2 leading-relaxed">
                {SITE} is a directory that lists Shopify agencies to help merchants find suitable development and marketing partners. We do not endorse, guarantee, or take responsibility for the quality of services provided by listed agencies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">3. Agency Listings</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Agencies may submit themselves for listing free of charge</li>
                <li>All submissions are subject to review and approval at our discretion</li>
                <li>We reserve the right to remove or edit listings that contain inaccurate or misleading information</li>
                <li>Being listed does not imply endorsement or recommendation by {SITE}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">4. Enquiry Forms</h2>
              <p className="mt-2 leading-relaxed">
                When you submit an enquiry through our Get Matched form or contact an agency directly, you agree that your contact information and project details may be shared with relevant Shopify agencies for the purpose of connecting you with appropriate services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">5. Reviews</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Reviews must be honest and based on genuine experiences</li>
                <li>Fake, defamatory, or misleading reviews are strictly prohibited</li>
                <li>We reserve the right to remove reviews that violate these terms</li>
                <li>All reviews are moderated before publication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">6. Intellectual Property</h2>
              <p className="mt-2 leading-relaxed">
                The content, design, and code of {SITE} are our intellectual property. Agency names, logos, and descriptions remain the property of the respective agencies. You may not reproduce or republish directory content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">7. Limitation of Liability</h2>
              <p className="mt-2 leading-relaxed">
                {SITE} is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any damages arising from your use of the directory or from engaging with agencies found through our platform. Any contracts or agreements you make with agencies listed here are solely between you and the agency.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">8. Changes to These Terms</h2>
              <p className="mt-2 leading-relaxed">
                We may update these terms from time to time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">9. Contact</h2>
              <p className="mt-2 leading-relaxed">
                For any questions about these Terms of Service, please contact us at{" "}
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
            <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link href="/terms" className="text-green-600">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
