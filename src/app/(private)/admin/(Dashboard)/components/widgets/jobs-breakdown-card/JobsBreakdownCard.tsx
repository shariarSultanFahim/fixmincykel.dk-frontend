import type { JobBreakdownStat } from "@/types/dashboard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface JobsBreakdownCardProps {
  stats: JobBreakdownStat[];
}

export default function JobsBreakdownCard({ stats }: JobsBreakdownCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Jobs Created Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-semibold text-primary">{stat.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
