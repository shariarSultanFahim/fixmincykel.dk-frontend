import { Suspense } from "react";

import Header from "../component/layouts/header";
import { WorkshopTable } from "./components";
import { jobData } from "./data/jobs";

export default function JobsManagementPage() {
  return (
    <div className="space-y-6">
      <Header title="Jobs Management" subtitle="Monitor and manage all platform job requests" />
      <Suspense fallback={<div className="py-8 text-center">Loading...</div>}>
        <WorkshopTable initialJobs={jobData} />
      </Suspense>
    </div>
  );
}
