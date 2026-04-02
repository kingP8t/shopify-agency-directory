import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuthor, authorInitials } from "@/lib/authors";
import { getAllPosts } from "@/lib/blog";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BASE_URL, SITE_NAME } from "@/lib/seo";

// ---------------------------------------------------------------------------
// Static generation — one page per known author
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return [{ slug: "elena-king" }];
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
  const author =
    slug === "elena-king" ? getAuthor("Elena King") : undefined;
  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.name} — ${author.title}`,
    description: author.bio,
    alternates: { canonical: `${BASE_URL}/authors/${author.slug}` },
    openGraph: {
      title: `${author.name} — ${author.title} | ${SITE_NAME}`,
      description: author.schemaDescription,
      url: `${BASE_URL}/authors/${author.slug}`,
      type: "profile",
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author =
    slug === "elena-king" ? getAuthor("Elena King") : undefined;
  if (!author) notFound();

  const allPosts = await getAllPosts();
  const authorPosts = allPosts.filter((p) => p.author === author.name);

  // Person + ProfilePage JSON-LD for E-E-A-T — static trusted data only
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${BASE_URL}/authors/${author.slug}#person`,
      name: author.name,
      jobTitle: author.title,
      description: author.schemaDescription,
      url: `${BASE_URL}/authors/${author.slug}`,
      worksFor: { "@id": `${BASE_URL}/#organization` },
    },
  };

  return (
    <>
      {/* Person + ProfilePage schema — hardcoded author data, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        <SiteNav />

        <main className="mx-auto max-w-3xl px-6 py-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: author.name, href: `/authors/${author.slug}` },
            ]}
          />

          {/* Author header */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
                {authorInitials(author.name)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {author.name}
                </h1>
                <p className="mt-1 text-sm font-medium text-green-600">
                  {author.title}
                </p>
                <p className="mt-3 leading-relaxed text-gray-700">
                  {author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Posts by this author */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Articles by {author.name}
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({authorPosts.length})
              </span>
            </h2>

            <div className="mt-4 space-y-3">
              {authorPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-green-600">
                      {post.category}
                    </p>
                    <p className="mt-1 font-semibold text-gray-900 group-hover:text-green-700">
                      {post.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {post.excerpt}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {post.readingTime} min read ·{" "}
                      {new Date(post.date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
