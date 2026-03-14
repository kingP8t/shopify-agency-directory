import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts, getCategorySlug, getDirectoryLinks, extractFaqItems, type ContentBlock, type DirectoryLink } from "@/lib/blog";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com";

// Revalidate individual blog posts every hour
export const revalidate = 3600;

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
    case "faq":
      return (
        <section className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <dl className="divide-y divide-gray-100">
            {block.items.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <dt className="text-sm font-semibold text-gray-900">{item.q}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-gray-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Mid-article directory CTA — injected ~40% through the article
// ---------------------------------------------------------------------------

function MidArticleCTA({ links }: { links: DirectoryLink[] }) {
  const primary = links[0];
  if (!primary) return null;

  return (
    <aside className="my-10 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
        From the Directory
      </p>
      <p className="mt-1 text-base font-semibold text-gray-900">
        Need help with this? Browse verified agencies.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.slice(0, 3).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1 rounded-lg border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm transition-colors hover:border-green-400 hover:bg-green-50"
          >
            {link.label}
            <span aria-hidden="true" className="text-green-400">→</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Contextual bottom CTA — replaces generic "find your agency" block
// ---------------------------------------------------------------------------

function BottomDirectoryCTA({ links, category }: { links: DirectoryLink[]; category: string }) {
  return (
    <div className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
      <p className="text-lg font-semibold text-gray-900">
        Find the Right Agency for Your Project
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Based on this {category.toLowerCase()} article, these directory pages are most relevant to you:
      </p>

      {/* Contextual directory links */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start gap-3 rounded-xl border border-gray-100 p-4 transition-all hover:border-green-200 hover:bg-green-50/50"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-sm text-green-600 group-hover:bg-green-200">
              →
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-green-700">
                {link.label}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Always include Get Matched as final CTA */}
      <div className="mt-6 flex flex-col items-center gap-3 border-t pt-6 sm:flex-row sm:justify-center">
        <Link
          href="/get-matched"
          className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700"
        >
          Get Matched Free — Takes 2 Minutes
        </Link>
        <Link
          href="/agencies"
          className="rounded-lg border px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Browse All Agencies →
        </Link>
      </div>
    </div>
  );
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
  const directoryLinks = getDirectoryLinks(post);
  const faqItems = extractFaqItems(post);

  // BlogPosting JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    image: `${SITE_URL}/opengraph-image`,
    publisher: {
      "@type": "Organization",
      name: "Shopify Agency Directory",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    timeRequired: `PT${post.readingTime}M`,
  };

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString(undefined, {
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
      {/* FAQPage schema — only rendered when post contains faq content blocks.
          Data is static/hardcoded in lib/blog.ts — no user input. */}
      {faqItems.length > 0 && (() => {
        const faqSchema = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        });
        return (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqSchema }}
          />
        );
      })()}

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

            {/* Article body with mid-article directory CTA */}
            <div>
              {(() => {
                // Insert a mid-article CTA ~40% through the content blocks
                const midPoint = Math.floor(post.content.length * 0.4);
                return post.content.map((block, i) => (
                  <span key={i}>
                    <RenderBlock block={block} />
                    {i === midPoint && <MidArticleCTA links={directoryLinks} />}
                  </span>
                ));
              })()}
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

          {/* Contextual bottom CTA — links to relevant directory filter pages */}
          <BottomDirectoryCTA links={directoryLinks} category={post.category} />
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
