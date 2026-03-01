import { Suspense } from "react";

import type { JobInboxItem } from "@/types/job-inbox";

import { FiltersBar, FiltersBarSkeleton, JobCard, JobListSkeleton } from "./components";
import jobInboxData from "./data/job-inbox.json";

async function getFilters() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return jobInboxData.filters;
}

async function getJobs() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return jobInboxData.jobs as JobInboxItem[];
}

async function FiltersSection() {
  const filters = await getFilters();

  return (
    <FiltersBar
      statusOptions={filters.status}
      categoryOptions={filters.category}
      sortOptions={filters.sortBy}
    />
  );
}

async function JobsSection() {
  const jobs = await getJobs();

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}

export default function JobIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Job Inbox</h1>
      </div>

      <Suspense fallback={<FiltersBarSkeleton />}>
        <FiltersSection />
      </Suspense>

      <Suspense fallback={<JobListSkeleton />}>
        <JobsSection />
      </Suspense>
    </div>
  );
}
