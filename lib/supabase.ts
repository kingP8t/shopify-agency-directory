import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// Typed query helpers
// ---------------------------------------------------------------------------

export interface Agency {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string | null;
  location: string | null;
  country: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  logo_url: string | null;
  founded: number | null;
  team_size: string | null;
  budget_range: string | null;
  specializations: string[] | null;
  tags: string[] | null;
  rating: number | null;
  review_count: number | null;
  featured: boolean;
  status: "published" | "draft" | "pending";
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  message: string;
  agency_id: string | null;
  created_at?: string;
}

// Fetch a single published agency by slug
export async function getAgencyBySlug(slug: string): Promise<Agency | null> {
  const { data, error } = await supabase
    .from("agencies")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as Agency;
}

// Fetch all published agencies (with optional filters)
export async function getAgencies(options?: {
  specialization?: string;
  location?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}): Promise<Agency[]> {
  let query = supabase
    .from("agencies")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });

  if (options?.featured) query = query.eq("featured", true);
  if (options?.location) query = query.ilike("location", `%${options.location}%`);
  if (options?.specialization)
    query = query.contains("specializations", [options.specialization]);
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.range(options.offset, (options.offset + (options.limit ?? 20)) - 1);

  const { data, error } = await query;
  if (error) return [];
  return (data as Agency[]) ?? [];
}

// Submit a lead / contact request
export async function submitLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("leads").insert([lead]);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
