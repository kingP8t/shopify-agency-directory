"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteBlogPostAction,
  toggleBlogStatusAction,
} from "@/app/actions/blog";
import BlogPostForm from "@/app/components/BlogPostForm";
import type { BlogPostDB } from "@/lib/supabase";

interface AdminBlogRowProps {
  post: BlogPostDB;
}

export default function AdminBlogRow({ post }: AdminBlogRowProps) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await deleteBlogPostAction(post.id);
    router.refresh();
  }

  async function handleToggle() {
    setToggling(true);
    await toggleBlogStatusAction(post.id, post.status);
    setToggling(false);
    router.refresh();
  }

  if (editing) {
    return (
      <li className="rounded-xl border bg-gray-50 p-5">
        <p className="mb-4 font-medium text-gray-900">
          Editing: {post.title}
        </p>
        <BlogPostForm post={post} onClose={() => setEditing(false)} />
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-3 rounded-xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-gray-900">{post.title}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              post.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {post.status}
          </span>
          {post.featured && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              Featured
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          📅 {post.date} · {post.category} · {post.reading_time} min read
        </p>
        <p className="mt-0.5 font-mono text-xs text-gray-400">/blog/{post.slug}</p>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-50 ${
            post.status === "published"
              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {toggling
            ? "…"
            : post.status === "published"
            ? "Unpublish"
            : "Publish"}
        </button>
        <a
          href={`/blog/${post.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
        >
          View ↗
        </a>
        <button
          onClick={() => setEditing(true)}
          className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
    </li>
  );
}
