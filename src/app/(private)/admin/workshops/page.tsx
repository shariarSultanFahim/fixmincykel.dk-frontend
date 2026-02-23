import { Suspense } from "react";

import Header from "../component/layouts/header";
import { WorkshopTable } from "./components";
import WorkshopTableSkeleton from "./components/skeletons/workshop-table--skeleton";
import { workshopData } from "./data/workshop";

export default function WorkshopsPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Workshop Management"
        subtitle="Critical operational area - Review and manage workshop registrations"
      />
      <Suspense fallback={<WorkshopTableSkeleton />}>
        <WorkshopTable initialWorkshops={workshopData} />
      </Suspense>
    </div>
  );
}
