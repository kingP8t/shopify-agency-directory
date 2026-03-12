/**
 * Smoke tests for SEO utilities (JSON-LD generation)
 * ──────────────────────────────────────────────────────────────────────────────
 * Verifies that the agency JSON-LD output conforms to expected schema.org
 * structure and correctly omits fields when data is missing.
 */
import { describe, it, expect } from "vitest";
import { generateAgencyJsonLd } from "@/lib/seo";

describe("generateAgencyJsonLd", () => {
  const baseAgency = {
    name: "Test Agency",
    slug: "test-agency",
    description: "A test Shopify agency.",
    location: "London, UK",
  };

  it("returns valid ProfessionalService JSON-LD", () => {
    const result = generateAgencyJsonLd(baseAgency);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("ProfessionalService");
    expect(result.name).toBe("Test Agency");
    expect(result.description).toBe("A test Shopify agency.");
  });

  it("includes AggregateRating when rating & reviewCount are provided", () => {
    const result = generateAgencyJsonLd({
      ...baseAgency,
      rating: 4.5,
      reviewCount: 12,
    });
    expect(result.aggregateRating).toBeDefined();
    expect(result.aggregateRating["@type"]).toBe("AggregateRating");
    expect(result.aggregateRating.ratingValue).toBe(4.5);
    expect(result.aggregateRating.reviewCount).toBe(12);
  });

  it("omits AggregateRating when rating is missing", () => {
    const result = generateAgencyJsonLd(baseAgency);
    expect(result.aggregateRating).toBeUndefined();
  });

  it("includes telephone when phone is provided", () => {
    const result = generateAgencyJsonLd({
      ...baseAgency,
      phone: "+44 20 7946 0958",
    });
    expect(result.telephone).toBe("+44 20 7946 0958");
  });

  it("omits telephone when phone is not provided", () => {
    const result = generateAgencyJsonLd(baseAgency);
    expect(result.telephone).toBeUndefined();
  });

  it("includes priceRange when budgetRange is provided", () => {
    const result = generateAgencyJsonLd({
      ...baseAgency,
      budgetRange: "$5,000 - $10,000",
    });
    expect(result.priceRange).toBe("$5,000 - $10,000");
  });

  it("includes areaServed when country is provided", () => {
    const result = generateAgencyJsonLd({
      ...baseAgency,
      country: "United Kingdom",
    });
    expect(result.areaServed).toBeDefined();
    expect(result.areaServed["@type"]).toBe("Country");
    expect(result.areaServed.name).toBe("United Kingdom");
  });

  it("includes image when logoUrl is provided", () => {
    const result = generateAgencyJsonLd({
      ...baseAgency,
      logoUrl: "https://example.com/logo.png",
    });
    expect(result.image).toBe("https://example.com/logo.png");
  });

  it("omits optional fields when not provided", () => {
    const result = generateAgencyJsonLd(baseAgency);
    expect(result.telephone).toBeUndefined();
    expect(result.image).toBeUndefined();
    expect(result.priceRange).toBeUndefined();
    expect(result.areaServed).toBeUndefined();
  });
});
