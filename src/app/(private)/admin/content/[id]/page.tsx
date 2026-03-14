import { Suspense } from "react";

import Header from "../../component/layouts/header";
import { BlogDetailClient } from "./components";
import { BlogDetailSkeleton } from "./components/skeletons";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Header title="Blog Details" subtitle="View and manage blog content" />
      <Suspense fallback={<BlogDetailSkeleton />}>
        <BlogDetailClient blogId={id} />
      </Suspense>
    </div>
  );
}
