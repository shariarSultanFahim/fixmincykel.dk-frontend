"use client";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { AdminBlog } from "@/types/blog-manage";

import { useGetBlogCategories } from "@/lib/actions/blogs/get.blog-categories";
import { useUpdateBlog } from "@/lib/actions/blogs/update.blog";

import BlogForm from "../../../components/forms/BlogForm";
import { blogFormSchema, type BlogFormValues } from "../../../components/schemas/blog-schema";

interface BlogEditViewProps {
  blog: AdminBlog;
}

export default function BlogEditView({ blog }: BlogEditViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const updateBlog = useUpdateBlog();
  const { data: categoriesResponse } = useGetBlogCategories();

  const categories = categoriesResponse?.data.data ?? [];

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blog.title,
      subTitle: blog.subTitle,
      readTime: blog.readTime,
      authorId: blog.authorId,
      image: blog.images[0] ?? "",
      categoryId: blog.categoryId,
      sections: blog.contents.map((content) => ({
        heading: content.heading,
        details: content.details
      }))
    }
  });

  const handleSubmit = async (data: BlogFormValues) => {
    try {
      await updateBlog.mutateAsync({
        blogId: blog.id,
        payload: {
          title: data.title,
          subTitle: data.subTitle,
          readTime: data.readTime,
          authorId: data.authorId,
          categoryId: data.categoryId,
          contents: data.sections,
          image: data.image instanceof File ? data.image : undefined
        }
      });

      toast.success("Blog updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["blogs-manage"] });
      queryClient.invalidateQueries({ queryKey: ["blog-details", blog.id] });
      router.push(`/admin/content/${blog.id}`);
    } catch (error) {
      toast.error(
        isAxiosError(error)
          ? error.response?.data?.message || "Failed to update blog."
          : "Failed to update blog."
      );
    }
  };

  return (
    <BlogForm
      form={form}
      onSubmit={handleSubmit}
      categories={categories}
      submitLabel="Save Changes"
      isSubmitting={updateBlog.isPending}
      onCancel={() => router.back()}
    />
  );
}
