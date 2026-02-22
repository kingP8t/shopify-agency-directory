import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import HeroSearch from "@/app/components/HeroSearch";

export const metadata: Metadata = {
  title: "Shopify Agency Directory | Find Top Shopify Experts",
  description:
    "Find and compare the best Shopify agencies. Browse verified Shopify partners by specialization, budget, and location.",
  alternates: { canonical: "/" },
};

const SPECIALIZATIONS = [
  "Shopify Plus",
  "Theme Development",
  "Migrations",
  "CRO",
  "Headless",
  "App Development",
  "SEO",
  "Marketing",
];

async function getFeaturedAgencies(): Promise<Agency[]> {
  const { data, error } = await supabase
    .from("agencies")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("rating", { ascending: false })
    .limit(6);

  if (error) return [];
  return (data as Agency[]) ?? [];
}

async function getAgencyCount(): Promise<number> {
  const { count } = await supabase
    .from("agencies")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");
  return count ?? 0;
}

export default async function HomePage() {
  const [featuredAgencies, agencyCount] = await Promise.all([
    getFeaturedAgencies(),
    getAgencyCount(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="text-lg font-bold text-gray-900">
            Shopify Agency Directory
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/agencies" className="text-gray-600 hover:text-gray-900">
              Browse Agencies
            </a>
            <a href="/submit" className="text-gray-600 hover:text-gray-900">
              List Your Agency
            </a>
            <a
              href="/get-matched"
              className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
            >
              Get Matched
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {agencyCount > 0 ? `${agencyCount}+` : "100+"} Verified Agencies
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Find the Perfect{" "}
            <span className="text-green-600">Shopify Agency</span>
            <br />
            for Your Business
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Browse our curated directory of top Shopify agencies. Filter by
            specialization, budget, and location to find your perfect match.
          </p>

          {/* Live search */}
          <HeroSearch />

          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
            <a href="/get-matched" className="text-green-600 hover:underline">
              Not sure where to start? Get matched →
            </a>
          </div>
        </div>
      </section>

      {/* Browse by specialization */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold text-gray-900">
            Browse by Specialization
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {SPECIALIZATIONS.map((spec) => (
              <a
                key={spec}
                href={`/agencies?specialization=${encodeURIComponent(spec)}`}
                className="rounded-full border bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:border-green-500 hover:text-green-700"
              >
                {spec}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured agencies */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Featured Agencies
            </h2>
            <a
              href="/agencies"
              className="text-sm text-green-600 hover:underline"
            >
              View all →
            </a>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAgencies.map((agency) => (
              <a
                key={agency.id}
                href={`/agencies/${agency.slug}`}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-lg font-bold text-green-700">
                    {agency.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                      {agency.name}
                    </h3>
                    <p className="text-sm text-gray-500">{agency.location}</p>
                  </div>
                </div>

                {agency.specializations && agency.specializations.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {agency.specializations.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between text-sm">
                  {agency.rating ? (
                    <span className="text-gray-500">
                      ⭐ {agency.rating}{" "}
                      <span className="text-gray-400">
                        ({agency.review_count})
                      </span>
                    </span>
                  ) : (
                    <span />
                  )}
                  {agency.budget_range && (
                    <span className="font-medium text-gray-700">
                      {agency.budget_range}
                    </span>
                  )}
                </div>
              </a>
            ))}

            {/* Filler card */}
            <a
              href="/agencies"
              className="flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-400 hover:border-green-300 hover:text-green-600"
            >
              Browse all agencies →
            </a>
          </div>
        </div>
      </section>

      {/* Stats / trust bar */}
      <section className="mt-8 bg-green-600 px-6 py-12 text-white">
        <div className="mx-auto grid max-w-4xl gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="text-3xl font-bold">
              {agencyCount > 0 ? `${agencyCount}+` : "100+"}
            </p>
            <p className="mt-1 text-green-100">Verified Agencies</p>
          </div>
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p className="mt-1 text-green-100">Projects Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold">4.8★</p>
            <p className="mt-1 text-green-100">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Two CTAs side by side */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {/* For merchants */}
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            <div className="text-3xl">🔍</div>
            <h2 className="mt-3 text-xl font-bold text-gray-900">
              Looking for an agency?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Tell us about your project and we&apos;ll personally match you
              with the best Shopify agency for your needs.
            </p>
            <a
              href="/get-matched"
              className="mt-5 inline-block rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700"
            >
              Get Matched — Free
            </a>
          </div>

          {/* For agencies */}
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            <div className="text-3xl">🏢</div>
            <h2 className="mt-3 text-xl font-bold text-gray-900">
              Are you a Shopify agency?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Get discovered by thousands of merchants. List your agency in
              our directory — completely free.
            </p>
            <a
              href="/submit"
              className="mt-5 inline-block rounded-lg border border-green-600 px-6 py-2.5 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              Submit Your Agency →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-6 py-8 text-center text-sm text-gray-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="font-medium text-gray-900">Shopify Agency Directory</p>
          <div className="flex gap-6">
            <a href="/agencies" className="hover:text-gray-900">Browse Agencies</a>
            <a href="/submit" className="hover:text-gray-900">List Your Agency</a>
            <a href="/get-matched" className="hover:text-gray-900">Get Matched</a>
          </div>
          <p>© {new Date().getFullYear()} Shopify Agency Directory</p>
        </div>
      </footer>
    </div>
  );
}
