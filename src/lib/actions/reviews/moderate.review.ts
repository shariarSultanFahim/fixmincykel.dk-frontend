"use client";

import { useMutation } from "@tanstack/react-query";

import type { ReviewModerationMutationResponse } from "@/types/review-moderation";

import { api as instance } from "@/lib/api";

export const useHideReview = () => {
  return useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await instance.patch<ReviewModerationMutationResponse>(
        `/review/hide/${reviewId}`,
        {
          isHidden: true
        }
      );

      return response.data;
    }
  });
};

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await instance.delete<ReviewModerationMutationResponse>(
        `/review/${reviewId}`
      );

      return response.data;
    }
  });
};
