"use client";

import * as React from "react";

import type { JobStatus } from "@/types/job-inbox";

import { useGetJobById } from "@/lib/actions/jobs/get-job-by-id";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface JobDetailsDialogProps {
  jobId: string;
  trigger: React.ReactNode;
}

const statusStyles: Record<JobStatus, { badge: string; dot: string }> = {
  New: {
    badge: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500"
  },
  Viewed: {
    badge: "bg-slate-50 text-slate-600",
    dot: "bg-slate-500"
  },
  "Offer Sent": {
    badge: "bg-purple-50 text-purple-600",
    dot: "bg-purple-500"
  },
  Booked: {
    badge: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500"
  }
};

export function JobDetailsDialog({ jobId, trigger }: JobDetailsDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { data: job, isLoading, isError } = useGetJobById(open ? jobId : undefined);

  if (isError) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
          </DialogHeader>
          <div className="py-10 text-center text-muted-foreground">
            Failed to load job details. Please try again.
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (isLoading || !job) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>
          <Skeleton className="h-24 w-full" />
        </DialogContent>
      </Dialog>
    );
  }

  const displayStatus = job.status === "OPEN" ? "New" : "Viewed";
  const statusStyle = statusStyles[displayStatus];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Job Details: {job.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 text-sm text-navy/80 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Bike Model</p>
            <p className="font-medium text-navy">{job.bikeBrand || "Unknown"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Bike Type</p>
            <p className="font-medium text-navy">{job.bikeType || "Unknown"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Location</p>
            <p className="font-medium text-navy">{job.city || job.address}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Prefer Time</p>
            <p className="font-medium text-navy">
              {new Date(job.preferredTime).toLocaleDateString("da-DK", {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Urgency</p>
            <p className="font-medium text-navy">{job.urgency}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Status</p>
            <span
              className={cn(
                "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                statusStyle.badge
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", statusStyle.dot)} />
              {displayStatus}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-navy/60">Description</p>
          <div className="rounded-lg bg-muted/40 p-4 text-sm text-navy">{job.description}</div>
        </div>
        {job.photos && job.photos.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-navy/60">Photos</p>
            <div className="grid grid-cols-2 gap-2">
              {job.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Job photo ${idx + 1}`}
                  className="h-24 w-full rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
