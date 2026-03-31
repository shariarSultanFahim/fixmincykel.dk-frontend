import { Suspense } from "react";

import { WorkshopDetailsClient } from "./components";
import { WorkshopDetailsPageSkeleton } from "./components/skeletons";

interface WorkshopPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<WorkshopDetailsPageSkeleton />}>
      <WorkshopDetailsClient workshopId={id} />
    </Suspense>
  );
}
