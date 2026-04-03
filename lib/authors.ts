// ---------------------------------------------------------------------------
// Author data — single source of truth for bylines, bios, and schema.
// Add new authors here; the blog post pages resolve by `post.author` name.
// ---------------------------------------------------------------------------

export interface Author {
  name: string;
  slug: string;
  title: string;
  bio: string;
  /** Used for Person schema `description` — one sentence. */
  schemaDescription: string;
}

const AUTHORS: Record<string, Author> = {
  "Elena King": {
    name: "Elena King",
    slug: "elena-king",
    title: "Sales & Marketing Expert",
    bio: "Elena King is a sales and marketing expert specializing in Shopify and ecommerce growth. With years of experience helping merchants find the right agency partners, she writes actionable guides on hiring, budgeting, platform strategy, and scaling online stores. Her work is informed by direct relationships with hundreds of Shopify agencies worldwide.",
    schemaDescription:
      "Shopify and ecommerce growth specialist helping merchants find the right agency partners.",
  },
  "Varine Rashford": {
    name: "Varine Rashford",
    slug: "varine-rashford",
    title: "Content & Paid Ad Specialist",
    bio: "Varine Rashford is a content and paid advertising specialist with deep expertise in ecommerce migration strategy and Shopify platform economics. She helps merchants navigate complex platform decisions with data-driven analysis, covering everything from migration planning and development costs to agency evaluation and proposal assessment.",
    schemaDescription:
      "Content and paid advertising specialist covering Shopify migration strategy and platform economics.",
  },
};

/** Look up an author by name. Returns undefined for unknown authors. */
export function getAuthor(name: string): Author | undefined {
  return AUTHORS[name];
}

/** Look up an author by slug. Returns undefined for unknown authors. */
export function getAuthorBySlug(slug: string): Author | undefined {
  return Object.values(AUTHORS).find((a) => a.slug === slug);
}

/** Get initials from a name (e.g. "Elena King" → "EK"). */
export function authorInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}
