import type { Metadata } from "next";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SITE_NAME = "Shopify Agency Directory";

// Generate metadata for an agency profile page
export function generateAgencyMetadata(agency: {
  name: string;
  slug: string;
  description: string;
  location?: string;
  specializations?: string[];
}): Metadata {
  const title = `${agency.name} | Shopify Agency`;
  const description =
    agency.description ||
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

// Generate JSON-LD structured data for an agency
export function generateAgencyJsonLd(agency: {
  name: string;
  slug: string;
  description: string;
  location?: string;
  website?: string;
  founded?: number;
  employees?: string;
  specializations?: string[];
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: agency.name,
    description: agency.description,
    url: agency.website || `${BASE_URL}/agencies/${agency.slug}`,
    ...(agency.location && { address: { "@type": "PostalAddress", addressLocality: agency.location } }),
    ...(agency.founded && { foundingDate: agency.founded.toString() }),
    ...(agency.rating && agency.reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: agency.rating,
        reviewCount: agency.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

// Generate metadata for the agencies listing page
export function generateDirectoryMetadata(page = 1, filters?: {
  specialization?: string;
  location?: string;
}): Metadata {
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
    alternates: {
      canonical: `${BASE_URL}/agencies`,
    },
  };
}
