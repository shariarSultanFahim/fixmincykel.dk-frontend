import { Suspense } from "react";

import { JobDetailsClient } from "./components";
import { JobDetailsPageSkeleton } from "./components/skeletons";

interface JobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<JobDetailsPageSkeleton />}>
      <JobDetailsClient jobId={id} />
    </Suspense>
  );
}
