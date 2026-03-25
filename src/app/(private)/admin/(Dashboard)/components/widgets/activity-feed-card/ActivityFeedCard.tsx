import type { DashboardActivityItem } from "@/types/admin-analytics";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityFeedCardProps {
  items: DashboardActivityItem[];
  isLoading?: boolean;
}

const formatActivityTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const diffMs = Date.now() - date.getTime();

  if (Number.isNaN(date.getTime()) || diffMs < 0) {
    return "Just now";
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 60) {
    return `${Math.max(diffMinutes, 1)} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  return date.toLocaleDateString("da-DK");
};

export default function ActivityFeedCard({ items, isLoading = false }: ActivityFeedCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Activity Feed (Last 24 Hours)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading activity feed...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity found.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-start gap-4 border-b border-border pb-3">
                <span className="min-w-20 text-xs text-muted-foreground">
                  {formatActivityTimestamp(item.timestamp)}
                </span>
                <p className="text-sm text-foreground">{item.message}</p>
              </div>
            ))
          )}
        </div>
        {/* <Link href="/admin/audit-log" className="text-sm font-medium text-primary">
          View Full Activity Log →
        </Link> */}
      </CardContent>
    </Card>
  );
}
