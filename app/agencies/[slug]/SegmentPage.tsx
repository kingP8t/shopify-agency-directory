import Link from "next/link";
import type { SegmentConfig } from "@/lib/segments";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AgencyLogo from "@/app/components/AgencyLogo";
import LeadForm from "@/app/components/LeadForm";

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getSegmentAgencies(
  filter: SegmentConfig["filter"]
): Promise<{ agencies: Agency[]; total: number }> {
  let query = supabase
    .from("agencies")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });

  if (filter.specialization) {
    query = query.contains("specializations", [filter.specialization]);
  }
  if (filter.budgets && filter.budgets.length > 0) {
    query = query.in("budget_range", filter.budgets);
  }
  if (filter.country) {
    query = query.eq("country", filter.country);
  }
  if (filter.location) {
    query = query.ilike("location", `%${filter.location}%`);
  }

  query = query.limit(20);

  const { data, error, count } = await query;
  if (error) {
    console.error("Segment agency fetch error:", error);
    return { agencies: [], total: 0 };
  }
  return { agencies: (data as Agency[]) ?? [], total: count ?? 0 };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default async function SegmentPage({
  segment,
}: {
  segment: SegmentConfig;
}) {
  const { agencies, total } = await getSegmentAgencies(segment.filter);

  // Build the directory URL for "see all" overflow link
  const dirParams = new URLSearchParams();
  if (segment.filter.specialization)
    dirParams.set("specialization", segment.filter.specialization);
  if (segment.filter.country) dirParams.set("country", segment.filter.country);
  if (segment.filter.location) dirParams.set("location", segment.filter.location);
  if (segment.filter.budgets && segment.filter.budgets.length === 1)
    dirParams.set("budget", segment.filter.budgets[0]);
  const directoryUrl = `/agencies${dirParams.toString() ? `?${dirParams.toString()}` : ""}`;

  // FAQ JSON-LD
  const faqSchema = segment.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: segment.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <SiteNav />

        <div className="mx-auto max-w-4xl px-6 py-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Agencies", href: "/agencies" },
              {
                name: segment.breadcrumbLabel,
                href: `/agencies/${segment.slug}`,
              },
            ]}
          />

          {/* Hero */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">{segment.h1}</h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
              {segment.intro}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {total} verified {total === 1 ? "agency" : "agencies"} matched
            </p>
          </div>

          {/* Agency cards */}
          <div className="mt-8 space-y-4">
            {agencies.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                <p className="text-gray-500">
                  No agencies found for this filter yet.
                </p>
                <Link
                  href="/agencies"
                  className="mt-3 inline-block text-sm text-green-600 hover:underline"
                >
                  Browse all agencies
                </Link>
              </div>
            ) : (
              agencies.map((agency) => (
                <Link
                  key={agency.id}
                  href={`/agencies/${agency.slug}`}
                  className="group flex gap-5 rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <AgencyLogo
                    name={agency.name}
                    website={agency.website}
                    size="md"
                  />
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
                              {" "}
                              ({agency.review_count})
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
              ))
            )}
          </div>

          {total > 20 && (
            <div className="mt-6 text-center">
              <Link
                href={directoryUrl}
                className="inline-block rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:border-gray-400 hover:shadow-sm"
              >
                See all {total} agencies →
              </Link>
            </div>
          )}

          {/* Get Matched CTA */}
          <div className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Not sure which agency to pick?
            </h2>
            <p className="mt-2 text-gray-600">
              Tell us about your project and we&apos;ll personally recommend the
              best 3 agencies for your needs, timeline, and budget. Free service,
              no spam.
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>

          {/* FAQ */}
          {segment.faq && segment.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
                {segment.faq.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border bg-white p-6 shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-900">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
