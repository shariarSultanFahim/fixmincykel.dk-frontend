import { Building2, DollarSign, Star, TrendingUp, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { PerformanceMetrics } from "../../data/workshop";

interface PerformanceMetricsProps {
  metrics?: PerformanceMetrics;
}

function MetricCard({
  icon: Icon,
  label,
  value,
  subvalue
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subvalue?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-white p-4 text-center sm:p-6">
      <Icon className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900 sm:text-3xl">{value}</p>
      {subvalue && <p className="text-sm text-gray-500">{subvalue}</p>}
    </div>
  );
}

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  if (!metrics) {
    return null;
  }

  return (
    <Card className="border-primary bg-linear-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="text-primary">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-5">
        <MetricCard
          icon={Building2}
          label="Jobs Received"
          value={metrics.jobsReceived.toString()}
        />

        <MetricCard
          icon={TrendingUp}
          label="Conversion Rate"
          value={`${metrics.conversionRate}%`}
        />

        <MetricCard
          icon={DollarSign}
          label="Monthly Revenue"
          value={`DKK ${(metrics.monthlyRevenue / 1000).toFixed(1)}K`}
        />

        <MetricCard
          icon={User}
          label="Platform Fee Paid"
          value={`DKK ${metrics.platformFeePaid.toLocaleString()}`}
        />

        <MetricCard
          icon={Star}
          label="Avg. Review Score"
          value={metrics.averageReviewScore.toFixed(1)}
        />
      </CardContent>
    </Card>
  );
}
