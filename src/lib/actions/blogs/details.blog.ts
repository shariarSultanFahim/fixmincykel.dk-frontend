"use client";

import { useQuery } from "@tanstack/react-query";

import type { BlogDetailsResponse } from "@/types/blog-manage";

import { api as instance } from "@/lib/api";

export const useGetBlogDetails = (blogId: string) => {
  return useQuery({
    queryKey: ["blog-details", blogId],
    enabled: !!blogId,
    queryFn: async () => {
      const response = await instance.get<BlogDetailsResponse>(`/blog/${blogId}`);
      return response.data;
    }
  });
};
