"use client";

import { useQuery } from "@tanstack/react-query";

import type { PublicReviewsApiResponse } from "@/types/review";

import { get } from "@/lib/api";

export const useGetPublicReviews = () => {
  return useQuery({
    queryKey: ["public-reviews"],
    queryFn: ({ signal }) => get<PublicReviewsApiResponse>("/review/public", { signal })
  });
};
