import type { PendingReview, ReviewItem, ReviewSummaryStats } from "@/types/review";

export const reviewSummaryStatsData: ReviewSummaryStats = {
  averageRating: 4.7,
  totalReviews: 6,
  fiveStarReviews: 5,
  helpfulVotes: 35
};

export const reviewListData: ReviewItem[] = [
  {
    id: "review-2045",
    workshopName: "City Cycle Fix",
    jobId: "JOB-2045",
    jobTitle: "Flat Tire Repair",
    rating: 5,
    date: "2026-01-28",
    message:
      "Excellent service! They fixed my tire quickly and the price was very reasonable. Highly recommend!",
    helpfulCount: 12
  },
  {
    id: "review-2042",
    workshopName: "Quick Bike Service",
    jobId: "JOB-2042",
    jobTitle: "Chain Replacement",
    rating: 4,
    date: "2026-01-20",
    message:
      "Good work overall. The chain replacement was done professionally, though I had to wait a bit longer than expected.",
    helpfulCount: 8
  },
  {
    id: "review-2038",
    workshopName: "Bike Masters",
    jobId: "JOB-2038",
    jobTitle: "Full Service",
    rating: 5,
    date: "2026-01-10",
    message:
      "Fantastic full service! My bike feels like new. They were thorough and explained everything they did.",
    helpfulCount: 15
  }
];

export const pendingReviewsData: PendingReview[] = [
  {
    id: "pending-2198",
    workshopName: "Copenhagen Bike Repair",
    jobTitle: "Brake Squeaking",
    scheduledFor: "2026-02-23",
    note: "Your repair is scheduled for tomorrow. You'll be able to leave a review after completion."
  }
];
