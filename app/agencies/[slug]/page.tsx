import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateAgencyMetadata, generateAgencyJsonLd, generateProfilePageJsonLd } from "@/lib/seo";
import { countryName } from "@/lib/countries";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import { getSegment, SEGMENT_SLUGS } from "@/lib/segments";
import SegmentPage from "./SegmentPage";
import LeadForm from "@/app/components/LeadForm";
import SiteNav from "@/app/components/SiteNav";
import ReviewForm from "@/app/components/ReviewForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AgencyLogo from "@/app/components/AgencyLogo";
import BadgePreview from "@/app/components/BadgePreview";

// ---------------------------------------------------------------------------
// Service metadata + "best for" inference
// ---------------------------------------------------------------------------

const SPEC_META: Record<string, { icon: string; description: string }> = {
  "Store Build": {
    icon: "🏗️",
    description: "End-to-end Shopify store design and development from scratch.",
  },
  "Theme Development": {
    icon: "🎨",
    description: "Custom theme creation, modification, and performance tuning.",
  },
  Migrations: {
    icon: "🔄",
    description:
      "Platform migration from WooCommerce, Magento, BigCommerce, and others.",
  },
  "App Development": {
    icon: "⚙️",
    description: "Custom Shopify app development and third-party integrations.",
  },
  CRO: {
    icon: "📈",
    description: "Conversion rate optimization, A/B testing, checkout improvements.",
  },
  Marketing: {
    icon: "📣",
    description: "Email marketing, paid ads, and ecommerce growth strategy.",
  },
  SEO: {
    icon: "🔍",
    description: "Technical SEO, content strategy, and organic traffic growth.",
  },
  Headless: {
    icon: "💻",
    description:
      "Headless Shopify builds with Next.js, Hydrogen, or custom frontends.",
  },
  "Shopify Plus": {
    icon: "⭐",
    description:
      "Enterprise Shopify Plus, checkout extensibility, B2B, and Shopify Functions.",
  },
  "Product And Collection Setup": {
    icon: "🗂️",
    description:
      "Adding products, variants, and collections with merchandising in mind.",
  },
  "Store Settings Configuration": {
    icon: "🛠️",
    description:
      "Configuring shipping, taxes, payments, and core store settings for launch.",
  },
  "Ongoing Website Management": {
    icon: "🔧",
    description: "Ongoing maintenance, content updates, and day-to-day store management.",
  },
  "Business Strategy Guidance": {
    icon: "🧭",
    description: "Ecommerce strategy and growth planning for Shopify merchants.",
  },
  Strategy: {
    icon: "🧭",
    description: "Ecommerce strategy and growth planning for Shopify merchants.",
  },
  "Website Audit And Optimization Strategy": {
    icon: "📋",
    description:
      "Store audits with a prioritized roadmap to lift performance and conversion.",
  },
  Performance: {
    icon: "⚡",
    description: "Site speed and Core Web Vitals tuning for faster storefronts.",
  },
  Troubleshooting: {
    icon: "🩺",
    description: "Diagnosing and fixing bugs, theme conflicts, and technical issues.",
  },
  "Custom Domain Setup": {
    icon: "🌐",
    description: "Connecting and configuring custom domains, DNS, and SSL.",
  },
  "B2B Commerce": {
    icon: "🤝",
    description:
      "Wholesale and B2B selling with company accounts, catalogs, and net terms.",
  },
  Branding: {
    icon: "✨",
    description: "Brand identity, visual design, and storefront art direction.",
  },
  Analytics: {
    icon: "📊",
    description: "Analytics, tracking, and reporting setup for data-driven decisions.",
  },
  "Checkout Upgrade": {
    icon: "🛒",
    description: "Checkout extensibility and conversion-focused checkout work.",
  },
  "Systems Integration": {
    icon: "🔌",
    description: "Connecting Shopify to ERPs, CRMs, and third-party systems.",
  },
  "Banner Ads": {
    icon: "🖼️",
    description: "Display and banner ad creative for ecommerce campaigns.",
  },
  Internationalization: {
    icon: "🌍",
    description: "Multi-currency, multi-language, and cross-border selling setup.",
  },
  Internationalisation: {
    icon: "🌍",
    description: "Multi-currency, multi-language, and cross-border selling setup.",
  },
  "Sales Channel Setup": {
    icon: "📡",
    description: "Connecting marketplaces and social commerce sales channels.",
  },
  "UX Design": {
    icon: "🎯",
    description: "User experience and interface design for storefronts.",
  },
  "Product Descriptions": {
    icon: "✍️",
    description: "Conversion-focused product copywriting and descriptions.",
  },
  "Product Sourcing Guidance": {
    icon: "📦",
    description: "Guidance on sourcing products and supplier relationships.",
  },
  "3D Modelling": {
    icon: "🧊",
    description: "3D product modelling and interactive visuals for product pages.",
  },
  "Video And Illustrations": {
    icon: "🎬",
    description: "Video production and illustration for product and brand content.",
  },
  "Product Photography": {
    icon: "📷",
    description: "Product photography and visual content for storefronts.",
  },
  "Sales Tax Guidance": {
    icon: "🧾",
    description: "Guidance on sales tax setup and compliance.",
  },
  Shopify: {
    icon: "🛍️",
    description: "General Shopify store design, development, and support.",
  },
};

