// ---------------------------------------------------------------------------
// Blog post data — posts are stored in Supabase `blog_posts` table and
// managed from the admin dashboard. The hardcoded `posts` array below is
// kept as the seed source; once you run the seed SQL those rows live in DB.
// ---------------------------------------------------------------------------

import { getAllBlogPosts, getAllBlogPostsPaginated, getBlogPostBySlug } from "@/lib/supabase";
import type { BlogPostDB } from "@/lib/supabase";

export type { BlogPostDB };

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;           // ISO format: YYYY-MM-DD
  updatedDate?: string;
  readingTime: number;    // minutes
  author: string;
  category: string;
  tags: string[];
  featured?: boolean;
  status?: "published" | "draft";
  content: ContentBlock[];
}

// ---------------------------------------------------------------------------
// Map Supabase DB row → BlogPost
// ---------------------------------------------------------------------------

function toPost(row: BlogPostDB): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    updatedDate: row.updated_date ?? undefined,
    readingTime: row.reading_time,
    author: row.author,
    category: row.category,
    tags: row.tags ?? [],
    featured: row.featured,
    status: row.status,
    content: (row.content ?? []) as ContentBlock[],
  };
}

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string }       // highlighted tip box
  | { type: "cta"; text: string; href: string; label: string } // call to action
  | { type: "table"; headers: string[]; rows: string[][] }     // comparison table
  | { type: "faq"; items: { q: string; a: string }[] };        // FAQ section — generates FAQPage schema

// ---------------------------------------------------------------------------
// Posts — all blog content now lives in Supabase `blog_posts` table.
// This empty array is kept as a fallback for local dev without DB access.
// To seed posts, run: scripts/seed-location-service-posts*.js
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Posts — all blog content now lives in Supabase `blog_posts` table.
// This empty array is kept as a fallback for local dev without DB access.
// ---------------------------------------------------------------------------

const posts: BlogPost[] = [];

// ---------------------------------------------------------------------------
// Category slug utilities
// ---------------------------------------------------------------------------

export const CATEGORY_SLUGS: Record<string, string> = {
  "Hiring Guide":    "hiring-guide",
  "Platform Guide":  "platform-guide",
  "Pricing Guide":   "pricing-guide",
  "Migration Guide": "migration-guide",
  "Tools & Apps":    "tools-apps",
  "SEO":             "seo",
};

export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([k, v]) => [v, k])
);

export function getCategorySlug(category: string): string {
  return (
    CATEGORY_SLUGS[category] ??
    category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  );
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Hiring Guide":
    "Expert guides to help you find, evaluate, and hire the right Shopify agency for your project.",
  "Platform Guide":
    "In-depth comparisons and guides on Shopify plans, features, and platform decisions.",
  "Pricing Guide":
    "Transparent breakdowns of Shopify development costs, agency pricing, and budget planning.",
  "Migration Guide":
    "Step-by-step guides for migrating to Shopify from WooCommerce, Magento, and other platforms.",
  "Tools & Apps":
    "Reviews and comparisons of the best Shopify apps, themes, and tools for your tech stack.",
  "SEO":
    "Technical SEO guides, audits, and strategies to grow organic traffic on your Shopify store.",
};

