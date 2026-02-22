"use client";

import { useState } from "react";

import type { PendingReview, ReviewFormDialogState, ReviewItem } from "@/types/review";

import { cn } from "@/lib/utils";

import { pendingReviewsData, reviewListData, reviewSummaryStatsData } from "@/data";

import { Separator } from "@/ui";

import { PendingReviewCard, ReviewCard, ReviewFormDialog, ReviewSummaryBar } from "./components";

export function ReviewsView() {
  const [activeDialog, setActiveDialog] = useState<ReviewFormDialogState | null>(null);

  const openPendingDialog = (pendingReview: PendingReview) =>
    setActiveDialog({ mode: "pending", pendingReview });

  const openEditDialog = (review: ReviewItem) => setActiveDialog({ mode: "edit", review });
  const isDialogOpen = Boolean(activeDialog);

  return (
    <div className="">
      <div className="mx-auto flex w-full flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-navy">Your workshop reviews</h1>
          <p className="max-w-2xl text-sm text-navy/70">
            Track your feedback, see ratings at a glance, and share new reviews after every repair.
          </p>
        </div>

        <ReviewSummaryBar stats={reviewSummaryStatsData} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy">Recent reviews</h2>
            <span className="text-xs text-muted-foreground">
              Showing {reviewListData.length} of {reviewSummaryStatsData.totalReviews} reviews
            </span>
          </div>
          <div className="grid gap-4">
            {reviewListData.map((review) => (
              <ReviewCard key={review.id} review={review} onEdit={openEditDialog} />
            ))}
          </div>
        </div>

        <Separator className="bg-muted" />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold text-navy">Pending reviews</h2>
            <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-navy">
              {pendingReviewsData.length} waiting
            </span>
          </div>
          <div className={cn("grid gap-4", pendingReviewsData.length === 0 && "text-sm")}>
            {pendingReviewsData.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending reviews right now.</p>
            ) : (
              pendingReviewsData.map((pendingReview) => (
                <PendingReviewCard
                  key={pendingReview.id}
                  pendingReview={pendingReview}
                  onOpen={openPendingDialog}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <ReviewFormDialog
        state={activeDialog}
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) setActiveDialog(null);
        }}
      />
    </div>
  );
}
