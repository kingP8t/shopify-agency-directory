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
};

/** Look up an author by name. Returns undefined for unknown authors. */
export function getAuthor(name: string): Author | undefined {
  return AUTHORS[name];
}

/** Get initials from a name (e.g. "Elena King" → "EK"). */
export function authorInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}
