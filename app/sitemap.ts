import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  ];

  const { data: agencies } = await supabase
    .from("agencies")
    .select("slug, updated_at")
    .eq("status", "published");

  const agencyRoutes: MetadataRoute.Sitemap = (agencies ?? []).map(
    (agency: { slug: string; updated_at: string }) => ({
      url: `${BASE_URL}/agencies/${agency.slug}`,
      lastModified: new Date(agency.updated_at),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...agencyRoutes];
}
