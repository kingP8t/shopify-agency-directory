import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateAgencyMetadata, generateAgencyJsonLd } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import LeadForm from "@/app/components/LeadForm";

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
  });

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Nav */}
        <nav className="border-b bg-white px-6 py-4">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <a href="/" className="text-lg font-bold text-gray-900">
              Shopify Agency Directory
            </a>
            <a
              href="/agencies"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              ← Back to Directory
            </a>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-6 py-12">
          {/* Header card */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-5">
                {/* Logo */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl font-bold text-green-700">
                  {agency.name.charAt(0)}
                </div>
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

              {agency.website && (
                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400"
                >
                  Visit Website ↗
                </a>
              )}
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
