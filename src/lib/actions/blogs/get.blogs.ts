"use client";

import { useQuery } from "@tanstack/react-query";

import type { BlogListResponse, BlogQueryParams } from "@/types/blog-manage";

import { api as instance } from "@/lib/api";

const buildBlogParams = (params?: BlogQueryParams): BlogQueryParams => {
  if (!params) return {};

  const cleanedParams: BlogQueryParams = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    cleanedParams[key as keyof BlogQueryParams] = value;
  }

  return cleanedParams;
};

export const useGetBlogs = (params?: BlogQueryParams, enabled = true) => {
  return useQuery({
    queryKey: ["blogs-manage", params],
    enabled,
    queryFn: async () => {
      const response = await instance.get<BlogListResponse>("/blog", {
        params: buildBlogParams(params)
      });
      return response.data;
    }
  });
};
