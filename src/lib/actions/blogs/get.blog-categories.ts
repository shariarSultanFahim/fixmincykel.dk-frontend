"use client";

import { useQuery } from "@tanstack/react-query";

import type { BlogCategoryListResponse } from "@/types/blog-manage";

import { api as instance } from "@/lib/api";

export const useGetBlogCategories = (page = 1, limit = 50, enabled = true) => {
  return useQuery({
    queryKey: ["blog-categories", page, limit],
    enabled,
    queryFn: async () => {
      const response = await instance.get<BlogCategoryListResponse>("/blog-category", {
        params: { page, limit }
      });
      return response.data;
    }
  });
};
