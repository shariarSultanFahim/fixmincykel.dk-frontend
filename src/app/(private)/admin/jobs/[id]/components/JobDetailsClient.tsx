"use client";

import { useGetJobDetails } from "@/lib/actions/jobs/details.job";
import { useGetJobOffers } from "@/lib/actions/jobs/offers.job";

import { FullUserSubmission, OffersReceived } from ".";
import Header from "../../../component/layouts/header";
import { JobDetailsPageSkeleton } from "./skeletons";

interface JobDetailsClientProps {
  jobId: string;
}

export default function JobDetailsClient({ jobId }: JobDetailsClientProps) {
  const { data: jobResponse, isLoading: isJobLoading } = useGetJobDetails(jobId);
  const { data: offersResponse, isLoading: isOffersLoading } = useGetJobOffers(jobId);

  if (isJobLoading || isOffersLoading) {
    return <JobDetailsPageSkeleton />;
  }

  if (!jobResponse?.data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Job not found</p>
      </div>
    );
  }

  const job = jobResponse.data;
  const offers = offersResponse?.data ?? [];

  return (
    <div className="space-y-6">
      <Header
        title={`Job Details: ${job.title}`}
        subtitle="Complete job information and activity"
      />
      <div className="space-y-6">
        <FullUserSubmission job={job} />
        <OffersReceived offers={offers} />
      </div>
    </div>
  );
}
