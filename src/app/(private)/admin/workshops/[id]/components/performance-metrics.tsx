import { Bookmark, DollarSign, Star, TrendingUp, Wrench } from "lucide-react";

import type { AdminWorkshop } from "@/types/workshop-manage";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PerformanceMetricsProps {
  workshop: AdminWorkshop;
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

export default function PerformanceMetrics({ workshop }: PerformanceMetricsProps) {
  const totalRevenue = workshop.invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <Card className="border-primary bg-linear-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="text-primary">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <MetricCard icon={Wrench} label="Total Jobs" value={workshop._count.jobs.toString()} />

        <MetricCard icon={Bookmark} label="Bookings" value={workshop._count.bookings.toString()} />

        <MetricCard
          icon={DollarSign}
          label="Invoice Revenue"
          value={`DKK ${totalRevenue.toLocaleString()}`}
        />

        <MetricCard
          icon={TrendingUp}
          label="Invoices"
          value={workshop._count.invoices.toString()}
        />

        <MetricCard
          icon={Star}
          label="Avg. Rating"
          value={workshop.avgRating.toFixed(1)}
          subvalue={`${workshop.reviewsCount} reviews`}
        />
      </CardContent>
    </Card>
  );
}
