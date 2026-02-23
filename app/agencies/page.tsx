import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Browse Shopify Agencies",
  description:
    "Browse and compare the best Shopify agencies. Filter by specialization, budget, and location to find your perfect match.",
  alternates: { canonical: "/agencies" },
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

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 - $25,000",
  "$25,000 - $100,000",
  "$100,000+",
];

const PAGE_SIZE = 10;

async function getAgencies(
  params: {
    specialization?: string;
    budget?: string;
    location?: string;
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

  if (params.specialization) {
    query = query.contains("specializations", [params.specialization]);
  }
  if (params.budget) {
    query = query.eq("budget_range", params.budget);
  }
  if (params.location) {
    query = query.ilike("location", `%${params.location}%`);
  }
  if (params.search) {
    query = query.or(
      `name.ilike.%${params.search}%,description.ilike.%${params.search}%,location.ilike.%${params.search}%`
    );
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) {
    console.error("Error fetching agencies:", error);
    return { agencies: [], total: 0 };
  }
  return { agencies: (data as Agency[]) ?? [], total: count ?? 0 };
}

export default async function AgenciesPage({
  searchParams,
}: {
  searchParams: Promise<{
    specialization?: string;
    budget?: string;
    location?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const { agencies, total } = await getAgencies(params, page);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const activeFilters = [
    params.specialization,
    params.budget,
    params.location,
    params.search,
  ].filter(Boolean);

  // Build a query string preserving all current filters + new page
  function pageUrl(p: number) {
    const qs = new URLSearchParams();
    if (params.specialization) qs.set("specialization", params.specialization);
    if (params.budget) qs.set("budget", params.budget);
    if (params.location) qs.set("location", params.location);
    if (params.search) qs.set("search", params.search);
    if (p > 1) qs.set("page", String(p));
    const str = qs.toString();
    return `/agencies${str ? `?${str}` : ""}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="text-lg font-bold text-gray-900">
            Shopify Agency Directory
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900">
            ← Home
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full shrink-0 lg:w-64">
            <form method="GET" action="/agencies">
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

              {/* Specialization filter */}
              <div className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">Specialization</h2>
                <div className="mt-3 space-y-2">
                  {SPECIALIZATIONS.map((spec) => (
                    <label
                      key={spec}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="specialization"
                        value={spec}
                        defaultChecked={params.specialization === spec}
                        className="accent-green-600"
                      />
                      {spec}
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget filter */}
              <div className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">Budget Range</h2>
                <div className="mt-3 space-y-2">
                  {BUDGET_RANGES.map((budget) => (
                    <label
                      key={budget}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={budget}
                        defaultChecked={params.budget === budget}
                        className="accent-green-600"
                      />
                      {budget}
                    </label>
                  ))}
                </div>
              </div>

              {/* Location filter */}
              <div className="mt-4 rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">Location</h2>
                <input
                  type="text"
                  name="location"
                  defaultValue={params.location}
                  placeholder="City or country..."
                  className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Apply Filters
              </button>

              {activeFilters.length > 0 && (
                <a
                  href="/agencies"
                  className="mt-2 block text-center text-sm text-gray-500 hover:text-gray-900"
                >
                  Clear all filters
                </a>
              )}
            </form>
          </aside>

          {/* Main content */}
          <main className="flex-1">
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
                  {params.specialization && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {params.specialization}
                    </span>
                  )}
                  {params.budget && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {params.budget}
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
                <a
                  href="/agencies"
                  className="mt-3 inline-block text-sm text-green-600 hover:underline"
                >
                  Clear filters and browse all
                </a>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {agencies.map((agency) => (
                  <a
                    key={agency.id}
                    href={`/agencies/${agency.slug}`}
                    className="group flex gap-5 rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Logo placeholder */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-700">
                      {agency.name.charAt(0)}
                    </div>

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
                                {" "}({agency.review_count})
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
                  </a>
                ))}
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {/* Previous */}
                {hasPrev ? (
                  <a
                    href={pageUrl(page - 1)}
                    className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    ← Previous
                  </a>
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
                        <a
                          key={item}
                          href={pageUrl(item as number)}
                          className={`rounded-lg px-3 py-2 text-sm font-medium ${
                            item === page
                              ? "bg-green-600 text-white shadow-sm"
                              : "border bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item}
                        </a>
                      )
                    )}
                </div>

                {/* Next */}
                {hasNext ? (
                  <a
                    href={pageUrl(page + 1)}
                    className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Next →
                  </a>
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
  );
}
