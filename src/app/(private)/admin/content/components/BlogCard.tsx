import Image from "next/image";
import Link from "next/link";

import { Calendar, Clock } from "lucide-react";

import type { AdminBlog } from "@/types/blog-manage";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  blog: AdminBlog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const imageUrl = blog.images[0] ?? "/black-cycle.jpg";

  return (
    <Link href={`/admin/content/${blog.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-2 border-navy/10 transition-all hover:border-primary hover:shadow-md">
        <div className="relative h-44 w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs capitalize">
              {blog.category.name}
            </Badge>
            <span className="truncate text-xs font-medium text-primary">{blog.author.name}</span>
          </div>
          <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-navy">
            {blog.title}
          </h3>
          <p className="line-clamp-2 text-xs text-gray-500">{blog.subTitle}</p>
          <div className="flex items-center gap-3 pt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(blog.createdAt).toLocaleDateString("da-DK")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(blog.readTime).toLocaleDateString("da-DK")}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
