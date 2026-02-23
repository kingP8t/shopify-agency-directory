import type { Metadata } from "next";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SITE_NAME = "Shopify Agency Directory";

// ---------------------------------------------------------------------------
// Page Metadata helpers
// ---------------------------------------------------------------------------

export function generateAgencyMetadata(agency: {
  name: string;
  slug: string;
  description: string;
  location?: string;
  specializations?: string[];
}): Metadata {
  const title = `${agency.name} | Shopify Agency`;
  const description =
    agency.description.length > 155
      ? agency.description.slice(0, 152) + "..."
      : agency.description ||
        `${agency.name} is a top Shopify agency${agency.location ? ` based in ${agency.location}` : ""}. View their portfolio, services, and contact information.`;

  const keywords = [
    agency.name,
    "Shopify agency",
    "Shopify experts",
    ...(agency.location ? [`Shopify agency ${agency.location}`] : []),
    ...(agency.specializations || []),
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/agencies/${agency.slug}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/agencies/${agency.slug}`,
    },
  };
}

export function generateDirectoryMetadata(
  page = 1,
  filters?: { specialization?: string; location?: string }
): Metadata {
  let title = "Find Shopify Agencies & Experts";
  let description =
    "Browse our directory of verified Shopify agencies and experts. Filter by specialization, budget, location, and more.";

  if (filters?.specialization) {
    title = `Shopify ${filters.specialization} Agencies`;
    description = `Find the best Shopify ${filters.specialization} agencies. Compare portfolios, pricing, and reviews.`;
  }

  if (filters?.location) {
    title = `Shopify Agencies in ${filters.location}`;
    description = `Find top Shopify agencies in ${filters.location}. Browse local Shopify experts and compare their services.`;
  }

  return {
    title,
    description,
    ...(page > 1 && { robots: { index: false, follow: true } }),
    alternates: { canonical: `${BASE_URL}/agencies` },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD Schema helpers
// ---------------------------------------------------------------------------

/** Agency profile page — ProfessionalService + AggregateRating + Review items */
export function generateAgencyJsonLd(agency: {
  name: string;
  slug: string;
  description: string;
  location?: string;
  website?: string;
  founded?: number;
  specializations?: string[];
  rating?: number;
  reviewCount?: number;
  reviews?: Array<{
    reviewer_name: string;
    body: string;
    rating: number;
    created_at: string;
  }>;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: agency.name,
    description: agency.description,
    url: agency.website || `${BASE_URL}/agencies/${agency.slug}`,
    ...(agency.location && {
      address: {
        "@type": "PostalAddress",
        addressLocality: agency.location,
      },
    }),
    ...(agency.founded && { foundingDate: agency.founded.toString() }),
    ...(agency.specializations?.length && {
      knowsAbout: agency.specializations,
    }),
  };

  // AggregateRating — shows stars in Google search results
  if (agency.rating && agency.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: agency.rating,
      reviewCount: agency.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Individual Review items in structured data
  if (agency.reviews && agency.reviews.length > 0) {
    schema.review = agency.reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.reviewer_name },
      reviewBody: r.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished: r.created_at.split("T")[0],
    }));
  }

  return schema;
}

/** Homepage — Organization schema */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Find and compare the best Shopify agencies and experts. Browse verified Shopify partners by specialization, budget, and location.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/agencies?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Agencies listing page — ItemList schema */
export function generateAgencyListJsonLd(
  agencies: Array<{ name: string; slug: string; description: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Shopify Agencies Directory",
    description:
      "A curated directory of top Shopify agencies and Shopify Plus partners.",
    url: `${BASE_URL}/agencies`,
    numberOfItems: agencies.length,
    itemListElement: agencies.map((agency, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: agency.name,
      url: `${BASE_URL}/agencies/${agency.slug}`,
      description: agency.description,
    })),
  };
}
