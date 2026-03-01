import { Suspense } from "react";

import { Download } from "lucide-react";

import { Button } from "@/components/ui";

import {
  JobsByCategoryChart,
  JobsByCategoryChartSkeleton,
  RatingCard,
  RatingCardSkeleton,
  RevenueTrendChart,
  RevenueTrendChartSkeleton,
  StatCard,
  StatCardSkeleton
} from "./components";
import analyticsData from "./data/analytics.json";

async function getAnalyticsData() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return analyticsData;
}

async function StatsSection() {
  const data = await getAnalyticsData();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {data.stats.map((stat) => (
        <StatCard key={stat.id} label={stat.label} value={stat.value} color={stat.color} />
      ))}
    </div>
  );
}

async function ChartsSection() {
  const data = await getAnalyticsData();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <RevenueTrendChart data={data.revenueTrend} />
      <JobsByCategoryChart data={data.jobsByCategory} />
    </div>
  );
}

async function RatingSection() {
  const data = await getAnalyticsData();

  return (
    <RatingCard
      score={data.rating.score}
      reviews={data.rating.reviews}
      reportUrl={data.rating.reportUrl}
    />
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Analytics</h1>
        <Button variant="ghost" className="border border-secondary hover:border-primary">
          <Download className="h-4 w-4" />
          Download Data
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <StatsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueTrendChartSkeleton />
            <JobsByCategoryChartSkeleton />
          </div>
        }
      >
        <ChartsSection />
      </Suspense>

      <Suspense fallback={<RatingCardSkeleton />}>
        <RatingSection />
      </Suspense>
    </div>
  );
}
