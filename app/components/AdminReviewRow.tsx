"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approveReviewAction, deleteReviewAction } from "@/app/actions/reviews";

export interface AdminReview {
  id: string;
  reviewer_name: string;
  rating: number;
  body: string | null;
  approved: boolean;
  created_at: string;
  agency_name: string;
  agency_slug: string;
}

interface AdminReviewRowProps {
  review: AdminReview;
}

export default function AdminReviewRow({ review }: AdminReviewRowProps) {
  const [approving, setApproving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleApprove() {
    setApproving(true);
    await approveReviewAction(review.id);
    router.refresh();
  }

  async function handleDelete() {
    if (
      !confirm(
        `Delete this review by "${review.reviewer_name}"? This cannot be undone.`
      )
    )
      return;
    setDeleting(true);
    await deleteReviewAction(review.id);
    router.refresh();
  }

  return (
    <li className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        {/* Reviewer + agency + date */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-gray-900">
            {review.reviewer_name}
          </span>
          <span className="text-gray-400">on</span>
          <a
            href={`/agencies/${review.agency_slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green-700 hover:underline"
          >
            {review.agency_name}
          </a>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              review.approved
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {review.approved ? "approved" : "pending"}
          </span>
        </div>

        {/* Stars + date */}
        <div className="mt-1 flex items-center gap-3">
          <span className="text-sm text-yellow-500">
            {"★".repeat(review.rating)}
            <span className="text-gray-200">
              {"★".repeat(5 - review.rating)}
            </span>
          </span>
          <time className="text-xs text-gray-400">
            {new Date(review.created_at).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>

        {/* Body */}
        {review.body && (
          <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-3">
            {review.body}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2">
        {!review.approved && (
          <button
            onClick={handleApprove}
            disabled={approving}
            className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-200 disabled:opacity-50"
          >
            {approving ? "…" : "Approve"}
          </button>
        )}
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
