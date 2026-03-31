"use client";

import { useMutation } from "@tanstack/react-query";

import type { BlogMutationResponse, BlogUpdateInput } from "@/types/blog-manage";

import { api as instance } from "@/lib/api";

interface UpdateBlogParams {
  blogId: string;
  payload: BlogUpdateInput;
}

const toFormData = (payload: BlogUpdateInput) => {
  const formData = new FormData();

  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.subTitle !== undefined) formData.append("subTitle", payload.subTitle);
  if (payload.readTime !== undefined) formData.append("readTime", payload.readTime);
  if (payload.authorId !== undefined) formData.append("authorId", payload.authorId);
  if (payload.categoryId !== undefined) formData.append("categoryId", payload.categoryId);
  if (payload.contents !== undefined) {
    payload.contents.forEach((content, index) => {
      formData.append(`contents[${index}][heading]`, content.heading);
      formData.append(`contents[${index}][details]`, content.details);
    });
  }
  if (payload.image) formData.append("image", payload.image);

  return formData;
};

export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: async ({ blogId, payload }: UpdateBlogParams) => {
      const response = await instance.patch<BlogMutationResponse>(
        `/blog/${blogId}`,
        toFormData(payload),
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response.data;
    }
  });
};
