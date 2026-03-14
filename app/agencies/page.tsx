import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AgencyLogo from "@/app/components/AgencyLogo";
import MobileFilterDrawer from "@/app/components/MobileFilterDrawer";
import { generateAgencyListJsonLd, generateDirectoryMetadata } from "@/lib/seo";
import { logError } from "@/lib/logger";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const specialization = typeof params.specialization === "string" ? params.specialization : undefined;
  const country = typeof params.country === "string" ? params.country : undefined;
  return generateDirectoryMetadata(page, {
    specialization,
    location: country,
  });
}

const SPECIALIZATIONS = [
  "Store Build",
  "Theme Development",
  "Migrations",
  "App Development",
  "CRO",
  "Marketing",
  "SEO",
  "Headless",
];

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 - $25,000",
  "$25,000 - $100,000",
  "$100,000+",
];

// ISO 3166-1 alpha-2 → display name for all countries in our DB
const COUNTRY_NAMES: Record<string, string> = {
  AE: "United Arab Emirates",
  AR: "Argentina",
  AT: "Austria",
  AU: "Australia",
  BD: "Bangladesh",
  BE: "Belgium",
  BG: "Bulgaria",
  BR: "Brazil",
  CA: "Canada",
  CH: "Switzerland",
  CL: "Chile",
  CO: "Colombia",
  CZ: "Czech Republic",
  DE: "Germany",
  DK: "Denmark",
  EG: "Egypt",
  ES: "Spain",
  FI: "Finland",
  FR: "France",
  GB: "United Kingdom",
  GH: "Ghana",
  GR: "Greece",
  HK: "Hong Kong",
  HR: "Croatia",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IN: "India",
  IT: "Italy",
  JP: "Japan",
  KE: "Kenya",
  KR: "South Korea",
  LT: "Lithuania",
  LV: "Latvia",
  MX: "Mexico",
  MY: "Malaysia",
  NG: "Nigeria",
  NL: "Netherlands",
  NO: "Norway",
  NZ: "New Zealand",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PT: "Portugal",
  RO: "Romania",
  RS: "Serbia",
  SE: "Sweden",
  SG: "Singapore",
  SK: "Slovakia",
  TH: "Thailand",
  TR: "Türkiye",
  UA: "Ukraine",
  US: "United States",
  ZA: "South Africa",
  ZW: "Zimbabwe",
};

const PAGE_SIZE = 10;

/** Coerce string | string[] | undefined → string[] */
function toArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

// ─── Fetch distinct countries with agency counts ──────────────────────────────
async function getCountries(): Promise<
  Array<{ code: string; name: string; count: number }>
