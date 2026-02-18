"use client";

import { CheckCircle2 } from "lucide-react";

import type { JobInboxItem, JobStatus } from "@/types/job-inbox";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { JobDetailsDialog } from "./job-details-dialog";
import { SendOfferDialog } from "./send-offer-dialog";

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

export function JobCard({
  id,
  status,
  category,
  distance,
  time,
  user,
  bike,
  verified,
  posted,
  description,
  subtext,
  actions
}: JobInboxItem) {
  const statusStyle = statusStyles[status];
  const jobDetails = {
    id,
    status,
    category,
    distance,
    time,
    user,
    bike,
    verified,
    posted,
    description,
    subtext,
    actions
  };

  return (
    <Card className="border-0 shadow-md">
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-2 text-navy/80">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                statusStyle.badge
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", statusStyle.dot)} />
              {status.toUpperCase()}
            </span>
            <span className="font-semibold text-primary">{id}</span>
            <span className="text-muted-foreground">|</span>
            <span>{category}</span>
            <span className="text-muted-foreground">|</span>
            <span>{distance}</span>
          </div>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-navy/80">
          <span>
            User: <span className="font-medium text-navy">{user}</span>
          </span>
          {verified && (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Verified
            </span>
          )}
          <span className="text-muted-foreground">|</span>
          <span>
            Bike: <span className="font-medium text-navy">{bike}</span>
          </span>
        </div>

        {subtext && <p className="text-xs text-purple-600">{subtext}</p>}

        <div className="flex flex-wrap gap-2">
          {actions.map((action) => {
            const button = (
              <Button variant={action.variant} size="sm">
                {action.label}
              </Button>
            );

            if (action.label === "Send Offer") {
              return (
                <SendOfferDialog
                  key={action.label}
                  jobId={id}
                  category={category}
                  trigger={button}
                />
              );
            }

            if (action.label === "View Details") {
              return <JobDetailsDialog key={action.label} job={jobDetails} trigger={button} />;
            }

            return (
              <Button key={action.label} variant={action.variant} size="sm">
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
