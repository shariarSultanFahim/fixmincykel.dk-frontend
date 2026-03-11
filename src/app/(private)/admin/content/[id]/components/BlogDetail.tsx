"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft, Calendar, Clock, Pencil } from "lucide-react";

import type { Blog } from "@/types/blog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CATEGORY_LABELS: Record<Blog["category"], string> = {
  "all-posts": "All Posts",
  "for-cyclists": "For Cyclists",
  "for-workshop": "For Workshop",
  "tech-tips": "Tech Tips"
};

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  const router = useRouter();

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
      </div>

      {/* Cover image */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl border-2 border-navy/10 bg-muted">
        <Image src={blog.image} alt={blog.imageAlt} fill className="object-cover" />
      </div>

      {/* Meta */}
      <Card className="border-2 border-navy/10">
        <CardContent className="space-y-3 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {CATEGORY_LABELS[blog.category]}
            </Badge>
            <span className="text-sm font-medium text-primary">{blog.tag}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy">{blog.title}</h1>
          <p className="text-gray-600">{blog.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {blog.readTime}
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
          {blog.sections.map((section, index) => (
            <div key={index}>
              {index > 0 && <Separator className="mb-6" />}
              <h3 className="mb-2 font-semibold text-navy">{section.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{section.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
