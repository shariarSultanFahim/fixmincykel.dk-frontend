import { Suspense } from "react";

import Header from "../component/layouts/header";
import { AdminControls, ReviewTable } from "./components";
import { AdminControlsSkeleton, ReviewTableSkeleton } from "./components/skeletons";
import { reviewModerationData } from "./data/reviews";

export default function ReviewsManagementPage() {
  return (
    <div className="space-y-6">
      <Header title="Review Moderation" subtitle="Monitor and moderate user reviews" />

      <Suspense fallback={<ReviewTableSkeleton />}>
        <ReviewTable reviews={reviewModerationData} />
      </Suspense>

      <Suspense fallback={<AdminControlsSkeleton />}>
        <AdminControls />
      </Suspense>
    </div>
  );
}
