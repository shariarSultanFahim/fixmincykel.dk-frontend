import { Suspense } from "react";

import { RepairDetailsClient } from "./components";
import { RepairDetailsSkeleton } from "./components/skeletons";

interface RepairDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RepairDetailsPage({ params }: RepairDetailsPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<RepairDetailsSkeleton />}>
      <RepairDetailsClient repairId={id} />
    </Suspense>
  );
}
