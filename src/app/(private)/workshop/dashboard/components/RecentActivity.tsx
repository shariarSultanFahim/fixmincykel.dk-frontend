import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  color: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-navy">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col items-start justify-between">
        <div className="h-full flex-1 space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div className={`h-2 w-2 shrink-0 rounded-full ${activity.color}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-navy">{activity.message}</p>
                <p className="text-xs text-navy/60">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/workshop/job-inbox"
          className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
        >
          View Full Activity →
        </Link>
      </CardContent>
    </Card>
  );
}
