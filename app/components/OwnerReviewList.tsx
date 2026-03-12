"use client";

import { useState, useActionState } from "react";
import {
  respondToReviewAction,
  deleteReplyAction,
  type OwnerReplyState,
} from "@/app/actions/claim";

interface OwnerReview {
  id: string;
  reviewer_name: string;
  body: string;
  rating: number;
  approved: boolean;
  owner_reply: string | null;
  owner_replied_at: string | null;
  created_at: string;
}

interface OwnerReviewListProps {
  reviews: OwnerReview[];
  slug: string;
}

function ReviewReplyForm({
  reviewId,
  slug,
  existingReply,
}: {
  reviewId: string;
  slug: string;
  existingReply: string | null;
}) {
  const [replyText, setReplyText] = useState(existingReply ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const initialState: OwnerReplyState = { success: false };
  const [state, formAction, isPending] = useActionState(
    respondToReviewAction,
    initialState
  );
  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteReplyAction,
    initialState
  );

  // After a successful delete, show the empty reply form
  const currentReply = deleteState.success ? null : (state.success ? replyText : existingReply);

  // Show the existing reply with edit/delete options
  if (currentReply && !isEditing) {
    return (
      <div className="mt-3 rounded-lg border-l-2 border-green-400 bg-gray-50 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-gray-500">Your response</p>
            <p className="mt-1 text-sm text-gray-700">{currentReply}</p>
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => {
                setReplyText(currentReply);
                setIsEditing(true);
              }}
              className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            >
              Edit
            </button>
            <form action={deleteAction}>
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="review_id" value={reviewId} />
              <button
                type="submit"
                disabled={isDeleting}
                className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
              >
                {isDeleting ? "..." : "Delete"}
              </button>
            </form>
          </div>
        </div>
        {deleteState.error && (
          <p className="mt-1 text-xs text-red-600">{deleteState.error}</p>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="review_id" value={reviewId} />
      <textarea
        name="reply"
        rows={2}
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write a response to this review..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
      {state.error && (
        <p className="text-xs text-red-600">{state.error}</p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-green-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-60"
        >
          {isPending ? "Saving..." : isEditing ? "Update Response" : "Post Response"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-lg border border-gray-300 px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function OwnerReviewList({
  reviews,
  slug,
}: OwnerReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-400">No reviews yet.</p>
    );
  }

  return (
    <ul className="mt-4 divide-y divide-gray-100">
      {reviews.map((review) => (
        <li key={review.id} className="py-5 first:pt-0 last:pb-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900">
                  {review.reviewer_name}
                </p>
                {!review.approved && (
                  <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                    Pending approval
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    aria-hidden="true"
                    className={
                      star <= review.rating
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <time className="shrink-0 text-xs text-gray-400">
              {new Date(review.created_at).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {review.body}
          </p>

          {/* Owner reply section — only shown for approved reviews */}
          {review.approved && (
            <ReviewReplyForm
              reviewId={review.id}
              slug={slug}
              existingReply={review.owner_reply}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
