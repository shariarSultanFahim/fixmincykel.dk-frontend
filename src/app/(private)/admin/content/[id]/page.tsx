import { Suspense } from "react";

import Header from "../../component/layouts/header";
import { getBlogById } from "../data/blogs";
import { BlogDetail } from "./components";
import { BlogDetailSkeleton } from "./components/skeletons";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

async function BlogContent({ blogId }: { blogId: string }) {
  const blog = getBlogById(blogId);

  if (!blog) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Blog not found</p>
      </div>
    );
  }

  return <BlogDetail blog={blog} />;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Header title="Blog Details" subtitle="View and manage blog content" />
      <Suspense fallback={<BlogDetailSkeleton />}>
        <BlogContent blogId={id} />
      </Suspense>
    </div>
  );
}
