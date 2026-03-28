"use client";

import { useMemo, useState } from "react";

import type { JobCategoryOption } from "@/types/job-create";
import type { JobStatus as DisplayJobStatus, JobInboxItem } from "@/types/job-inbox";
import type { AdminJob } from "@/types/jobs-manage";

import { useGetWorkshopJobs } from "@/lib/actions/jobs/get-workshop-jobs";
import { useGetCategories } from "@/lib/actions/jobs/get.categories";

import { Card, CardContent } from "@/components/ui";

import { FiltersBar, FiltersBarSkeleton, JobCard, JobListSkeleton } from "./components";
import type { CategoryOption, SortOption } from "./components/FiltersBar";

type WorkshopInboxJob = AdminJob & { offerSend?: boolean };

function transformJobToInboxItem(job: WorkshopInboxJob): JobInboxItem {
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
    status: job.offerSend ? "Offer Sent" : statusMap[job.status] || "New",
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
        label: job.offerSend ? "Offer Already Sent" : "Send Offer",
        variant: "outline",
        disabled: Boolean(job.offerSend)
      }
    ]
  };
}

const SORT_OPTIONS: SortOption[] = [
  { label: "Newest", sort: "createdAt", sortOrder: "desc" },
  { label: "Oldest", sort: "createdAt", sortOrder: "asc" },
  { label: "Closest", sort: "radius", sortOrder: "asc" }
];

export default function JobIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("Newest");

  // Get selected sort option details
  const selectedSortOption =
    SORT_OPTIONS.find((opt) => opt.label === selectedSort) || SORT_OPTIONS[0];

  // Fetch categories from API
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetCategories(
    1,
    500,
    "name",
    true
  );

  // Transform categories for dropdown
  const categories = useMemo((): CategoryOption[] => {
    if (!categoriesResponse?.data?.data || !Array.isArray(categoriesResponse.data.data)) {
      return [];
    }
    return categoriesResponse.data.data.map((cat: JobCategoryOption) => ({
      label: cat.name || "Unknown",
      id: cat.name || cat.id
    }));
  }, [categoriesResponse]);

  // Fetch jobs with applied filters
  const {
    data: jobs,
    isLoading,
    isError
  } = useGetWorkshopJobs(
    selectedSortOption.sort,
    selectedSortOption.sortOrder,
    "OPEN",
    selectedCategory === "All" ? null : selectedCategory
  );

  const inboxItems = useMemo(() => {
    if (!Array.isArray(jobs)) {
      return [];
    }

    return jobs.map(transformJobToInboxItem);
  }, [jobs]);

  // Show full skeleton only on initial load (when categories are loading)
  if (isCategoriesLoading) {
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
        <FiltersBar
          categoryOptions={categories}
          sortOptions={SORT_OPTIONS}
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSelectedSort}
          isCategoriesLoading={isCategoriesLoading}
        />
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
        categoryOptions={categories}
        sortOptions={SORT_OPTIONS}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSelectedSort}
        isCategoriesLoading={isCategoriesLoading}
      />

      {isLoading ? (
        <JobListSkeleton />
      ) : (
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
      )}
    </div>
  );
}
