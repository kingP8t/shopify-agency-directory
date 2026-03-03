import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategoryPairs,
  getPostsByCategory,
  SLUG_TO_CATEGORY,
  CATEGORY_DESCRIPTIONS,
  getCategorySlug,
} from "@/lib/blog";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const SITE_URL = "https://shopifyagencydirectory.com";

const CATEGORY_COLORS: Record<string, string> = {
  "Hiring Guide":    "bg-green-100 text-green-700",
  "Platform Guide":  "bg-blue-100 text-blue-700",
  "Pricing Guide":   "bg-purple-100 text-purple-700",
  "Migration Guide": "bg-orange-100 text-orange-700",
  "Tools & Apps":    "bg-yellow-100 text-yellow-700",
  "SEO":             "bg-red-100 text-red-700",
};

export async function generateStaticParams() {
  return getAllCategoryPairs().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = SLUG_TO_CATEGORY[slug];
  if (!category) return { title: "Category Not Found" };

  const description =
    CATEGORY_DESCRIPTIONS[category] ??
    `Browse all ${category} articles on Shopify Agency Directory.`;

  return {
    title: `${category} — Shopify Blog`,
    description,
    alternates: { canonical: `${SITE_URL}/blog/category/${slug}` },
    openGraph: {
      title: `${category} — Shopify Blog`,
      description,
      url: `${SITE_URL}/blog/category/${slug}`,
      siteName: "Shopify Agency Directory",
      type: "website",
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = SLUG_TO_CATEGORY[slug];
  if (!category) notFound();

  const posts = await getPostsByCategory(slug);
  const description = CATEGORY_DESCRIPTIONS[category] ?? "";
  const badgeClass = CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-600";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} — Shopify Blog`,
    description,
    url: `${SITE_URL}/blog/category/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Shopify Agency Directory",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        <SiteNav />

        <main className="mx-auto max-w-6xl px-6 py-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: category, href: `/blog/category/${slug}` },
            ]}
          />

          <div className="mb-8">
            <span
              className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
            >
              {category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900">{category}</h1>
            <p className="mt-2 max-w-2xl text-gray-500">{description}</p>
          </div>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-32 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-4xl font-black text-gray-300">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.readingTime} min read
                      </span>
                    </div>
                    <h2 className="mt-3 font-semibold text-gray-900 group-hover:text-green-700">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-gray-400">
                      {formatDate(post.date)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="mt-10">
            <a
              href="/blog"
              className="text-sm font-medium text-green-700 hover:underline"
            >
              ← All articles
            </a>
          </div>
        </main>

        <footer className="mt-16 border-t bg-white px-6 py-8 text-sm text-gray-500">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Shopify Agency Directory</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-gray-900">Privacy</a>
              <a href="/terms" className="hover:text-gray-900">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
