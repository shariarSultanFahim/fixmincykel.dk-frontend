import { Suspense } from "react";

import Header from "../../../component/layouts/header";
import { getBlogById } from "../../data/blogs";
import { BlogEditView } from "./components";
import { BlogEditSkeleton } from "./components/skeletons";

interface BlogEditPageProps {
  params: Promise<{ id: string }>;
}

async function EditContent({ blogId }: { blogId: string }) {
  const blog = getBlogById(blogId);

  if (!blog) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Blog not found</p>
      </div>
    );
  }

  return <BlogEditView blog={blog} />;
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Header title="Edit Blog" subtitle="Update the content of this blog post" />
      <Suspense fallback={<BlogEditSkeleton />}>
        <EditContent blogId={id} />
      </Suspense>
    </div>
  );
}
