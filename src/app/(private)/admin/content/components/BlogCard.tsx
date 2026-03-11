import Image from "next/image";
import Link from "next/link";

import { Calendar, Clock } from "lucide-react";

import type { Blog } from "@/types/blog";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORY_LABELS: Record<Blog["category"], string> = {
  "all-posts": "All Posts",
  "for-cyclists": "For Cyclists",
  "for-workshop": "For Workshop",
  "tech-tips": "Tech Tips"
};

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/admin/content/${blog.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-2 border-navy/10 transition-all hover:border-primary hover:shadow-md">
        <div className="relative h-44 w-full overflow-hidden bg-muted">
          <Image
            src={blog.image}
            alt={blog.imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs capitalize">
              {CATEGORY_LABELS[blog.category]}
            </Badge>
            <span className="truncate text-xs font-medium text-primary">{blog.tag}</span>
          </div>
          <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-navy">
            {blog.title}
          </h3>
          <p className="line-clamp-2 text-xs text-gray-500">{blog.description}</p>
          <div className="flex items-center gap-3 pt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {blog.readTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
