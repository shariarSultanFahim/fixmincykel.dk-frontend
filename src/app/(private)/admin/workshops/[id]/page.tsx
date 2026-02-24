import { Suspense } from "react";

import Header from "../../component/layouts/header";
import { workshopData } from "../data/workshop";
import { AdminControls, PerformanceMetrics, WorkshopInfo } from "./components";
import { WorkshopDetailsPageSkeleton } from "./components/skeletons";

interface WorkshopPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function WorkshopDetails({ workshopId }: { workshopId: string }) {
  const workshop = workshopData.find((w) => w.id === workshopId);

  if (!workshop) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Workshop not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header title={workshop.name} subtitle="Complete workshop profile and performance metrics" />
      <div className="space-y-6">
        <WorkshopInfo email={workshop.email} owner={workshop.owner} details={workshop.details} />
        <PerformanceMetrics metrics={workshop.details?.performanceMetrics} />
        <AdminControls workshopId={workshop.id} status={workshop.status} />
      </div>
    </div>
  );
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<WorkshopDetailsPageSkeleton />}>
      <WorkshopDetails workshopId={id} />
    </Suspense>
  );
}
