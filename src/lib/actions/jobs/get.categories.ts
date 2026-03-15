"use client";

import { useQuery } from "@tanstack/react-query";

import type { JobCategoryListResponse } from "@/types/job-create";

import { api as instance } from "@/lib/api";

export const useGetCategories = (page = 1, limit = 500, sortBy = "createdAt", enabled = true) => {
  return useQuery({
    queryKey: ["job-categories", page, limit],
    enabled,
    queryFn: async () => {
      const response = await instance.get<JobCategoryListResponse>("/category", {
        params: { page, limit, sortBy }
      });
      return response.data;
    }
  });
};
