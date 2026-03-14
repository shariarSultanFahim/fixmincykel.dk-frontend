"use client";

import { useGetBlogDetails } from "@/lib/actions/blogs/details.blog";

import BlogEditView from "./BlogEditView";
import { BlogEditSkeleton } from "./skeletons";

interface BlogEditClientProps {
  blogId: string;
}

export default function BlogEditClient({ blogId }: BlogEditClientProps) {
  const { data, isLoading } = useGetBlogDetails(blogId);

  if (isLoading) {
    return <BlogEditSkeleton />;
  }

  if (!data?.data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Blog not found</p>
      </div>
    );
  }

  return <BlogEditView blog={data.data} />;
}
