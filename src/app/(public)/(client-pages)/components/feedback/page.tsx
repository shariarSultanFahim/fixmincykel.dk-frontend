"use client";

import { useMemo } from "react";

import type { PublicReviewApiItem } from "@/types/review";

import { useGetPublicReviews } from "@/lib/actions/reviews/public-reviews";

import Title from "../section-title";
import { FeedbackCarousel } from "./carousel";

export default function Feedback() {
  const { data: publicReviewsResponse, isLoading } = useGetPublicReviews();

  const feedbacks = useMemo(() => {
    const reviews = publicReviewsResponse?.data ?? [];

    return reviews
      .filter((review: PublicReviewApiItem) => !review.isHidden && !review.isFlagged)
      .map((review: PublicReviewApiItem, index: number) => ({
        id: index + 1,
        name: review.user?.name || "Anonymous Rider",
        title: "Verified Rider",
        feedback: review.comment,
        avatar:
          review.user?.avatar ||
          `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(review.user?.name || "Anonymous")}`
      }));
  }, [publicReviewsResponse]);

  if (!isLoading && feedbacks.length === 0) {
    return <div className="" />;
  }

  return (
    <section className="container py-20">
      <div className="flex flex-col items-center space-y-5">
        <Title title="Builders love FixMinCykel.dk" subtitle="" />
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading feedback...</p>
        ) : (
          <FeedbackCarousel feedbacks={feedbacks} />
        )}
      </div>
    </section>
  );
}
