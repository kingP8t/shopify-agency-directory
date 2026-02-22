"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

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

  // Parse array fields (comma-separated)
  const specializations = formData
    .get("specializations")
    ?.toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

  const tags = formData
    .get("tags")
    ?.toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

  if (!name || !description) {
    return { success: false, error: "Name and description are required." };
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
    result = await supabase
      .from("agencies")
      .update(payload)
      .eq("id", id)
      .select("id")
      .single();
  } else {
    result = await supabase
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

export async function deleteAgencyAction(id: string): Promise<AgencyFormState> {
  const { error } = await supabase.from("agencies").delete().eq("id", id);
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
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const { error } = await supabase
    .from("agencies")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  revalidatePath("/agencies");
  revalidatePath("/");

  return { success: true };
}
