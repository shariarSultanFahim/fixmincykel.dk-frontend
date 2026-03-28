"use client";

import { useState } from "react";

import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { PendingReview, ReviewFormDialogState, ReviewItem } from "@/types/review";

import { useGetMyProfile } from "@/lib/actions/users/profile.user";
import {
  useCreateReview,
  useGetPendingReviews,
  useGetUserReviews
} from "@/lib/actions/reviews/user-reviews";

import { cn } from "@/lib/utils";

import { Separator } from "@/ui";

import { PendingReviewCard, ReviewCard, ReviewFormDialog, ReviewSummaryBar } from "./components";

export function ReviewsView() {
  const [activeDialog, setActiveDialog] = useState<ReviewFormDialogState | null>(null);

  const { data: profileData } = useGetMyProfile();
  const userId = profileData?.data?.id;

  const { data: pendingReviewsResponse } = useGetPendingReviews();
  const { data: userReviewsResponse } = useGetUserReviews(userId);
  const createReviewMutation = useCreateReview();

  const pendingReviewsData: PendingReview[] = (pendingReviewsResponse?.data ?? []).map(
    (review) => ({
      id: review.id,
      bookingId: review.id,
      workshopName: review.workshop?.workshopName ?? "Workshop",
      jobTitle: `Job ${review.jobId.slice(0, 8)}`,
      scheduledFor: review.scheduleStart,
      note: "Your booking is completed. Share your repair experience."
    })
  );

  const reviewListData: ReviewItem[] = (userReviewsResponse?.data ?? []).map((review) => ({
    id: review.id,
    workshopName: "Workshop",
    jobId: review.booking?.jobId ?? review.bookingId,
    jobTitle: `Booking ${review.bookingId.slice(0, 8)}`,
    rating: review.rating,
    date: review.createdAt,
    message: review.comment,
    helpfulCount: 0
  }));

  const totalReviews = reviewListData.length;
  const fiveStarReviews = reviewListData.filter((review) => review.rating === 5).length;
  const averageRating = totalReviews
    ? reviewListData.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  const reviewSummaryStatsData = {
    averageRating,
    totalReviews,
    fiveStarReviews,
    helpfulVotes: 0
  };

  const openPendingDialog = (pendingReview: PendingReview) =>
    setActiveDialog({ mode: "pending", pendingReview });
  const isDialogOpen = Boolean(activeDialog);

  const handleSubmitReview = async (values: { rating: number; comment: string }) => {
    if (!activeDialog?.pendingReview?.bookingId || !userId) {
      toast.error("Missing booking or user information.");
      return;
    }

    try {
      const response = await createReviewMutation.mutateAsync({
        bookingId: activeDialog.pendingReview.bookingId,
        userId,
        rating: values.rating,
        comment: values.comment
      });

      toast.success(response.message || "Review created successfully.");
      setActiveDialog(null);
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Failed to submit review.";
      toast.error(message);
    }
  };

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
              <ReviewCard key={review.id} review={review} />
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
        onSubmit={handleSubmitReview}
        isSubmitting={createReviewMutation.isPending}
        onOpenChange={(open) => {
          if (!open) setActiveDialog(null);
        }}
      />
    </div>
  );
}
