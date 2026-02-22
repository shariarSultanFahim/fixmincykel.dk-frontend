import { StarIcon } from "lucide-react";

import type { ReviewSummaryBarProps } from "@/types/review";

import { cn } from "@/lib/utils";

import { Card, CardContent, Separator } from "@/ui";

export function ReviewSummaryBar({ stats }: ReviewSummaryBarProps) {
  const summaryItems = [
    {
      label: "Average Rating",
      value: stats.averageRating.toFixed(1),
      helper: "Across all workshops",
      icon: <StarIcon className="size-4 fill-amber-400 text-amber-400" />
    },
    { label: "Total Reviews", value: stats.totalReviews, helper: "Verified visits" },
    { label: "5-Star Reviews", value: stats.fiveStarReviews, helper: "Top-rated service" },
    { label: "Helpful Votes", value: stats.helpfulVotes, helper: "From the community" }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="grid gap-6 py-6 md:grid-cols-4 md:gap-0">
        {summaryItems.map((item, index) => (
          <div
            key={item.label}
            className={cn("flex flex-col gap-1 px-2", index !== 0 && "md:border-l md:border-muted")}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <div className="text-2xl font-semibold text-navy">{item.value}</div>
            <div className="text-xs text-muted-foreground">{item.helper}</div>
            {index !== summaryItems.length - 1 && <Separator className="mt-4 md:hidden" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
