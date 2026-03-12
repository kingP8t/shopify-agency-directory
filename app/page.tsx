import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import HeroSearch from "@/app/components/HeroSearch";
import SiteNav from "@/app/components/SiteNav";
import { generateWebSiteJsonLd, generateOrganizationJsonLd } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Shopify Agency Directory | Find Top Shopify Experts",
  description:
    "Find and compare the best Shopify agencies. Browse verified Shopify partners by specialization, budget, and location.",
  alternates: { canonical: "/" },
};


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

async function getReviewCount(): Promise<number> {
  const { count } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("approved", true);
  return count ?? 0;
}

async function getAverageRating(): Promise<number | null> {
  const { data } = await supabase
    .from("agencies")
    .select("rating")
    .eq("status", "published")
    .not("rating", "is", null);
  if (!data || data.length === 0) return null;
  const avg =
    data.reduce((sum: number, a: { rating: number | null }) => sum + (a.rating ?? 0), 0) /
    data.length;
  return Math.round(avg * 10) / 10;
}

async function getCountryCount(): Promise<number> {
  const { data } = await supabase
    .from("agencies")
    .select("country")
    .eq("status", "published")
    .not("country", "is", null);
  if (!data) return 0;
  return new Set(data.map((r: { country: string }) => r.country).filter(Boolean)).size;
}

export default async function HomePage() {
  const [featuredAgencies, agencyCount, reviewCount, avgRating, countryCount] = await Promise.all([
    getFeaturedAgencies(),
    getAgencyCount(),
    getReviewCount(),
    getAverageRating(),
    getCountryCount(),
  ]);

  const webSiteSchema = generateWebSiteJsonLd();
  const orgSchema = generateOrganizationJsonLd();
  const recentPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    <div className="min-h-screen bg-gray-50">
      <SiteNav />

      {/* Hero */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {agencyCount > 0 ? `${agencyCount}+` : "100+"} Verified Agencies · Free Matching
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Find the Perfect{" "}
            <span className="text-green-600">Shopify Agency</span>
            <br />
            for Your Business
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Tell us about your project and we&apos;ll personally match you with
            the right Shopify agency — free, fast, and unbiased.
          </p>

          {/* Primary CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/get-matched"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-green-700"
            >
              Get Matched — Free
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/agencies"
              className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            >
              Browse Directory
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
              {"★★★★★"}
            </span>
            <span>
              Trusted by <span className="font-semibold text-gray-700">3,000+</span> merchants worldwide
            </span>
          </div>

          {/* Secondary: direct search */}
          <div className="mt-8 border-t pt-6">
            <p className="mb-3 text-sm text-gray-400">Or search directly</p>
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Quick filters */}
      <section className="border-y border-gray-100 bg-gray-50 px-6 py-5">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">

            {/* Region */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Region</span>
              {(
                [
                  { label: "US Agencies",        href: "/agencies?country=US" },
                  { label: "UK Agencies",        href: "/agencies?country=GB" },
                  { label: "Australian Agencies",href: "/agencies?country=AU" },
                  { label: "Canadian Agencies",  href: "/agencies?country=CA" },
                ] as { label: string; href: string }[]
              ).map(({ label, href }) => (
                <a key={label} href={href}
                  className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm hover:border-green-500 hover:text-green-700">
                  {label}
                </a>
              ))}
            </div>

            <div className="hidden h-5 w-px bg-gray-200 sm:block" aria-hidden="true" />

            {/* Budget */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Budget</span>
              {(
                [
                  { label: "Under $5k",     href: `/agencies?budget=${encodeURIComponent("Under $5,000")}` },
                  { label: "Under $25k",    href: `/agencies?budget=${encodeURIComponent("$5,000 - $25,000")}` },
                  { label: "Enterprise",    href: `/agencies?budget=${encodeURIComponent("$100,000+")}` },
                ] as { label: string; href: string }[]
              ).map(({ label, href }) => (
                <a key={label} href={href}
                  className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm hover:border-green-500 hover:text-green-700">
                  {label}
                </a>
              ))}
            </div>

            <div className="hidden h-5 w-px bg-gray-200 sm:block" aria-hidden="true" />

            {/* Service */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Service</span>
              {(
                [
                  { label: "Shopify Plus", href: "/agencies?specialization=Shopify+Plus" },
                  { label: "Store Build",  href: "/agencies?specialization=Store+Build" },
                  { label: "CRO",          href: "/agencies?specialization=CRO" },
                  { label: "Migrations",   href: "/agencies?specialization=Migrations" },
                  { label: "Headless",     href: "/agencies?specialization=Headless" },
                ] as { label: string; href: string }[]
              ).map(({ label, href }) => (
                <a key={label} href={href}
                  className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm hover:border-green-500 hover:text-green-700">
                  {label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* How matching works */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">How the free matching works</h2>
            <p className="mt-2 text-sm text-gray-500">Takes 2 minutes · No obligation · Results in 24 hours</p>
          </div>

          <div className="relative mt-10">
            {/* Connecting line (desktop only) */}
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gray-200 sm:block" aria-hidden="true" />

            <ol className="relative grid gap-8 sm:grid-cols-3">
              {(
                [
                  {
                    step: "1",
                    title: "Tell us your needs",
                    body: "Share your budget, timeline, and what you're building. The form takes about 2 minutes.",
                  },
                  {
                    step: "2",
                    title: "We review your brief",
                    body: "Our team matches your project against 900+ verified agencies — by specialization, budget, and location.",
                  },
                  {
                    step: "3",
                    title: "Get 3 curated picks",
                    body: "You receive 3 hand-picked agency introductions within 24 hours. No spam, no cold calls.",
                  },
                ] as { step: string; title: string; body: string }[]
              ).map(({ step, title, body }) => (
                <li key={step} className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-base font-bold text-white shadow-sm">
                    {step}
                  </span>
                  <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/get-matched"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-green-700"
            >
              Get Matched — Free
              <span aria-hidden="true">→</span>
            </a>
            <p className="mt-3 text-xs text-gray-400">Free service · We never share your details without permission</p>
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
            <Link
              href="/agencies"
              className="text-sm text-green-600 hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAgencies.map((agency) => (
              <Link
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
                      <span className="text-gray-400">on Shopify</span>
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
              </Link>
            ))}

            {/* Filler card */}
            <Link
              href="/agencies"
              className="flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-400 hover:border-green-300 hover:text-green-600"
            >
              Browse all agencies →
            </Link>
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
            {reviewCount > 0 ? (
              <>
                <p className="text-3xl font-bold">{reviewCount}+</p>
                <p className="mt-1 text-green-100">Verified Reviews</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold">{countryCount > 0 ? `${countryCount}` : "50+"}</p>
                <p className="mt-1 text-green-100">Countries Served</p>
              </>
            )}
          </div>
          <div>
            {avgRating ? (
              <>
                <p className="text-3xl font-bold">{avgRating}★</p>
                <p className="mt-1 text-green-100">Average Rating</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold">100%</p>
                <p className="mt-1 text-green-100">Free to List</p>
              </>
            )}
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

      {/* Blog preview */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              From the Blog
            </h2>
            <Link href="/blog" className="text-sm text-green-600 hover:underline">
              View all articles →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  {post.category}
                </span>
                <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-green-700">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-xs text-gray-400">
                  {post.readingTime} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
