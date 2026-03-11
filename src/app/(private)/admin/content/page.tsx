import { Suspense } from "react";

import Header from "../component/layouts/header";
import { BlogGrid } from "./components";
import { BlogGridSkeleton } from "./components/skeletons";
import { blogsData } from "./data/blogs";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <Header title="Content Management" subtitle="Create and manage blog posts for the platform" />
      <Suspense fallback={<BlogGridSkeleton />}>
        <BlogGrid blogs={blogsData} />
      </Suspense>
    </div>
  );
}
