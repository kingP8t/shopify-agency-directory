"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

import { getAdminClient } from "@/lib/supabase";
import { isGibberishListing } from "@/lib/listing-quality";
import { revalidatePath } from "next/cache";

// Shown when an admin tries to publish a listing that fails the quality check.
const NOT_PUBLISHABLE =
  "This listing looks like spam or unreadable text, such as a random letter name or description, so it cannot be published. Fix the name and description first, or leave it as a draft.";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export interface AgencyFormState {
  success: boolean;
  error?: string;
  id?: string;
}

export async function upsertAgencyAction(
  _prev: AgencyFormState,
  formData: FormData
): Promise<AgencyFormState> {
  const db: AnyClient = getAdminClient();

  const id = formData.get("id")?.toString() || undefined;
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const long_description =
    formData.get("long_description")?.toString().trim() || null;
  const location = formData.get("location")?.toString().trim() || null;
  const country = formData.get("country")?.toString().trim() || null;
  const website = formData.get("website")?.toString().trim() || null;
  const email = formData.get("email")?.toString().trim() || null;
  const founded = formData.get("founded")
    ? Number(formData.get("founded"))
    : null;
  const team_size = formData.get("team_size")?.toString().trim() || null;
  const budget_range = formData.get("budget_range")?.toString().trim() || null;
  const rating = formData.get("rating")
    ? Number(formData.get("rating"))
    : null;
  const featured = formData.get("featured") === "true";
  const status = formData.get("status")?.toString() || "draft";

  const specializations =
    formData
      .get("specializations")
      ?.toString()
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean) ?? [];

  const tags =
    formData
      .get("tags")
      ?.toString()
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean) ?? [];

  if (!name || !description) {
    return { success: false, error: "Name and description are required." };
  }

  // Minimum quality before a listing can go live. Drafts and pending listings
  // can still be saved so they can be fixed up.
  if (status === "published" && isGibberishListing({ name, description, website })) {
    return { success: false, error: NOT_PUBLISHABLE };
  }

  const slug = slugify(name);

  const payload = {
    name,
    slug,
    description,
    long_description,
    location,
    country,
    website,
    email,
    founded,
    team_size,
    budget_range,
    specializations,
    tags,
    rating,
    featured,
    status,
  };

  let result;
  if (id) {
    result = await db
      .from("agencies")
      .update(payload)
      .eq("id", id)
      .select("id")
      .single();
  } else {
    result = await db
      .from("agencies")
      .insert([payload])
      .select("id")
      .single();
  }

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/agencies");
  revalidatePath("/");

  return { success: true, id: result.data.id };
}

export async function deleteAgencyAction(
  id: string
): Promise<AgencyFormState> {
  const db: AnyClient = getAdminClient();

  const { error } = await db.from("agencies").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  revalidatePath("/agencies");
  revalidatePath("/");

  return { success: true };
}

export async function toggleStatusAction(
  id: string,
  currentStatus: string
): Promise<AgencyFormState> {
  const db: AnyClient = getAdminClient();

  const newStatus = currentStatus === "published" ? "draft" : "published";

  // Publishing runs the same quality check as the edit form. Unpublishing
  // never needs it.
  if (newStatus === "published") {
    const { data: listing } = await db
      .from("agencies")
      .select("name, description, website")
      .eq("id", id)
      .single();
    if (!listing) return { success: false, error: "Listing not found." };
    if (isGibberishListing(listing)) {
      return { success: false, error: NOT_PUBLISHABLE };
    }
  }

  const { error } = await db
    .from("agencies")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  revalidatePath("/agencies");
  revalidatePath("/");

  return { success: true };
}
