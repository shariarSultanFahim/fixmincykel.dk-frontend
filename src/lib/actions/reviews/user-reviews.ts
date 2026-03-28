"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { get, post } from "@/lib/api";

import type {
  PendingReviewApiResponse,
  ReviewCreatePayload,
  ReviewCreateResponse,
  UserReviewsApiResponse
} from "@/types/review";

export const pendingReviewsQueryKey = ["user-reviews", "pending"] as const;
export const userReviewsQueryKey = (userId?: string) => ["user-reviews", "list", userId] as const;

export const useGetPendingReviews = () => {
  return useQuery({
    queryKey: pendingReviewsQueryKey,
    queryFn: ({ signal }) => get<PendingReviewApiResponse>("/review/pending-reviews/get", { signal })
  });
};

export const useGetUserReviews = (userId?: string) => {
  return useQuery({
    queryKey: userReviewsQueryKey(userId),
    enabled: Boolean(userId),
    queryFn: ({ signal }) => get<UserReviewsApiResponse>(`/review/user/${userId}`, { signal })
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReviewCreatePayload) =>
      post<ReviewCreateResponse, ReviewCreatePayload>("/review", payload),
    onSuccess: (_response, variables) => {
      void queryClient.invalidateQueries({ queryKey: pendingReviewsQueryKey });
      void queryClient.invalidateQueries({ queryKey: userReviewsQueryKey(variables.userId) });
    }
  });
};