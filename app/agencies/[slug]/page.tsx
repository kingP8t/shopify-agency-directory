import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateAgencyMetadata, generateAgencyJsonLd } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import LeadForm from "@/app/components/LeadForm";
import SiteNav from "@/app/components/SiteNav";
import ReviewForm from "@/app/components/ReviewForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AgencyLogo from "@/app/components/AgencyLogo";

interface Review {
  id: string;
  reviewer_name: string;
  body: string;
  rating: number;
  owner_reply: string | null;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getAgency(slug: string): Promise<Agency | null> {
  const { data, error } = await supabase
    .from("agencies")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as Agency;
}

async function getApprovedReviews(agencyId: string): Promise<Review[]> {
  const { data } = await supabase
    .from("reviews")
    .select("id, reviewer_name, body, rating, owner_reply, created_at")
    .eq("agency_id", agencyId)
    .eq("approved", true)
    .order("created_at", { ascending: false });
  return (data as Review[]) ?? [];
}

async function getAllSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from("agencies")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((row: { slug: string }) => row.slug);
}

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agency = await getAgency(slug);

  if (!agency) return { title: "Agency Not Found" };

  return generateAgencyMetadata({
    name: agency.name,
    slug: agency.slug,
    description: agency.description,
    location: agency.location ?? undefined,
    specializations: agency.specializations ?? undefined,
  });
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function AgencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agency = await getAgency(slug);

  if (!agency) notFound();

  const reviews = await getApprovedReviews(agency.id);

  const jsonLd = generateAgencyJsonLd({
    name: agency.name,
    slug: agency.slug,
    description: agency.description,
    location: agency.location ?? undefined,
    website: agency.website ?? undefined,
    founded: agency.founded ?? undefined,
    specializations: agency.specializations ?? undefined,
    rating: agency.rating ?? undefined,
    reviewCount: agency.review_count ?? undefined,
    // Pass approved reviews so they appear in structured data
    reviews: reviews.map((r) => ({
      reviewer_name: r.reviewer_name,
      body: r.body,
      rating: r.rating,
      created_at: r.created_at,
    })),
  });

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        <SiteNav />

        <main className="mx-auto max-w-4xl px-6 py-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Agencies", href: "/agencies" },
              { name: agency.name, href: `/agencies/${agency.slug}` },
            ]}
          />
          {/* Header card */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-5">
                {/* Logo */}
                <AgencyLogo
                  name={agency.name}
                  website={agency.website}
                  size="lg"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {agency.name}
                    </h1>
                    {agency.featured && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Featured
                      </span>
                    )}
                  </div>
                  {agency.location && (
                    <p className="mt-1 text-gray-500">📍 {agency.location}</p>
                  )}
                  {agency.rating && (
                    <p className="mt-1 text-sm text-gray-600">
                      ⭐ {agency.rating}{" "}
                      <span className="text-gray-400">
                        ({agency.review_count} reviews)
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                {agency.website && (
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400"
                  >
                    Visit Website ↗
                  </a>
                )}
                {!agency.claimed_at && (
                  <a
                    href={`/agencies/${agency.slug}/claim`}
                    className="rounded-lg border border-dashed border-gray-300 px-4 py-2 text-xs text-gray-400 hover:border-green-400 hover:text-green-600"
                  >
                    Is this your agency? Claim it →
                  </a>
                )}
                {agency.claimed_at && (
                  <span className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-xs font-medium text-green-700">
                    ✓ Verified Owner
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-gray-700">
              {agency.description}
            </p>

            {/* Specialization tags */}
            {agency.specializations && agency.specializations.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {agency.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stats grid */}
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {agency.founded && (
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Founded
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {agency.founded}
                </p>
              </div>
            )}
            {agency.team_size && (
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Team Size
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {agency.team_size}
                </p>
              </div>
            )}
            {agency.budget_range && (
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Project Budget
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {agency.budget_range}
                </p>
              </div>
            )}
          </div>

          {/* About / long description */}
          {agency.long_description && (
            <div className="mt-5 rounded-2xl border bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-gray-700">
                {agency.long_description.split("\n\n").map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="mt-5 rounded-2xl border bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Reviews
                {reviews.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({reviews.length})
                  </span>
                )}
              </h2>
              {agency.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="font-semibold text-gray-900">{agency.rating}</span>
                  <span className="text-gray-400">/ 5</span>
                </div>
              )}
            </div>

            {reviews.length > 0 ? (
              <ul className="mt-6 divide-y divide-gray-100">
                {reviews.map((review) => (
                  <li key={review.id} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-gray-900">{review.reviewer_name}</p>
                        <div className="mt-0.5 flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={star <= review.rating ? "text-yellow-400" : "text-gray-200"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <time className="shrink-0 text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.body}</p>
                    {review.owner_reply && (
                      <div className="mt-3 rounded-lg border-l-2 border-green-400 bg-gray-50 px-4 py-3">
                        <p className="text-xs font-medium text-gray-500">
                          Response from {agency.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {review.owner_reply}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-gray-400">
                No reviews yet — be the first to leave one below.
              </p>
            )}

            {/* Leave a review */}
            <div className="mt-8 border-t pt-6">
              <h3 className="mb-4 font-semibold text-gray-900">Leave a Review</h3>
              <ReviewForm agencyId={agency.id} agencyName={agency.name} />
            </div>
          </div>

          {/* Contact / Lead form */}
          <div className="mt-5 rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Contact {agency.name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in your details and we&apos;ll connect you directly.
            </p>
            <div className="mt-6">
              <LeadForm agencyId={agency.id} agencyName={agency.name} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
