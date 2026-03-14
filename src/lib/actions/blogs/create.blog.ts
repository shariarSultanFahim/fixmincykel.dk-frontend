"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { BlogFormInput, BlogMutationResponse } from "@/types/blog-manage";

import { api as instance } from "@/lib/api";

const toFormData = (payload: BlogFormInput) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("subTitle", payload.subTitle);
  formData.append("readTime", payload.readTime);
  formData.append("authorId", payload.authorId);
  formData.append("categoryId", payload.categoryId);

  payload.contents.forEach((content, index) => {
    formData.append(`contents[${index}][heading]`, content.heading);
    formData.append(`contents[${index}][details]`, content.details);
  });

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BlogFormInput) => {
      const response = await instance.post<BlogMutationResponse>("/blog", toFormData(payload), {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs-manage"] });
    }
  });
};
