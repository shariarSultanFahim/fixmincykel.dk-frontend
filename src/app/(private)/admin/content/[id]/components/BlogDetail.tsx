"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, Pencil } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { AdminBlog } from "@/types/blog-manage";

import { useDeleteBlog } from "@/lib/actions/blogs/delete.blog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BlogDetailProps {
  blog: AdminBlog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteBlog = useDeleteBlog();

  const imageUrl = blog.images[0] ?? "/black-cycle.jpg";

  const handleDelete = async () => {
    try {
      await deleteBlog.mutateAsync(blog.id);
      toast.success("Blog deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["blogs-manage"] });
      router.push("/admin/content");
    } catch (error) {
      toast.error(
        isAxiosError(error)
          ? error.response?.data?.message || "Failed to delete blog."
          : "Failed to delete blog."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-gray-600 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </Button>
        <Link href={`/admin/content/${blog.id}/edit`}>
          <Button className="bg-primary text-white hover:bg-primary/90">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Blog
          </Button>
        </Link>
        <Button variant="destructive" onClick={handleDelete} disabled={deleteBlog.isPending}>
          {deleteBlog.isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>

      {/* Cover image */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl border-2 border-navy/10 bg-muted">
        <Image src={imageUrl} alt={blog.title} fill className="object-cover" unoptimized />
      </div>

      {/* Meta */}
      <Card className="border-2 border-navy/10">
        <CardContent className="space-y-3 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {blog.category.name}
            </Badge>
            <span className="text-sm font-medium text-primary">{blog.author.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy">{blog.title}</h1>
          <p className="text-gray-600">{blog.subTitle}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString("da-DK")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(blog.readTime).toLocaleDateString("da-DK")}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <Card className="border-2 border-navy/10">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-navy">Content Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
          {blog.contents.map((section, index) => (
            <div key={index}>
              {index > 0 && <Separator className="mb-6" />}
              <h3 className="mb-2 font-semibold text-navy">{section.heading}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{section.details}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
