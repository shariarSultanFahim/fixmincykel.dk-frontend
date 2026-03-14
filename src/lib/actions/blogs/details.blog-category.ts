"use client";

import { useQuery } from "@tanstack/react-query";

import type { BlogCategoryDetailsResponse } from "@/types/blog-manage";

import { api as instance } from "@/lib/api";

export const useGetBlogCategoryDetails = (categoryId: string) => {
  return useQuery({
    queryKey: ["blog-category-details", categoryId],
    enabled: !!categoryId,
    queryFn: async () => {
      const response = await instance.get<BlogCategoryDetailsResponse>(
        `/blog-category/${categoryId}`
      );
      return response.data;
    }
  });
};
