import { Suspense } from "react";

import Header from "../../component/layouts/header";
import { jobData } from "../data/jobs";
import { AdminActions, FullChatHistory, FullUserSubmission, OffersReceived } from "./components";
import { JobDetailsPageSkeleton } from "./components/skeletons";

interface JobPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function JobDetails({ jobId }: { jobId: string }) {
  const job = jobData.find((j) => j.jobId === jobId);

  if (!job) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Job not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title={`Job Details: ${job.jobId}`}
        subtitle="Complete job information and activity"
      />
      <div className="space-y-6">
        <FullUserSubmission
          user={job.user}
          category={job.category}
          status={job.status}
          createdAt={job.createdAt}
          details={job.details}
        />
        <OffersReceived offers={job.details?.offers ?? []} />
        <FullChatHistory messages={job.details?.chatHistory ?? []} />
        <AdminActions jobId={job.jobId} />
      </div>
    </div>
  );
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<JobDetailsPageSkeleton />}>
      <JobDetails jobId={id} />
    </Suspense>
  );
}
