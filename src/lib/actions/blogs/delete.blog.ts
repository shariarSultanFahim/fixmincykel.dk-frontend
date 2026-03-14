"use client";

import { useMutation } from "@tanstack/react-query";

import type { BlogMutationResponse } from "@/types/blog-manage";

import { api as instance } from "@/lib/api";

export const useDeleteBlog = () => {
  return useMutation({
    mutationFn: async (blogId: string) => {
      const response = await instance.delete<BlogMutationResponse>(`/blog/${blogId}`);
      return response.data;
    }
  });
};
