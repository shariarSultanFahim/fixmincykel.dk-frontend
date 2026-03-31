import { Suspense } from "react";

import Header from "../component/layouts/header";
import { WorkshopTable } from "./components";
import WorkshopTableSkeleton from "./components/skeletons/workshop-table--skeleton";

export default function JobsManagementPage() {
  return (
    <div className="space-y-6">
      <Header title="Jobs Management" subtitle="Monitor and manage all platform job requests" />
      <Suspense fallback={<WorkshopTableSkeleton />}>
        <WorkshopTable />
      </Suspense>
    </div>
  );
}
