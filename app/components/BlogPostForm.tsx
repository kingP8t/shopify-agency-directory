"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  upsertBlogPostAction,
  type BlogPostFormState,
} from "@/app/actions/blog";
import type { BlogPostDB } from "@/lib/supabase";

const CATEGORIES = [
  "Hiring Guide",
  "Platform Guide",
  "Pricing Guide",
  "Migration Guide",
  "Tools & Apps",
  "Case Study",
  "News",
];

const initialState: BlogPostFormState = { success: false };

interface BlogPostFormProps {
  post?: BlogPostDB;
  onClose?: () => void;
}

export default function BlogPostForm({ post, onClose }: BlogPostFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    upsertBlogPostAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      onClose?.();
    }
  }, [state.success, router, onClose]);

  const defaultContent = post?.content
    ? JSON.stringify(post.content, null, 2)
    : `[
  {"type": "p", "text": "Introduction paragraph here."},
  {"type": "h2", "text": "Section Heading"},
  {"type": "p", "text": "Section content here."},
  {"type": "ul", "items": ["Point one", "Point two", "Point three"]},
  {"type": "tip", "text": "A helpful pro tip box."},
  {"type": "cta", "text": "Ready to get started?", "href": "/get-matched", "label": "Get Matched Free →"}
]`;

  return (
    <form action={formAction} className="space-y-5">
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          required
          defaultValue={post?.title}
          placeholder="How to Choose a Shopify Agency"
          className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-400">
          Slug is auto-generated from the title (e.g. &ldquo;how-to-choose-a-shopify-agency&rdquo;)
        </p>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Excerpt <span className="text-red-500">*</span>
        </label>
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          placeholder="A short description shown on the blog listing page and in search results."
          className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
        />
      </div>

      {/* Category + Author row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            defaultValue={post?.category ?? "Hiring Guide"}
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            name="author"
            defaultValue={post?.author ?? "Shopify Agency Directory"}
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Tags + Reading Time row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            name="tags"
            defaultValue={post?.tags?.join(", ")}
            placeholder="shopify, hiring, guide"
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-400">Comma-separated</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reading Time (minutes)
          </label>
          <input
            name="reading_time"
            type="number"
            min={1}
            max={60}
            defaultValue={post?.reading_time ?? 5}
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Date + Updated Date row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Publish Date
          </label>
          <input
            name="date"
            type="date"
            defaultValue={
              post?.date ?? new Date().toISOString().split("T")[0]
            }
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Updated Date{" "}
            <span className="text-gray-400">(optional)</span>
          </label>
          <input
            name="updated_date"
            type="date"
            defaultValue={post?.updated_date ?? ""}
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Status + Featured row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            defaultValue={post?.status ?? "draft"}
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Featured
          </label>
          <select
            name="featured"
            defaultValue={post?.featured ? "true" : "false"}
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>

      {/* Content editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content (JSON)
        </label>
        <textarea
          name="content"
          rows={18}
          defaultValue={defaultContent}
          spellCheck={false}
          className="mt-1 block w-full rounded-lg border px-3 py-2 font-mono text-xs focus:border-green-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-400">
          JSON array of content blocks. Supported types:{" "}
          <code className="rounded bg-gray-100 px-1">p</code>,{" "}
          <code className="rounded bg-gray-100 px-1">h2</code>,{" "}
          <code className="rounded bg-gray-100 px-1">h3</code>,{" "}
          <code className="rounded bg-gray-100 px-1">ul</code>,{" "}
          <code className="rounded bg-gray-100 px-1">ol</code>,{" "}
          <code className="rounded bg-gray-100 px-1">tip</code>,{" "}
          <code className="rounded bg-gray-100 px-1">cta</code>
        </p>
      </div>

      {/* Error */}
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isPending ? "Saving…" : post ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
