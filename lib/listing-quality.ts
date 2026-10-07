import type { Agency } from "@/lib/supabase";

/** The only fields the quality check reads, so callers can pass partial rows. */
export type ListingFields = Pick<Agency, "name" | "description" | "website">;

// Text a scraper picks up when it lands on an error or bot-check page instead
// of the real profile. Phrases are specific on purpose, so a real agency that
// merely mentions "404" (an email address, a service) is never matched.
const ERROR_PAGE_TEXT =
  /page (does not|doesn[’']t) exist|page not found|access denied|just a moment|enable javascript|verify you are human|domain (is )?(for sale|expired)|this site can[’']t be reached|lorem ipsum/i;

// Encoding damage. "Ã" alone is a real Portuguese letter, so only the damaged
// pairings count, plus the Unicode replacement character.
const MOJIBAKE = /Ã[ -¿]|â€|�/;

// A listing whose website is Shopify's own help or marketing site was scraped
// from the wrong page. Partner profile hosts such as partners.shopify.com are
// deliberately not listed here.
const SHOPIFY_OWN_SITE = /^https?:\/\/(?:(?:help|community|apps|www)\.)?shopify\.com(?:[/?#]|$)/i;

// Raw HTML left in a name by the scraper.
const HTML_TAG = /<\/?[a-z][^>]*>/i;

/**
 * One long word with capitals scattered through lowercase letters, such as
 * "NXxftLBUoWdcZOggbRTZltaa". Real CamelCase brands (WebCrafters, eBizTrait,
 * FortyDollarDeal) keep capitals at word boundaries, so they stay under both
 * the capital count and the capital ratio. All caps names have no lowercase
 * to switch from, so they are never matched.
 */
function looksLikeRandomCase(name: string): boolean {
  if (/\s/.test(name)) return false;
  const letters = name.replace(/[^A-Za-z]/g, "");
  if (letters.length < 10 || letters.length < name.length * 0.9) return false;
  const upper = letters.replace(/[^A-Z]/g, "").length;
  const ratio = upper / letters.length;
  const humps = (letters.match(/[a-z][A-Z]/g) ?? []).length;
  return humps >= 3 && ratio >= 0.3 && ratio <= 0.75;
}

/**
 * True when a listing is scraper debris or unreadable, so it should not be
 * indexed, appear in the sitemap, or show up in directory and segment pages.
 *
 * Deliberately narrow: a false positive removes a real agency from search, so
 * it must never flag one. That includes names with non-Latin scripts, numeric
 * slugs, digits-only-plus-symbol brands such as "360&5", and names with odd
 * formatting such as a pipe or braces. Thin, generic, or untidy listings are
 * NOT gibberish and are not caught here.
 */
export function isGibberishListing(listing: ListingFields): boolean {
  const name = listing.name?.trim() ?? "";
  const description = listing.description?.trim() ?? "";

  // Unreadable names: too short, nothing but symbols, or leftover HTML.
  if (name.length < 2) return true;
  if (!/[\p{L}\p{N}]/u.test(name)) return true;
  if (HTML_TAG.test(name)) return true;

  // Random-looking Latin names: one long token with no vowels, or a long run
  // of the same character.
  if (/^[A-Za-z]{6,}$/.test(name) && !/[aeiouy]/i.test(name)) return true;
  if (/(.)\1{4,}/u.test(name)) return true;
  if (looksLikeRandomCase(name)) return true;

  // A real description has spaces. A long unbroken run of Latin letters and
  // digits is a random token. Limiting this to Latin characters keeps Chinese
  // and Japanese descriptions, which have no spaces, safe.
  if (description.length >= 30 && /^[A-Za-z0-9]+$/.test(description)) return true;

  // Scraped error pages and bot checks.
  if (ERROR_PAGE_TEXT.test(name) || ERROR_PAGE_TEXT.test(description)) return true;

  // Encoding damage.
  if (MOJIBAKE.test(name) || MOJIBAKE.test(description)) return true;

  // Website points at Shopify itself, not at the agency.
  if (listing.website && SHOPIFY_OWN_SITE.test(listing.website.trim())) return true;

  return false;
}

/**
 * Drop gibberish rows from a fetched page of listings and report how many were
 * removed, so a caller that paginates on a database count can keep its total
 * honest.
 */
export function withoutGibberish<T extends ListingFields>(
  rows: T[]
): { rows: T[]; removed: number } {
  const kept = rows.filter((row) => !isGibberishListing(row));
  return { rows: kept, removed: rows.length - kept.length };
}
