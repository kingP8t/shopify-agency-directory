import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shopify Blog — Guides, Tips & Agency Advice",
  description:
    "Expert guides on hiring Shopify agencies, platform comparisons, migration advice, and ecommerce growth strategies.",
  alternates: { canonical: "https://shopifyagencydirectory.com/blog" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Hiring Guide": "bg-green-100 text-green-700",
  "Platform Guide": "bg-blue-100 text-blue-700",
  "Pricing Guide": "bg-purple-100 text-purple-700",
  "Migration Guide": "bg-orange-100 text-orange-700",
  "Tools & Apps": "bg-yellow-100 text-yellow-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopify Agency Blog</h1>
          <p className="mt-2 text-gray-500">
            Guides, tips and advice for merchants working with Shopify agencies.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <a
            href={`/blog/${featured.slug}`}
            className="group mb-10 flex flex-col gap-6 overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md sm:flex-row"
          >
            {/* Colour banner */}
            <div className="flex h-48 w-full shrink-0 items-center justify-center bg-gradient-to-br from-green-500 to-green-700 sm:h-auto sm:w-72">
              <span className="text-5xl font-black text-white/20">
                {featured.title.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[featured.category] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {featured.category}
                </span>
                <span className="text-xs text-gray-400">
                  {featured.readingTime} min read
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-green-700">
                {featured.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {featured.excerpt}
              </p>
              <p className="mt-4 text-xs text-gray-400">{formatDate(featured.date)}</p>
            </div>
          </a>
        )}

        {/* Rest of posts grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Colour banner */}
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <span className="text-4xl font-black text-gray-300">
                  {post.title.charAt(0)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-600"}`}
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
                <p className="mt-4 text-xs text-gray-400">{formatDate(post.date)}</p>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
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
  );
}
