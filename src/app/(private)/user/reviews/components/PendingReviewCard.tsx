import type { MouseEvent } from "react";

import { CalendarClockIcon, ChevronRightIcon } from "lucide-react";

import type { PendingReviewCardProps } from "@/types/review";

import { formatDate } from "@/lib/date";

import { Button, Card, CardContent } from "@/ui";

export function PendingReviewCard({ pendingReview, onOpen }: PendingReviewCardProps) {
  const handleOpen = () => onOpen(pendingReview);
  const handleLeaveReviewClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleOpen();
  };
  const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Card className="border-0 bg-[#FEFCE8]">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-navy">
              {pendingReview.workshopName} · {pendingReview.jobTitle}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarClockIcon className="size-3.5" />
              Scheduled for {formatDate(pendingReview.scheduledFor)}
            </div>
          </div>
          <ChevronRightIcon className="size-4 text-muted-foreground transition group-hover:translate-x-0.5" />
        </div>
        <p className="text-sm text-navy/70">{pendingReview.note}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" size="sm" className="shadow-none" onClick={handleLeaveReviewClick}>
            Leave Review
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-white bg-white"
            onClick={handleActionClick}
          >
            Remind Me Later
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