/** One-line description for a service tag — never echoes the bare tag name. */
function serviceDescription(spec: string): string {
  return (
    SPEC_META[spec]?.description ??
    `Professional ${spec.toLowerCase()} services for Shopify merchants.`
  );
}

/** Icon for a service tag, with a sensible default. */
function serviceIcon(spec: string): string {
  return SPEC_META[spec]?.icon ?? "⚡";
}

const BEST_FOR_MAP: Record<string, string[]> = {
  "Shopify Plus": ["Enterprise brands", "B2B merchants", "High-volume stores"],
  Migrations: ["Merchants switching platforms", "WooCommerce / Magento exits"],
  Headless: ["Custom frontend needs", "High-traffic stores"],
  CRO: ["Stores optimizing revenue", "Checkout improvement"],
  SEO: ["Organic growth focus", "Content-first brands"],
  "App Development": ["Custom integrations", "Unique functionality"],
  "Store Build": ["New Shopify launches", "Full store projects"],
  "Theme Development": ["Custom design work", "UI/UX overhauls"],
  Marketing: ["DTC growth brands", "Paid + email acquisition"],
};

const BUDGET_BEST_FOR: Record<string, string> = {
  "Under $5,000": "Starter & small projects",
  "$5,000 - $25,000": "Growth-stage brands",
  "$25,000 - $100,000": "Established mid-market",
  "$100,000+": "Enterprise projects",
};

const BUDGET_TIER: Record<string, string> = {
  "Under $5,000": "early-stage",
  "$5,000 - $25,000": "growth-stage",
  "$25,000 - $100,000": "mid-market",
  "$100,000+": "enterprise-level",
};

// ---------------------------------------------------------------------------
// Content-depth helper: generates unique contextual paragraphs per agency
// to ensure each profile page has 300+ words of meaningful content.
// ---------------------------------------------------------------------------

// COUNTRY_NAMES imported from @/lib/countries via countryName()

// Fact-based "About" fallback for agencies without their own long_description.
// Deliberately avoids generic marketing filler — every sentence is driven by
// this agency's own data, so the copy genuinely varies from profile to profile.
function buildAboutFallback(agency: Agency): string[] {
  const paras: string[] = [];
  const specs = agency.specializations ?? [];
  const resolvedCountry = agency.country ? countryName(agency.country) : null;
  const locationLabel = agency.location ?? resolvedCountry;

  if (locationLabel) {
    paras.push(
      `${agency.name} is a Shopify agency based in ${locationLabel}` +
        `${agency.founded ? `, operating since ${agency.founded}` : ""}.`
    );
  }

  if (specs.length > 0) {
    const specList =
      specs.length === 1
        ? specs[0]
        : specs.slice(0, -1).join(", ") + " and " + specs[specs.length - 1];
    paras.push(`Their core service areas include ${specList}.`);
  }

  const sizing: string[] = [];
  if (agency.budget_range) {
    const tier = BUDGET_TIER[agency.budget_range];
    sizing.push(
      `Typical project budgets fall in the ${agency.budget_range} range${
        tier ? `, a fit for ${tier} merchants` : ""
      }.`
    );
  }
  if (agency.team_size) {
    sizing.push(`The team has ${agency.team_size} people.`);
  }
  if (sizing.length) paras.push(sizing.join(" "));

  if (agency.rating && agency.review_count) {
    paras.push(
      `They hold a ${agency.rating}/5 rating across ${agency.review_count} ` +
        `${agency.review_count === 1 ? "review" : "reviews"} on the Shopify Partner Directory.`
    );
  }

  return paras;
}

