import type { ReviewCardProps } from "@/types/review";

import { formatDate } from "@/lib/date";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui";

import { RatingStars } from "./RatingStars";

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base font-semibold text-navy">
              {review.workshopName}
            </CardTitle>
            <div className="text-xs text-muted-foreground">
              {review.jobId} · {review.jobTitle}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{formatDate(review.date)}</div>
        </div>
        <RatingStars value={review.rating} readOnly size="sm" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-navy/80">{review.message}</p>
      </CardContent>
    </Card>
  );
}
