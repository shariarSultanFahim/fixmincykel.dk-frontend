"use client";

import { Clock } from "lucide-react";

import { useGetMyActivities } from "@/lib/actions/activity/user-activities";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const getRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return diffDays === 1 ? "Yesterday" : `${diffDays}d ago`;

  return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
};

export function RecentActivity() {
  const { data: activities = [], isLoading } = useGetMyActivities();
  const recentActivities = activities.slice(0, 5);

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <div className="space-y-4 px-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
            <Clock className="size-5" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full rounded" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <div className="space-y-4 px-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
          <Clock className="size-5" /> Recent Activity
        </h2>

        <div className="space-y-3">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, idx) => (
              <div key={idx} className="flex gap-4 border-b pb-3 last:border-0">
                <p className="text-xs font-semibold whitespace-nowrap text-muted-foreground">
                  {getRelativeTime(activity.timestamp)}
                </p>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{activity.message}</p>
                  {activity.details && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.details.title || activity.details.workshopName}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-sm text-muted-foreground">No activity yet</p>
          )}
        </div>
      </div>
    </Card>
  );
}
