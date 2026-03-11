"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { Blog } from "@/types/blog";

import { useToast } from "@/hooks";

import BlogForm from "../../../components/forms/BlogForm";
import { blogFormSchema, type BlogFormValues } from "../../../components/schemas/blog-schema";

interface BlogEditViewProps {
  blog: Blog;
}

export default function BlogEditView({ blog }: BlogEditViewProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blog.title,
      description: blog.description,
      tag: blog.tag,
      readTime: blog.readTime,
      date: blog.date,
      image: blog.image as File | string,
      imageAlt: blog.imageAlt,
      category: blog.category === "all-posts" ? "for-cyclists" : blog.category,
      sections: blog.sections
    }
  });

  const handleSubmit = (data: BlogFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "sections") {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });
    formData.append("id", blog.id);
    formData.append("slug", blog.slug);
    // TODO: integrate with API – PUT /blogs/:id using formData
    toast({
      title: "Blog updated",
      description: "Changes have been saved successfully."
    });
    router.push(`/admin/content/${blog.id}`);
  };

  return (
    <BlogForm
      form={form}
      onSubmit={handleSubmit}
      submitLabel="Save Changes"
      isSubmitting={form.formState.isSubmitting}
      onCancel={() => router.back()}
    />
  );
}
