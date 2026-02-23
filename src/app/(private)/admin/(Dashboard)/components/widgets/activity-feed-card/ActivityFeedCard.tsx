import Link from "next/link";

import type { ActivityItem } from "@/types/dashboard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityFeedCardProps {
  items: ActivityItem[];
}

export default function ActivityFeedCard({ items }: ActivityFeedCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Activity Feed (Last 24 Hours)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-4 border-b border-border pb-3">
              <span className="min-w-[80px] text-xs text-muted-foreground">{item.time}</span>
              <p className="text-sm text-foreground">{item.message}</p>
            </div>
          ))}
        </div>
        <Link
          href="/admin/audit-log"
          className="text-sm font-medium text-[color:var(--color-primary)]"
        >
          View Full Activity Log →
        </Link>
      </CardContent>
    </Card>
  );
}
