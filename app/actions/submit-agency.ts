"use server";

import { supabase } from "@/lib/supabase";

export interface SubmitAgencyState {
  success: boolean;
  error?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function submitAgencyAction(
  _prev: SubmitAgencyState,
  formData: FormData
): Promise<SubmitAgencyState> {
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const website = formData.get("website")?.toString().trim() || null;
  const email = formData.get("email")?.toString().trim();
  const location = formData.get("location")?.toString().trim() || null;
  const budget_range = formData.get("budget_range")?.toString().trim() || null;
  const team_size = formData.get("team_size")?.toString().trim() || null;

  const specializations = formData
    .get("specializations")
    ?.toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

  // Validation
  if (!name || !description || !email) {
    return {
      success: false,
      error: "Agency name, description, and contact email are required.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (description.length < 50) {
    return {
      success: false,
      error: "Description must be at least 50 characters.",
    };
  }

  const slug = slugify(name);

  const { error } = await supabase.from("agencies").insert([
    {
      name,
      slug,
      description,
      website,
      email,
      location,
      budget_range,
      team_size,
      specializations,
      status: "pending", // Requires admin review before going live
      featured: false,
    },
  ]);

  if (error) {
    // Slug already exists
    if (error.code === "23505") {
      return {
        success: false,
        error:
          "An agency with this name already exists in our directory. Please contact us if you believe this is an error.",
      };
    }
    return {
      success: false,
      error: "Something went wrong submitting your agency. Please try again.",
    };
  }

  return { success: true };
}
