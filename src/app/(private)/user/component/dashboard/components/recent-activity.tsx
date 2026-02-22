"use client";

import { Clock } from "lucide-react";

import { Card } from "@/components/ui/card";

export function RecentActivity() {
  const activities = [
    {
      time: "10:30",
      event: "Received offer from Copenhagen Bike Repair"
    },
    {
      time: "Yesterday",
      event: "Booked repair for Oct 16"
    },
    {
      time: "Oct 10",
      event: "Left review for City Cycle Fix",
      highlight: "⭐⭐⭐⭐"
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <div className="space-y-4 px-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
          <Clock className="size-5" /> Recent Activity
        </h2>

        <div className="space-y-3">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex gap-4 border-b pb-3 last:border-0">
              <p className="text-xs font-semibold text-muted-foreground">{activity.time}</p>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{activity.event}</p>
                {activity.highlight && (
                  <p className="text-xs text-muted-foreground">{activity.highlight}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
