import Link from "next/link";
import EmailCapture from "./EmailCapture";

const FOOTER_LINKS = {
  Directory: [
    { href: "/agencies", label: "Browse All Agencies" },
    { href: "/agencies/shopify-plus", label: "Shopify Plus Agencies" },
    { href: "/agencies/migration", label: "Migration Specialists" },
    { href: "/agencies/ecommerce-seo", label: "SEO Agencies" },
    { href: "/agencies/headless", label: "Headless Agencies" },
    { href: "/agencies/theme-development", label: "Theme Development" },
    { href: "/agencies/under-25k", label: "Under $25k Budget" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/get-matched", label: "Get Matched — Free" },
    { href: "/submit", label: "List Your Agency" },
    { href: "/about", label: "How We Verify Agencies" },
  ],
  Locations: [
    { href: "/agencies/united-states", label: "United States" },
    { href: "/agencies/australia", label: "Australia" },
    { href: "/agencies/canada", label: "Canada" },
    { href: "/agencies/london", label: "London" },
    { href: "/agencies/new-york", label: "New York" },
    { href: "/agencies/los-angeles", label: "Los Angeles" },
  ],
};

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16">
      {/* Email capture band */}
      <div className="bg-green-700">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-sm">
              <p className="text-lg font-bold text-white">
                Free: Agency Hiring Checklist
              </p>
              <p className="mt-1 text-sm text-green-200">
                10 questions every merchant should ask before signing a contract.
                Used by 2,000+ store owners.
              </p>
            </div>
            <div className="w-full sm:max-w-md">
              <EmailCapture source="footer" />
            </div>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="border-t bg-gray-900">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-1">
              <Link href="/" className="text-base font-bold text-white">
                Shopify Agency Directory
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                The independent directory for finding and comparing verified
                Shopify agencies worldwide.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {heading}
                </p>
                <ul className="mt-3 space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-gray-800 pt-6 text-xs text-gray-600 sm:flex-row sm:items-center">
            <p>© {year} Shopify Agency Directory. Independent — not affiliated with Shopify Inc.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-400">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-400">Terms</Link>
              <Link href="/submit" className="hover:text-gray-400">Submit Agency</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
