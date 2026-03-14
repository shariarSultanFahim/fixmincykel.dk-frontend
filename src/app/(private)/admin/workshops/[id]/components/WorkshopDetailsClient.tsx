"use client";

import { useGetWorkshopDetails } from "@/lib/actions/workshops/details.workshop";

import { AdminControls, PerformanceMetrics, WorkshopInfo } from ".";
import Header from "../../../component/layouts/header";
import { WorkshopDetailsPageSkeleton } from "./skeletons";

interface WorkshopDetailsClientProps {
  workshopId: string;
}

export default function WorkshopDetailsClient({ workshopId }: WorkshopDetailsClientProps) {
  const { data, isLoading } = useGetWorkshopDetails(workshopId);

  if (isLoading) {
    return <WorkshopDetailsPageSkeleton />;
  }

  if (!data?.data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Workshop not found</p>
      </div>
    );
  }

  const workshop = data.data;

  return (
    <div className="space-y-6">
      <Header
        title={workshop.workshopName}
        subtitle="Complete workshop profile and performance metrics"
      />
      <div className="space-y-6">
        <WorkshopInfo workshop={workshop} />
        <PerformanceMetrics workshop={workshop} />
        <AdminControls workshopId={workshop.id} status={workshop.approvalStatus} />
      </div>
    </div>
  );
}
