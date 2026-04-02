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
  rating?: number;
  reviewCount?: number;
}): Metadata {
  // ── Unique, keyword-rich title ──
  // Format: "Arctic Grey | Shopify Plus Agency NYC | Shopify Agency Directory"
  // The root layout template appends " | Shopify Agency Directory"
  const specs = agency.specializations ?? [];
  const primarySpec = specs[0];

  // Extract city shorthand from location (e.g. "New York, United States" → "NYC"-style or just city)
  const city = agency.location?.split(",")[0]?.trim();

  const specLabel = primarySpec ? `${primarySpec} Agency` : "Agency";
  const locationBit = city ? ` ${city}` : "";

  // e.g. "Arctic Grey | Shopify Plus Agency NYC"
  const title = `${agency.name} | Shopify ${specLabel}${locationBit}`;

  // ── Unique meta description with name, location, specializations, rating ──
  const ratingStr =
    agency.rating && agency.reviewCount
      ? `Rated ${agency.rating}/5 from ${agency.reviewCount} reviews. `
      : "";
  const specStr =
    specs.length > 0
      ? `Specializing in ${specs.slice(0, 3).join(", ")}. `
      : "";
  const locationStr = agency.location ? `Based in ${agency.location}. ` : "";

  // Build a unique description; fall back to truncated agency description
  let description = `${agency.name} is a verified Shopify agency. ${ratingStr}${specStr}${locationStr}View portfolio, services, and contact details.`;
  // If too long, truncate gracefully
  if (description.length > 160) {
    description = description.slice(0, 157) + "...";
  }

  const keywords = [
    agency.name,
    "Shopify agency",
    "Shopify experts",
    ...(agency.location ? [`Shopify agency ${agency.location}`] : []),
    ...specs,
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${BASE_URL}/agencies/${agency.slug}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/agencies/${agency.slug}`,
    },
  };
}

export function generateDirectoryMetadata(
  page = 1,
  filters?: { specialization?: string; location?: string; hasAnyFilter?: boolean }
): Metadata {
  const year = new Date().getFullYear();
  let title = `Browse All Shopify Agencies & Experts — ${year} Directory`;
  let description =
    "Browse our directory of verified Shopify agencies and experts. Filter by specialization, budget, location, and more.";

  if (filters?.specialization && filters?.location) {
    title = `Shopify ${filters.specialization} Agencies in ${filters.location}`;
    description = `Find the best Shopify ${filters.specialization} agencies in ${filters.location}. Compare portfolios, pricing, and reviews.`;
  } else if (filters?.specialization) {
    title = `Top Shopify ${filters.specialization} Agencies — Compare & Hire`;
    description = `Find the best Shopify ${filters.specialization} agencies. Compare portfolios, pricing, and reviews.`;
  } else if (filters?.location) {
    title = `Shopify Agencies in ${filters.location} — Local Experts`;
    description = `Find top Shopify agencies in ${filters.location}. Browse local Shopify experts and compare their services.`;
  }

  // noindex filtered / paginated views — segment pages are the canonical versions
  const shouldNoIndex = page > 1 || !!filters?.hasAnyFilter;

  return {
    title,
    description,
    ...(shouldNoIndex && { robots: { index: false, follow: true } }),
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
  // ProfessionalService requires address; fall back to Organization when missing
  const hasAddress = !!(agency.location || agency.country);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": hasAddress ? "ProfessionalService" : "Organization",
    "@id": `${BASE_URL}/agencies/${agency.slug}`,
    name: agency.name,
    description: agency.description,
    url: agency.website || `${BASE_URL}/agencies/${agency.slug}`,
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        ...(agency.location && { addressLocality: agency.location }),
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
  agencies: Array<{
    name: string;
    slug: string;
    description: string;
    rating?: number | null;
    reviewCount?: number | null;
  }>
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
        ...(agency.rating &&
          agency.reviewCount && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: agency.rating,
              reviewCount: agency.reviewCount,
              bestRating: 5,
              worstRating: 1,
            },
          }),
      },
    })),
  };
}

/** Segment landing page — CollectionPage + ItemList schema */
export function generateSegmentJsonLd(segment: {
  name: string;
  slug: string;
  description: string;
  agencies: Array<{
    name: string;
    slug: string;
    rating?: number | null;
    reviewCount?: number | null;
  }>;
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
          ...(agency.rating &&
            agency.reviewCount && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: agency.rating,
                reviewCount: agency.reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
            }),
        },
      })),
    },
  };
}

// ---------------------------------------------------------------------------
// ProfilePage schema — wraps ProfessionalService/Organization on agency pages
// ---------------------------------------------------------------------------

/** Agency profile page — ProfilePage wrapper for richer rich-results */
export function generateProfilePageJsonLd(agency: {
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  website?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE_URL}/agencies/${agency.slug}#profilepage`,
    name: `${agency.name} — Agency Profile`,
    url: `${BASE_URL}/agencies/${agency.slug}`,
    description: agency.description,
    mainEntity: { "@id": `${BASE_URL}/agencies/${agency.slug}` },
    isPartOf: { "@id": `${BASE_URL}/#website` },
    ...(agency.logoUrl && {
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: agency.logoUrl,
      },
    }),
  };
}

// ---------------------------------------------------------------------------
// Service schema — Get Matched / agency matching service
// ---------------------------------------------------------------------------

export function generateServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/get-matched#service`,
    name: "Free Shopify Agency Matching",
    description:
      "Tell us about your project and we'll personally connect you with the best Shopify agency for your needs, timeline, and budget.",
    url: `${BASE_URL}/get-matched`,
    serviceType: "Agency Matching",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: { "@type": "Place", name: "Worldwide" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free agency matching service — no cost to merchants",
    },
    termsOfService: `${BASE_URL}/terms`,
  };
}

// ---------------------------------------------------------------------------
// WebApplication schema — interactive tools (cost estimator, etc.)
// ---------------------------------------------------------------------------

export function generateWebApplicationJsonLd(tool: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${BASE_URL}${tool.path}#app`,
    name: tool.name,
    description: tool.description,
    url: `${BASE_URL}${tool.path}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free to use — no signup required",
    },
    provider: { "@id": `${BASE_URL}/#organization` },
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };
}

// ---------------------------------------------------------------------------
// Breadcrumb schema
// ---------------------------------------------------------------------------

export function generateBreadcrumbJsonLd(
  items: { name: string; href?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => item.href)
      .map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${BASE_URL}${item.href}`,
      })),
  };
}
