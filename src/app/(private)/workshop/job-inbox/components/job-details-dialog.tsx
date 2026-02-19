"use client";

import * as React from "react";

import type { JobInboxItem, JobStatus } from "@/types/job-inbox";

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

interface JobDetailsDialogProps {
  job: JobInboxItem;
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

export function JobDetailsDialog({ job, trigger }: JobDetailsDialogProps) {
  const statusStyle = statusStyles[job.status];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Job Details: {job.id}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 text-sm text-navy/80 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Customer</p>
            <p className="font-medium text-navy">{job.user}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Category</p>
            <p className="font-medium text-navy">{job.category}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Bike Type</p>
            <p className="font-medium text-navy">{job.bike}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Distance</p>
            <p className="font-medium text-navy">{job.distance}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-navy/60">Posted</p>
            <p className="font-medium text-navy">{job.posted}</p>
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
              {job.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-navy/60">Job Description</p>
          <div className="rounded-lg bg-muted/40 p-4 text-sm text-navy">{job.description}</div>
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
