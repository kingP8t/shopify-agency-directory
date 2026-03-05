import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts, getCategorySlug, type ContentBlock } from "@/lib/blog";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: "Shopify Agency Directory",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  };
}

// ---------------------------------------------------------------------------
// Content renderer
// ---------------------------------------------------------------------------

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-3 mt-10 text-xl font-bold text-gray-900 first:mt-0">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-900">
          {block.text}
        </h3>
      );
    case "p":
      return <p className="mb-4 leading-relaxed text-gray-700">{block.text}</p>;
    case "ul":
      return (
        <ul className="mb-4 space-y-2 pl-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 leading-relaxed text-gray-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-4 space-y-2 pl-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-gray-700">
              <span className="shrink-0 font-semibold text-green-600">
                {i + 1}.
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-800">💡 Pro Tip</p>
          <p className="mt-1 text-sm leading-relaxed text-green-700">
            {block.text}
          </p>
        </div>
      );
    case "cta":
      return (
        <div className="my-8 rounded-2xl bg-green-600 p-8 text-center text-white">
          <p className="text-lg font-semibold">{block.text}</p>
          <Link
            href={block.href}
            className="mt-4 inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50"
          >
            {block.label}
          </Link>
        </div>
      );
    case "table":
      return (
        <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-semibold text-gray-700 first:rounded-tl-xl last:rounded-tr-xl"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-gray-100 odd:bg-white even:bg-gray-50">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-3 leading-snug text-gray-700 ${ci === 0 ? "font-medium text-gray-900" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

  // Article JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Shopify Agency Directory",
      url: SITE_URL,
    },
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    timeRequired: `PT${post.readingTime}M`,
  };

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        <SiteNav />

        <main className="mx-auto max-w-3xl px-6 py-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          {/* Article header */}
          <article>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <Link
                href={`/blog/category/${getCategorySlug(post.category)}`}
                className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 hover:bg-green-200"
              >
                {post.category}
              </Link>
              <span>·</span>
              <span>{post.readingTime} min read</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {post.title}
            </h1>
            <p className="mt-3 text-lg text-gray-500">{post.excerpt}</p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-500"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <hr className="my-8 border-gray-200" />

            {/* Article body */}
            <div>
              {post.content.map((block, i) => (
                <RenderBlock key={i} block={block} />
              ))}
            </div>
          </article>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-lg font-bold text-gray-900">
                Related Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group rounded-xl border bg-white p-5 shadow-sm hover:shadow-md"
                  >
                    <p className="text-xs font-medium text-green-600">
                      {p.category}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-green-700">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {p.readingTime} min read
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl border bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-900">
              Ready to find your perfect Shopify agency?
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Browse our directory of verified agencies or get personally matched.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/get-matched"
                className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Get Matched Free
              </Link>
              <Link
                href="/agencies"
                className="rounded-lg border px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Browse Agencies →
              </Link>
            </div>
          </div>
        </main>

        <footer className="mt-12 border-t bg-white px-6 py-8 text-sm text-gray-500">
          <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Shopify Agency Directory</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
