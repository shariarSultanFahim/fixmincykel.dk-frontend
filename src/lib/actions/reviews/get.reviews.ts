"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  ReviewModerationQueryParams,
  ReviewModerationResponse
} from "@/types/review-moderation";

import { api as instance } from "@/lib/api";

const buildReviewParams = (params?: ReviewModerationQueryParams): ReviewModerationQueryParams => {
  if (!params) {
    return {};
  }

  const cleanedParams: ReviewModerationQueryParams = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === "string" && value.trim() === "") {
      continue;
    }

    cleanedParams[key as keyof ReviewModerationQueryParams] = value;
  }

  return cleanedParams;
};

export const useGetReviews = (params?: ReviewModerationQueryParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["reviews-manage", params],
    enabled,
    queryFn: async () => {
      const response = await instance.get<ReviewModerationResponse>("/review", {
        params: buildReviewParams(params)
      });

      return response.data;
    }
  });
};
