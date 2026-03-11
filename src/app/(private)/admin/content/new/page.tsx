import { Suspense } from "react";

import Header from "../../component/layouts/header";
import { BlogNewView } from "./components";
import { BlogNewSkeleton } from "./components/skeletons";

export default function BlogNewPage() {
  return (
    <div className="space-y-6">
      <Header title="New Blog Post" subtitle="Write and publish a new blog post to the platform" />
      <Suspense fallback={<BlogNewSkeleton />}>
        <BlogNewView />
      </Suspense>
    </div>
  );
}
