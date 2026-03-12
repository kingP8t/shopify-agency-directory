import type { Metadata } from "next";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shopifyagencydirectory.com";

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
  country?: string;
  website?: string;
  phone?: string;
  logoUrl?: string;
  founded?: number;
  budgetRange?: string;
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
    "@id": `${BASE_URL}/agencies/${agency.slug}`,
    name: agency.name,
    description: agency.description,
    url: agency.website || `${BASE_URL}/agencies/${agency.slug}`,
    ...(agency.location && {
      address: {
        "@type": "PostalAddress",
        addressLocality: agency.location,
        ...(agency.country && { addressCountry: agency.country }),
      },
    }),
    ...(agency.phone && { telephone: agency.phone }),
    ...(agency.logoUrl && { image: agency.logoUrl }),
    ...(agency.budgetRange && { priceRange: agency.budgetRange }),
    ...(agency.country && {
      areaServed: {
        "@type": "Country",
        name: agency.country,
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

/** Homepage — WebSite schema (enables Google Sitelinks Search Box) */
export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Find and compare the best Shopify agencies and experts. Browse verified Shopify partners by specialization, budget, and location.",
    publisher: { "@id": `${BASE_URL}/#organization` },
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

/** Homepage — Organization schema (E-E-A-T signal) */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    image: `${BASE_URL}/opengraph-image`,
    description:
      "A curated directory of verified Shopify agencies and experts worldwide. Free agency matching for merchants.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/get-matched`,
    },
    sameAs: [],
  };
}

/** Agencies listing page — ItemList schema */
export function generateAgencyListJsonLd(
  agencies: Array<{ name: string; slug: string; description: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/agencies#list`,
    name: "Shopify Agencies Directory",
    description:
      "A curated directory of top Shopify agencies and Shopify Plus partners.",
    url: `${BASE_URL}/agencies`,
    numberOfItems: agencies.length,
    itemListElement: agencies.map((agency, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: agency.name,
        url: `${BASE_URL}/agencies/${agency.slug}`,
        description: agency.description,
      },
    })),
  };
}

/** Segment landing page — CollectionPage + ItemList schema */
export function generateSegmentJsonLd(segment: {
  name: string;
  slug: string;
  description: string;
  agencies: Array<{ name: string; slug: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: segment.name,
    description: segment.description,
    url: `${BASE_URL}/agencies/${segment.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: segment.agencies.length,
      itemListElement: segment.agencies.map((agency, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Organization",
          name: agency.name,
          url: `${BASE_URL}/agencies/${agency.slug}`,
        },
      })),
    },
  };
}