// ---------------------------------------------------------------------------
// Helper functions — fetch from Supabase (async)
// Falls back to the hardcoded `posts` array if Supabase returns nothing
// (e.g., during local dev before seeding).
// ---------------------------------------------------------------------------

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await getAllBlogPosts();
  if (rows.length > 0) return rows.map(toPost);
  // Fallback: return hardcoded posts sorted by date
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostsPaginated(
  page: number,
  limit = 12
): Promise<{ posts: BlogPost[]; total: number }> {
  const { posts: rows, total } = await getAllBlogPostsPaginated(page, limit);
  if (total > 0) {
    return { posts: rows.map(toPost), total };
  }
  // Fallback: paginate the hardcoded array
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const start = (page - 1) * limit;
  return {
    posts: sorted.slice(start, start + limit),
    total: sorted.length,
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const row = await getBlogPostBySlug(slug);
  if (row) return toPost(row);
  // Fallback: find in hardcoded posts
  return posts.find((p) => p.slug === slug);
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const all = await getAllPosts();
  const category = SLUG_TO_CATEGORY[categorySlug];
  if (!category) return [];
  return all.filter((p) => p.category === category);
}

export function getAllCategoryPairs(): Array<{ slug: string; label: string }> {
  return Object.entries(CATEGORY_SLUGS).map(([label, slug]) => ({ slug, label }));
}

// ---------------------------------------------------------------------------
// Blog → Directory internal-linking map
// Returns contextual directory links based on post category, tags, and slug.
// ---------------------------------------------------------------------------

export interface DirectoryLink {
  label: string;
  href: string;
  description: string;
}

/** Extract all FAQ items from a post's content blocks (for JSON-LD generation). */
export function extractFaqItems(post: BlogPost): { q: string; a: string }[] {
  return post.content
    .filter((b): b is Extract<ContentBlock, { type: "faq" }> => b.type === "faq")
    .flatMap((b) => b.items);
}

export function getDirectoryLinks(post: BlogPost): DirectoryLink[] {
  const links: DirectoryLink[] = [];
  const tags = post.tags.map((t) => t.toLowerCase());
  const cat = post.category;
  const slug = post.slug;

  // ── Category-based primary links ──────────────────────────────────────────

  if (cat === "SEO" || tags.includes("seo") || tags.includes("shopify seo")) {
    links.push({
      label: "Browse SEO Agencies",
      href: "/agencies/ecommerce-seo",
      description: "Find Shopify SEO specialists",
    });
  }

  if (cat === "Migration Guide" || tags.includes("migration") || tags.includes("replatforming")) {
    links.push({
      label: "Browse Migration Specialists",
      href: "/agencies/migration",
      description: "Find agencies that handle platform migrations",
    });
  }

  if (cat === "Pricing Guide" || tags.includes("budget") || tags.includes("pricing")) {
    links.push(
      {
        label: "Agencies Under $5k",
        href: "/agencies/under-5k",
        description: "Budget-friendly Shopify partners",
      },
      {
        label: "Mid-Range ($5k–$25k)",
        href: "/agencies/under-25k",
        description: "Agencies for growing businesses",
      },
      {
        label: "Enterprise ($100k+)",
        href: "/agencies/100k-plus",
        description: "Full-service enterprise partners",
      },
    );
  }

  if (cat === "Platform Guide" || tags.includes("shopify plus")) {
    links.push({
      label: "Browse Shopify Plus Agencies",
      href: "/agencies/shopify-plus",
      description: "Agencies specializing in Shopify Plus",
    });
  }

  // ── Tag-based secondary links ─────────────────────────────────────────────

  if (tags.includes("theme") || tags.includes("shopify themes") || tags.includes("design")) {
    links.push({
      label: "Theme Development Agencies",
      href: "/agencies/theme-development",
      description: "Custom theme design and development",
    });
  }

  if (tags.includes("shopify apps") || tags.includes("app development")) {
    links.push({
      label: "App Development Agencies",
      href: "/agencies/app-development",
      description: "Custom Shopify app builders",
    });
  }

  if (tags.includes("cro") || tags.includes("conversion") || tags.includes("social proof") || tags.includes("retention")) {
    links.push({
      label: "CRO Specialists",
      href: "/agencies",
      description: "Conversion rate optimization experts",
    });
  }

  if (tags.includes("headless") || tags.includes("hydrogen")) {
    links.push({
      label: "Headless Commerce Agencies",
      href: "/agencies",
      description: "Headless Shopify development experts",
    });
  }

  if (tags.includes("marketing") || tags.includes("email marketing") || tags.includes("paid ads")) {
    links.push({
      label: "Shopify Marketing Agencies",
      href: "/agencies/shopify-marketing",
      description: "Growth and marketing specialists",
    });
  }

  // ── Slug-specific overrides for posts with unique needs ───────────────────

  if (slug === "how-to-choose-a-shopify-agency" || slug === "shopify-agency-red-flags") {
    // These are general hiring posts — link to store build as default
    if (!links.some((l) => l.href.includes("store-build"))) {
      links.push({
        label: "Browse Store Build Agencies",
        href: "/agencies/store-build",
        description: "Agencies for full Shopify store builds",
      });
    }
  }

  if (slug === "how-to-brief-a-shopify-agency") {
    if (!links.some((l) => l.href === "/agencies")) {
      links.push({
        label: "Browse All Agencies",
        href: "/agencies",
        description: "Find the agency to send your brief to",
      });
    }
  }

  // ── Loyalty / review apps → CRO link ─────────────────────────────────────

  if (tags.includes("loyalty") || tags.includes("rewards") || tags.includes("reviews")) {
    if (!links.some((l) => l.href.includes("agencies"))) {
      links.push({
        label: "CRO & Retention Agencies",
        href: "/agencies",
        description: "Specialists in conversion and retention",
      });
    }
  }

  // ── Fallback: ensure every post has at least one directory link ────────────

  if (links.length === 0) {
    links.push({
      label: "Browse All Agencies",
      href: "/agencies",
      description: "Explore our full directory of verified Shopify partners",
    });
  }

  // Deduplicate by href
  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const [all, current] = await Promise.all([getAllPosts(), getPostBySlug(slug)]);
  if (!current) return all.slice(0, limit);
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aOverlap = a.tags.filter((t) => current.tags.includes(t)).length;
      const bOverlap = b.tags.filter((t) => current.tags.includes(t)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, limit);
}
