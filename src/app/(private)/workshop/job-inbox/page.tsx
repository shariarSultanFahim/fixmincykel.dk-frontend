"use client";

import { useMemo } from "react";

import type { JobStatus as DisplayJobStatus, JobInboxItem } from "@/types/job-inbox";
import type { AdminJob } from "@/types/jobs-manage";

import { useGetWorkshopJobs } from "@/lib/actions/jobs/get-workshop-jobs";

import { Card, CardContent } from "@/components/ui";

import { FiltersBar, FiltersBarSkeleton, JobCard, JobListSkeleton } from "./components";

function transformJobToInboxItem(job: AdminJob): JobInboxItem {
  // Map API job status to display status
  const statusMap: Record<string, DisplayJobStatus> = {
    OPEN: "New",
    PENDING: "New",
    IN_PROGRESS: "Viewed",
    COMPLETED: "Booked",
    CANCELLED: "Viewed",
    EXPIRED: "Viewed"
  };

  return {
    id: job.id,
    title: job.title,
    status: statusMap[job.status] || "New",
    category: job.categories?.[0]?.description || "Bike Repair",
    distance: `${job.radius || 0} km`,
    time: new Date(job.preferredTime).toLocaleDateString("da-DK", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    user: job.user?.name || "Unknown",
    bike: job.bikeName || "Unknown Bike",
    verified: job.user?.isVerified ?? false,
    posted: new Date(job.createdAt).toLocaleDateString("da-DK"),
    description: job.description,
    actions: [
      {
        label: "View Details",
        variant: "default"
      },
      {
        label: "Send Offer",
        variant: "outline"
      }
    ]
  };
}

const staticFilters = {
  status: ["All", "New", "Viewed", "Offer Sent", "Booked"],
  category: ["All", "Puncture", "Brakes", "Gears", "Chain", "Tune-up"],
  sortBy: ["Newest", "Oldest", "Closest", "Highest Value"]
};

export default function JobIndexPage() {
  const { data: jobs, isLoading, isError } = useGetWorkshopJobs("createdAt", "asc");

  const inboxItems = useMemo(() => {
    return jobs?.map(transformJobToInboxItem) ?? [];
  }, [jobs]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Job Inbox</h1>
        </div>

        <FiltersBarSkeleton />
        <JobListSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Job Inbox</h1>
        </div>
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="py-10 text-center text-muted-foreground">
            <p>Failed to load jobs. Please try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-primary hover:underline"
            >
              Reload Page
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Job Inbox</h1>
      </div>

      <FiltersBar
        statusOptions={staticFilters.status}
        categoryOptions={staticFilters.category}
        sortOptions={staticFilters.sortBy}
      />

      <div className="space-y-4">
        {inboxItems.length > 0 ? (
          inboxItems.map((job) => <JobCard key={job.id} {...job} />)
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-8 text-center text-muted-foreground">
              No jobs available at this time.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
