"use client";

import { useQuery } from "@tanstack/react-query";

import type { PlatformCategoryListResponse, PlatformDataResponse } from "@/types/platform-data";

import { api as instance } from "@/lib/api";

export const useGetPlatformData = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["platform-data"],
    enabled,
    queryFn: async () => {
      const response = await instance.get<PlatformDataResponse>("/platform-data");
      return response.data;
    }
  });
};

export const useGetPlatformCategories = (
  page: number = 1,
  limit: number = 100,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["platform-categories", page, limit],
    enabled,
    queryFn: async () => {
      const response = await instance.get<PlatformCategoryListResponse>("/category", {
        params: {
          page,
          limit,
          sortBy: "name",
          sortOrder: "asc"
        }
      });

      return response.data;
    }
  });
};