> {
  const { data } = await supabase
    .from("agencies")
    .select("country")
    .eq("status", "published")
    .not("country", "is", null);

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    if (row.country) counts[row.country] = (counts[row.country] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([code, count]) => ({
      code,
      name: COUNTRY_NAMES[code] ?? code,
      count,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

// ─── Shared filter fields (used in desktop sidebar + mobile drawer) ──────────
function FilterFields({
  params,
  selectedSpecs,
  selectedBudgets,
  countries,
}: {
  params: { search?: string; country?: string; location?: string };
  selectedSpecs: string[];
  selectedBudgets: string[];
  countries: Array<{ code: string; name: string; count: number }>;
}) {
  return (
    <>
      {/* Search */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900">Search</h2>
        <input
          type="text"
          name="search"
          defaultValue={params.search}
          placeholder="Agency name, service..."
          className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Specialization */}
      <div className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900">Specialization</h2>
        <div className="mt-3 space-y-2">
          {SPECIALIZATIONS.map((spec) => (
            <label
              key={spec}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                name="specialization"
                value={spec}
                defaultChecked={selectedSpecs.includes(spec)}
                className="accent-green-600"
              />
              {spec}
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900">Budget Range</h2>
        <div className="mt-3 space-y-2">
          {BUDGET_RANGES.map((budget) => (
            <label
              key={budget}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                name="budget"
                value={budget}
                defaultChecked={selectedBudgets.includes(budget)}
                className="accent-green-600"
              />
              {budget}
            </label>
          ))}
        </div>
      </div>

      {/* Country */}
      <div className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900">Country</h2>
        <select
          name="country"
          defaultValue={params.country ?? ""}
          className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <option value="">All countries</option>
          {countries.map(({ code, name, count }) => (
            <option key={code} value={code}>
              {name} ({count})
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900">City</h2>
        <input
          type="text"
          name="location"
          defaultValue={params.location}
          placeholder="e.g. London, New York..."
          className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>
    </>
  );
}

// ─── Fetch agencies with all filters ─────────────────────────────────────────
async function getAgencies(
  params: {
    specializations: string[];
    budgets: string[];
    location?: string;
    country?: string;
    search?: string;
  },
  page: number
): Promise<{ agencies: Agency[]; total: number }> {
  let query = supabase
    .from("agencies")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });

  if (params.specializations.length > 0) {
    // overlaps = has ANY of the selected specializations (OR logic)
    query = query.overlaps("specializations", params.specializations);
  }
  if (params.budgets.length > 0) {
    query = query.in("budget_range", params.budgets);
  }
  if (params.country) {
    query = query.eq("country", params.country);
  }
  if (params.location) {
    query = query.ilike("location", `%${params.location}%`);
  }
  if (params.search) {
    // Escape ILIKE wildcards and strip chars that break PostgREST OR filter strings
    const safe = params.search
      .replace(/[%_]/g, "\\$&")   // escape wildcard chars
      .replace(/[,.()'"`]/g, " ") // strip PostgREST filter syntax chars
      .trim()
      .slice(0, 100);             // cap length
    if (safe) {
      query = query.or(
        `name.ilike.%${safe}%,description.ilike.%${safe}%,location.ilike.%${safe}%`
      );
    }
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) {
    logError("agencies-fetch", error);
    return { agencies: [], total: 0 };
  }
  return { agencies: (data as Agency[]) ?? [], total: count ?? 0 };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function AgenciesPage({
  searchParams,
}: {
  searchParams: Promise<{
    specialization?: string | string[];
    budget?: string | string[];
    location?: string;
    country?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const selectedSpecs = toArray(params.specialization);
  const selectedBudgets = toArray(params.budget);

  // Fetch agencies + country list in parallel
  const [{ agencies, total }, countries] = await Promise.all([
    getAgencies(
      {
        specializations: selectedSpecs,
        budgets: selectedBudgets,
        location: params.location,
        country: params.country,
        search: params.search,
      },
      page
    ),
    getCountries(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const activeFilters = [
    ...selectedSpecs,
    ...selectedBudgets,
    params.country,
    params.location,
    params.search,
  ].filter(Boolean);

  // Build a query string preserving all current filters + new page
  function pageUrl(p: number) {
    const qs = new URLSearchParams();
    for (const s of selectedSpecs) qs.append("specialization", s);
    for (const b of selectedBudgets) qs.append("budget", b);
    if (params.country) qs.set("country", params.country);
    if (params.location) qs.set("location", params.location);
    if (params.search) qs.set("search", params.search);
    if (p > 1) qs.set("page", String(p));
    const str = qs.toString();
    return `/agencies${str ? `?${str}` : ""}`;
  }

  // Resolve selected country display name for the active filter chip
  const selectedCountryName = params.country
    ? (countries.find((c) => c.code === params.country)?.name ?? params.country)
    : null;

  const listSchema = generateAgencyListJsonLd(
    agencies.map((a) => ({
      name: a.name,
      slug: a.slug,
      description: a.description,
      rating: a.rating,
      reviewCount: a.review_count,
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        <SiteNav />

        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Mobile filter drawer — visible only below lg breakpoint */}
          <MobileFilterDrawer activeFilterCount={activeFilters.length}>
            <form method="GET" action="/agencies">
              <FilterFields
                params={params}
                selectedSpecs={selectedSpecs}
                selectedBudgets={selectedBudgets}
                countries={countries}
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Apply Filters
              </button>
              {activeFilters.length > 0 && (
                <Link
                  href="/agencies"
                  className="mt-2 block text-center text-sm text-gray-500 hover:text-gray-900"
                >
                  Clear all filters
                </Link>
              )}
            </form>
          </MobileFilterDrawer>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* ── Sidebar filters (desktop only) ── */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <form method="GET" action="/agencies">
                <FilterFields
                  params={params}
                  selectedSpecs={selectedSpecs}
                  selectedBudgets={selectedBudgets}
                  countries={countries}
                />
                <button
                  type="submit"
                  className="mt-4 w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Apply Filters
                </button>

                {activeFilters.length > 0 && (
                  <Link
                    href="/agencies"
                    className="mt-2 block text-center text-sm text-gray-500 hover:text-gray-900"
                  >
                    Clear all filters
                  </Link>
                )}
              </form>
            </aside>

            {/* ── Main content ── */}
            <main className="flex-1">
              <Breadcrumbs
                items={[
                  { name: "Home", href: "/" },
                  { name: "Agencies", href: "/agencies" },
                ]}
              />

              {/* Header row */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {activeFilters.length > 0 ? "Filtered Results" : "All Agencies"}
                  </h1>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {total} {total === 1 ? "agency" : "agencies"} found
                    {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
                  </p>
                </div>

                {/* Active filter chips */}
                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecs.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                      >
                        {s}
                      </span>
                    ))}
                    {selectedBudgets.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                      >
                        {b}
                      </span>
                    ))}
                    {selectedCountryName && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {selectedCountryName}
                      </span>
                    )}
                    {params.location && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {params.location}
                      </span>
                    )}
                    {params.search && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        &ldquo;{params.search}&rdquo;
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Agency cards */}
              {agencies.length === 0 ? (
                <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                  <p className="text-gray-500">
                    No agencies found matching your filters.
                  </p>
                  <Link
                    href="/agencies"
                    className="mt-3 inline-block text-sm text-green-600 hover:underline"
                  >
                    Clear filters and browse all
                  </Link>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {agencies.map((agency) => (
                    <Link
                      key={agency.id}
                      href={`/agencies/${agency.slug}`}
                      className="group flex gap-5 rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* Logo */}
                      <AgencyLogo
                        name={agency.name}
                        website={agency.website}
                        size="md"
                      />

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="font-semibold text-gray-900 group-hover:text-green-700">
                                {agency.name}
                              </h2>
                              {agency.featured && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                  Featured
                                </span>
                              )}
                            </div>
                            {agency.location && (
                              <p className="text-sm text-gray-500">
                                📍 {agency.location}
                              </p>
                            )}
                          </div>

                          <div className="shrink-0 text-right">
                            {agency.rating && (
                              <p className="text-sm font-medium text-gray-900">
                                ⭐ {agency.rating}
                                <span className="font-normal text-gray-400">
                                  {" "}on Shopify
                                </span>
                              </p>
                            )}
                            {agency.budget_range && (
                              <p className="mt-0.5 text-xs text-gray-500">
                                {agency.budget_range}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                          {agency.description}
                        </p>

                        {agency.specializations &&
                          agency.specializations.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {agency.specializations.map((spec) => (
                                <span
                                  key={spec}
                                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {/* Previous */}
                  {hasPrev ? (
                    <Link
                      href={pageUrl(page - 1)}
                      className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <span className="rounded-lg border bg-gray-50 px-4 py-2 text-sm font-medium text-gray-300 cursor-not-allowed">
                      ← Previous
                    </span>
                  )}

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPages ||
                          Math.abs(p - page) <= 1
                      )
                      .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                          acc.push("...");
                        }
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        item === "..." ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                            …
                          </span>
                        ) : (
                          <Link
                            key={item}
                            href={pageUrl(item as number)}
                            className={`rounded-lg px-3 py-2 text-sm font-medium ${
                              item === page
                                ? "bg-green-600 text-white shadow-sm"
                                : "border bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {item}
                          </Link>
                        )
                      )}
                  </div>

                  {/* Next */}
                  {hasNext ? (
                    <Link
                      href={pageUrl(page + 1)}
                      className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className="rounded-lg border bg-gray-50 px-4 py-2 text-sm font-medium text-gray-300 cursor-not-allowed">
                      Next →
                    </span>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
