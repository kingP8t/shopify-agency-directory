"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

import { getAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export interface BlogPostFormState {
  success: boolean;
  error?: string;
  id?: string;
}

export async function upsertBlogPostAction(
  _prev: BlogPostFormState,
  formData: FormData
): Promise<BlogPostFormState> {
  const db: AnyClient = getAdminClient();

  const id = formData.get("id")?.toString() || undefined;
  const title = formData.get("title")?.toString().trim();
  const excerpt = formData.get("excerpt")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "Guide";
  const author =
    formData.get("author")?.toString().trim() || "Shopify Agency Directory";
  const reading_time = formData.get("reading_time")
    ? Number(formData.get("reading_time"))
    : 5;
  const status = formData.get("status")?.toString() || "draft";
  const featured = formData.get("featured") === "true";
  const date =
    formData.get("date")?.toString().trim() ||
    new Date().toISOString().split("T")[0];
  const updated_date =
    formData.get("updated_date")?.toString().trim() || null;

  const tags =
    formData
      .get("tags")
      ?.toString()
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean) ?? [];

  // Content is stored as a JSON array of ContentBlock objects.
  // The form sends it as a JSON string; parse and validate it here.
  const contentRaw = formData.get("content")?.toString().trim() || "[]";
  let content: unknown[];
  try {
    const parsed = JSON.parse(contentRaw);
    if (!Array.isArray(parsed)) throw new Error("Content must be a JSON array");
    content = parsed;
  } catch {
    return {
      success: false,
      error:
        'Content must be valid JSON. Example: [{"type":"p","text":"Hello"}]',
    };
  }

  if (!title || !excerpt) {
    return { success: false, error: "Title and excerpt are required." };
  }

  const slug = slugify(title);

  const payload = {
    slug,
    title,
    excerpt,
    content,
    category,
    tags,
    author,
    reading_time,
    status,
    featured,
    date,
    updated_date: updated_date || null,
  };

  let result;
  if (id) {
    result = await db
      .from("blog_posts")
      .update(payload)
      .eq("id", id)
      .select("id")
      .single();
  } else {
    result = await db
      .from("blog_posts")
      .insert([payload])
      .select("id")
      .single();
  }

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");

  return { success: true, id: result.data.id };
}

export async function deleteBlogPostAction(
  id: string
): Promise<BlogPostFormState> {
  const db: AnyClient = getAdminClient();

  const { error } = await db.from("blog_posts").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");

  return { success: true };
}

export async function toggleBlogStatusAction(
  id: string,
  currentStatus: string
): Promise<BlogPostFormState> {
  const db: AnyClient = getAdminClient();

  const newStatus = currentStatus === "published" ? "draft" : "published";
  const { error } = await db
    .from("blog_posts")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");

  return { success: true };
}
