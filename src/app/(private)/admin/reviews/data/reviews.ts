import type { ReviewModerationItem } from "@/types/review-moderation";

export const reviewModerationData: ReviewModerationItem[] = [
  {
    id: "review-1",
    userName: "Maria L.",
    workshopName: "Copenhagen Bike Repair",
    rating: 5,
    comment: "Fast service!",
    status: "visible",
    createdAt: "2024-10-15"
  },
  {
    id: "review-2",
    userName: "Lars N.",
    workshopName: "E-Bike Specialists",
    rating: 1,
    comment: "Wrong part installed. Had to go back twice to fix.",
    status: "flagged",
    createdAt: "2024-10-12"
  },
  {
    id: "review-3",
    userName: "Jens P.",
    workshopName: "City Cycle Fix",
    rating: 4,
    comment: "Good work, slightly delayed.",
    status: "visible",
    createdAt: "2024-10-10"
  },
  {
    id: "review-4",
    userName: "Sofia M.",
    workshopName: "Quick Bike Service",
    rating: 5,
    comment: "Excellent service and fair pricing!",
    status: "visible",
    createdAt: "2024-10-08"
  },
  {
    id: "review-5",
    userName: "Anna J.",
    workshopName: "Copenhagen Bike Repair",
    rating: 2,
    comment: "Took longer than expected and price increased without explanation.",
    status: "flagged",
    createdAt: "2024-10-05"
  }
];
