"use client";

import { useGetBlogDetails } from "@/lib/actions/blogs/details.blog";

import BlogDetail from "./BlogDetail";
import { BlogDetailSkeleton } from "./skeletons";

interface BlogDetailClientProps {
  blogId: string;
}

export default function BlogDetailClient({ blogId }: BlogDetailClientProps) {
  const { data, isLoading } = useGetBlogDetails(blogId);

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!data?.data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Blog not found</p>
      </div>
    );
  }

  return <BlogDetail blog={data.data} />;
}
