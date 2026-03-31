"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AUTH_SESSION_COOKIE } from "@/constants/auth";

import { useCreateBlog } from "@/lib/actions/blogs/create.blog";
import { useGetBlogCategories } from "@/lib/actions/blogs/get.blog-categories";
import { parseAuthSession } from "@/lib/auth/session";
import { cookie } from "@/lib/cookie-client";

import BlogForm from "../../components/forms/BlogForm";
import { blogFormSchema, type BlogFormValues } from "../../components/schemas/blog-schema";

export default function BlogNewView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createBlog = useCreateBlog();
  const { data: categoriesResponse } = useGetBlogCategories();

  const categories = categoriesResponse?.data.data ?? [];

  const currentAuthorId = useMemo(() => {
    const rawSession = cookie.get(AUTH_SESSION_COOKIE);
    if (!rawSession) return "";

    const session = parseAuthSession(rawSession);
    const token = session?.accessToken;
    if (!token) return "";

    try {
      const payloadPart = token.split(".")[1];
      if (!payloadPart) return "";

      const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
      const decoded = atob(padded);
      const payload = JSON.parse(decoded) as {
        id?: string;
        userId?: string;
        sub?: string;
      };

      return payload.id || payload.userId || payload.sub || "";
    } catch {
      return "";
    }
  }, []);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      readTime: new Date().toISOString(),
      authorId: currentAuthorId,
      categoryId: "",
      image: "" as File | string,
      sections: [{ heading: "", details: "" }]
    }
  });

  const handleSubmit = async (data: BlogFormValues) => {
    if (!currentAuthorId) {
      toast.error("Unable to detect current user id from session.");
      return;
    }

    try {
      await createBlog.mutateAsync({
        title: data.title,
        subTitle: data.subTitle,
        readTime: new Date().toISOString(),
        authorId: currentAuthorId,
        categoryId: data.categoryId,
        contents: data.sections,
        image: data.image instanceof File ? data.image : undefined
      });

      toast.success("Blog created successfully.");
      queryClient.invalidateQueries({ queryKey: ["blogs-manage"] });
      router.push("/admin/content");
    } catch (error) {
      toast.error(
        isAxiosError(error)
          ? error.response?.data?.message || "Failed to create blog."
          : "Failed to create blog."
      );
    }
  };

  return (
    <BlogForm
      form={form}
      onSubmit={handleSubmit}
      categories={categories}
      submitLabel="Publish Blog"
      isSubmitting={createBlog.isPending}
      onCancel={() => router.push("/admin/content")}
    />
  );
}
