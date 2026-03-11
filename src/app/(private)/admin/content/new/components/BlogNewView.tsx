"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks";

import BlogForm from "../../components/forms/BlogForm";
import { blogFormSchema, type BlogFormValues } from "../../components/schemas/blog-schema";

export default function BlogNewView() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      description: "",
      tag: "",
      readTime: "",
      date: "",
      image: "" as File | string,
      imageAlt: "",
      category: "for-cyclists",
      sections: [{ title: "", content: "" }]
    }
  });

  const handleSubmit = (data: BlogFormValues) => {
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const formData = new FormData();
    formData.append("id", slug);
    formData.append("slug", slug);
    Object.entries(data).forEach(([key, value]) => {
      if (key === "sections") {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });
    // TODO: integrate with API – POST /blogs using formData
    toast({
      title: "Blog created",
      description: "Your new blog post has been saved."
    });
    router.push("/admin/content");
  };

  return (
    <BlogForm
      form={form}
      onSubmit={handleSubmit}
      submitLabel="Publish Blog"
      isSubmitting={form.formState.isSubmitting}
      onCancel={() => router.push("/admin/content")}
    />
  );
}