function inferBestFor(
  specs: string[] | null,
  budget: string | null
): string[] {
  const tags = new Set<string>();
  for (const spec of specs ?? []) {
    for (const tag of BEST_FOR_MAP[spec] ?? []) tags.add(tag);
  }
  if (budget && BUDGET_BEST_FOR[budget]) tags.add(BUDGET_BEST_FOR[budget]);
  return Array.from(tags).slice(0, 6);
}

// ---------------------------------------------------------------------------

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

/**
 * A listing is "quality" enough to surface in Similar Agencies when its name
 * is a real, readable string. Excludes scraped junk like "★★★★★", emoji-only
 * names, or names carrying markup/escape characters — without penalising
 * legitimate non-Latin (e.g. CJK) agency names, which contain letters.
 */
function isQualityListing(agency: Agency): boolean {
  const name = agency.name?.trim() ?? "";
  if (name.length < 2) return false;
  // Must contain at least one letter in some script (excludes "★★★★★", "360&5"-only symbols).
  if (!/\p{L}/u.test(name)) return false;
  // Reject markup / escape artefacts from scraping.
  if (/[<>{}|\\]/.test(name)) return false;
  // Must have a usable description.
  if (!agency.description || agency.description.trim().length < 20) return false;
  return true;
}

async function getSimilarAgencies(
  agency: Agency,
  limit = 4
): Promise<Agency[]> {
  let query = supabase
    .from("agencies")
    .select("*")
    .eq("status", "published")
    .neq("slug", agency.slug)
    .order("rating", { ascending: false })
    // Over-fetch so quality filtering below can still fill `limit` slots.
    .limit(limit * 4);

  // Match by overlapping specializations if available
  if (agency.specializations && agency.specializations.length > 0) {
    query = query.overlaps("specializations", agency.specializations);
  }

  const { data } = await query;
  return ((data as Agency[]) ?? []).filter(isQualityListing).slice(0, limit);
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
  return [
    ...slugs.map((slug) => ({ slug })),
    ...SEGMENT_SLUGS.map((slug) => ({ slug })),
  ];
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

  const segment = getSegment(slug);
  if (segment) {
    return {
      title: segment.metaTitle,
      description: segment.metaDescription,
      alternates: { canonical: `/agencies/${segment.slug}` },
    };
  }

  const agency = await getAgency(slug);
  if (!agency) return { title: "Agency Not Found" };

  return generateAgencyMetadata({
    name: agency.name,
    slug: agency.slug,
    description: agency.description,
    location: agency.location ?? undefined,
    specializations: agency.specializations ?? undefined,
    rating: agency.rating ?? undefined,
    reviewCount: agency.review_count ?? undefined,
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

  // Programmatic landing pages — check before agency profile lookup
  const segment = getSegment(slug);
  if (segment) {
    return <SegmentPage segment={segment} />;
  }

  const agency = await getAgency(slug);
  if (!agency) notFound();

  const [reviews, similarAgencies] = await Promise.all([
    getApprovedReviews(agency.id),
    getSimilarAgencies(agency),
  ]);

  const jsonLd = generateAgencyJsonLd({
    name: agency.name,
    slug: agency.slug,
    description: agency.description,
    location: agency.location ?? undefined,
    country: agency.country ?? undefined,
    website: agency.website ?? undefined,
    phone: agency.phone ?? undefined,
    logoUrl: agency.logo_url ?? undefined,
    founded: agency.founded ?? undefined,
    budgetRange: agency.budget_range ?? undefined,
    specializations: agency.specializations ?? undefined,
    // AggregateRating/Review schema is sourced ONLY from on-site reviews. The
    // Shopify Partner rating is shown on-page as an external signal but is not
    // emitted as schema — so we never assert reviews the page can't back up.
    rating:
      reviews.length > 0
        ? Math.round(
            (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10
          ) / 10
        : undefined,
    reviewCount: reviews.length > 0 ? reviews.length : undefined,
    reviews: reviews.map((r) => ({
      reviewer_name: r.reviewer_name,
      body: r.body,
      rating: r.rating,
      created_at: r.created_at,
    })),
  });

  // ProfilePage wrapper — tells Google this is a dedicated profile page
  // All data sourced from DB (trusted), no user-supplied content
  const profilePageJsonLd = generateProfilePageJsonLd({
    name: agency.name,
    slug: agency.slug,
    description: agency.description,
    logoUrl: agency.logo_url ?? undefined,
    website: agency.website ?? undefined,
  });

  return (
    <>
      {/* JSON-LD: ProfessionalService — DB-sourced trusted data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* JSON-LD: ProfilePage — DB-sourced trusted data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
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
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {agency.rating && (
                      <p className="text-sm text-gray-600">
                        ⭐ {agency.rating}/5{" "}
                        <span className="text-gray-400">
                          on Shopify
                          {agency.review_count
                            ? ` · ${agency.review_count} ${
                                agency.review_count === 1 ? "review" : "reviews"
                              }`
                            : ""}
                        </span>
                      </p>
                    )}
                    {reviews.length > 0 && (
                      <p className="text-sm text-gray-600">
                        ★{" "}
                        {(
                          reviews.reduce((sum, r) => sum + r.rating, 0) /
                          reviews.length
                        ).toFixed(1)}
                        /5{" "}
                        <span className="text-gray-400">
                          ({reviews.length}{" "}
                          {reviews.length === 1 ? "review" : "reviews"})
                        </span>
                      </p>
                    )}
                  </div>
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

          {/* Stats */}
          {(agency.founded || agency.team_size || agency.budget_range) && (
            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              {agency.founded && (
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Founded</dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">{agency.founded}</dd>
                </div>
              )}
              {agency.team_size && (
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Team Size</dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">{agency.team_size}</dd>
                </div>
              )}
              {agency.budget_range && (
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Project Budget</dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">{agency.budget_range}</dd>
                </div>
              )}
            </dl>
          )}

          {/* About — unique, agency-specific content leads the page.
              Prefers the agency's own long_description; otherwise falls back to
              concise, fact-based prose generated from this agency's own data. */}
          {(() => {
            const aboutParagraphs = agency.long_description
              ? agency.long_description
                  .split("\n\n")
                  .map((p) => p.trim())
                  .filter(Boolean)
              : buildAboutFallback(agency);
            return aboutParagraphs.length > 0 ? (
              <section className="mt-5 rounded-2xl border bg-white p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  About {agency.name}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-gray-700">
                  {aboutParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            ) : null;
          })()}

          {/* Services */}
          {agency.specializations && agency.specializations.length > 0 && (
            <section className="mt-5 rounded-2xl border bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Services</h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {agency.specializations.map((spec) => (
                  <div key={spec} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <dt className="text-sm font-semibold text-gray-900">
                      {serviceIcon(spec)} {spec}
                    </dt>
                    <dd className="mt-0.5 text-xs leading-relaxed text-gray-500">
                      {serviceDescription(spec)}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Best for tags */}
              {(() => {
                const tags = inferBestFor(
                  agency.specializations,
                  agency.budget_range
                );
                return tags.length > 0 ? (
                  <div className="mt-6 border-t pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Best suited for
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
            </section>
          )}

          {/* Get Your Badge */}
          <section className="mt-5 rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Get Your Badge</h2>
            <p className="mt-1 text-sm text-gray-500">
              Embed this badge on your website to show you&apos;re verified on Shopify Agency Directory.
            </p>
            <div className="mt-4">
              <BadgePreview agencySlug={agency.slug} agencyName={agency.name} />
            </div>
          </section>

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
              {reviews.length > 0 && (
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="font-semibold text-gray-900">
                    {(
                      reviews.reduce((sum, r) => sum + r.rating, 0) /
                      reviews.length
                    ).toFixed(1)}
                  </span>
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
                        <div className="mt-0.5 flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              aria-hidden="true"
                              className={star <= review.rating ? "text-yellow-400" : "text-gray-200"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <time className="shrink-0 text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString(undefined, {
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

          {/* Similar Agencies */}
          {similarAgencies.length > 0 && (
            <section className="mt-5 rounded-2xl border bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Similar Agencies</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {similarAgencies.map((sim) => (
                  <Link
                    key={sim.slug}
                    href={`/agencies/${sim.slug}`}
                    className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-green-300"
                  >
                    <AgencyLogo name={sim.name} website={sim.website} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{sim.name}</p>
                      {sim.location && (
                        <p className="truncate text-xs text-gray-500">{sim.location}</p>
                      )}
                      {sim.rating && (
                        <p className="text-xs text-gray-500">⭐ {sim.rating}/5</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Contact / Lead form */}
          <div className="mt-5 overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="bg-green-600 px-8 py-5">
              <h2 className="text-lg font-bold text-white">
                Contact {agency.name}
              </h2>
              <p className="mt-1 text-sm text-green-100">
                Send your brief directly — typical response within 1–2 business
                days.
              </p>
            </div>
            <div className="p-8">
              <LeadForm agencyId={agency.id} agencyName={agency.name} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
