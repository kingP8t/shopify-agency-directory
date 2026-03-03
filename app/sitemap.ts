import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { getAllPosts, getAllCategoryPairs } from "@/lib/blog";

// Always use HTTPS in production. Never let localhost leak into the sitemap.
function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  // Strip trailing slash
  const clean = raw.replace(/\/$/, "");
  // If it's localhost or empty, fall back to Vercel's production URL env var
  if (!clean || clean.includes("localhost")) {
    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (vercelUrl) return `https://${vercelUrl}`;
    return "";
  }
  // Force https:// in production
  if (process.env.NODE_ENV === "production" && clean.startsWith("http://")) {
    return clean.replace("http://", "https://");
  }
  return clean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = getSiteUrl();

  // If we can't resolve a real production URL, return empty sitemap
  if (!BASE_URL) return [];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/agencies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/get-matched`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const { data: agencies } = await supabase
    .from("agencies")
    .select("slug, updated_at")
    .eq("status", "published");

  const agencyRoutes: MetadataRoute.Sitemap = (agencies ?? []).map(
    (agency: { slug: string; updated_at: string }) => ({
      url: `${BASE_URL}/agencies/${agency.slug}`,
      lastModified: new Date(agency.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const allPosts = await getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategoryPairs().map(({ slug }) => ({
    url: `${BASE_URL}/blog/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...agencyRoutes, ...blogRoutes, ...categoryRoutes];
}
