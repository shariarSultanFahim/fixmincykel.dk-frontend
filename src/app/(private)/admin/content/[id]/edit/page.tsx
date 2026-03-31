import { Suspense } from "react";

import Header from "../../../component/layouts/header";
import { BlogEditClient } from "./components";
import { BlogEditSkeleton } from "./components/skeletons";

interface BlogEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Header title="Edit Blog" subtitle="Update the content of this blog post" />
      <Suspense fallback={<BlogEditSkeleton />}>
        <BlogEditClient blogId={id} />
      </Suspense>
    </div>
  );
}
