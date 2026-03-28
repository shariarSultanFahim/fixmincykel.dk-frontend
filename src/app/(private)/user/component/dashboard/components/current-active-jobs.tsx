"use client";

import Link from "next/link";

import type { UserRepair } from "@/types/user-repair";

import { useGetMyJobs } from "@/lib/actions/jobs/my-jobs";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const getStatusDisplay = (job: UserRepair) => {
  if (job.status === "OPEN") {
    return {
      label: "Comparing Offers",
      color: "bg-amber-100 text-amber-800"
    };
  }
  if (job.status === "PENDING" || job.status === "IN_PROGRESS") {
    return {
      label: "Booked",
      color: "bg-green-100 text-green-800"
    };
  }
  return {
    label: job.status,
    color: "bg-gray-100 text-gray-800"
  };
};

export function CurrentActiveJobs() {
  const { data: jobsData, isLoading } = useGetMyJobs();
  const jobs =
    jobsData?.data?.result?.filter(
      (job: UserRepair) =>
        job.status === "OPEN" || job.status === "PENDING" || job.status === "IN_PROGRESS"
    ) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
          <span>⚙️</span> Current Active Jobs
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, idx) => (
            <Skeleton key={idx} className="h-32 w-full rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
        <span>⚙️</span> Current Active Jobs
      </h2>

      {jobs.length > 0 ? (
        jobs.map((job: UserRepair) => {
          const statusDisplay = getStatusDisplay(job);
          return (
            <Card key={job.id} className="overflow-hidden border-0 shadow-sm">
              <div className="space-y-4 px-6">
                <div>
                  <h3 className="font-semibold text-navy">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.id}</p>
                </div>

                <div
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusDisplay.color}`}
                >
                  {statusDisplay.label}
                </div>

                {/* For OPEN jobs - show link to compare offers */}
                {job.status === "OPEN" && (
                  <div>
                    <Link href={`/user/offers?jobId=${job.id}`}>
                      <Button variant="default" className="w-full">
                        View Offers →
                      </Button>
                    </Link>
                  </div>
                )}

                {/* For IN_PROGRESS/PENDING jobs - show action buttons */}
                {(job.status === "PENDING" || job.status === "IN_PROGRESS") && (
                  <div className="flex gap-2">
                    <Link href="/user/bookings" className="flex-1">
                      <Button variant="default" className="w-full">
                        View Booking
                      </Button>
                    </Link>
                    <Link href="/user/messages" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Message
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          );
        })
      ) : (
        <Card className="border-0 shadow-sm">
          <div className="px-6 py-8 text-center">
            <p className="text-sm text-muted-foreground">No active jobs yet</p>
          </div>
        </Card>
      )}
    </div>
  );
}
