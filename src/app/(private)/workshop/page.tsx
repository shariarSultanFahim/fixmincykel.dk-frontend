import { Suspense } from "react";

import { Chart } from "./component/dashboard/components/chart";
import { RecentActivity } from "./component/dashboard/components/RecentActivity";
import {
  ChartSkeleton,
  RecentActivitySkeleton,
  StatsCardSkeleton
} from "./component/dashboard/components/Skeletons";
import { StatsCard } from "./component/dashboard/components/statsCard";
import dashboardData from "./component/dashboard/data/dashboard.json";

// Simulate async data fetching
async function getStats() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dashboardData.stats;
}

async function getWeeklyJobs() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dashboardData.weeklyJobs;
}

async function getRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dashboardData.recentActivity;
}

async function StatsGrid() {
  const stats = await getStats();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
          badge={stat.badge}
          subtitle={stat.subtitle}
        />
      ))}
    </div>
  );
}

async function JobsChart() {
  const weeklyJobs = await getWeeklyJobs();

  return <Chart data={weeklyJobs} title="Jobs Received This Week" />;
}

async function ActivityFeed() {
  const activities = await getRecentActivity();

  return <RecentActivity activities={activities} />;
}

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="rounded-xl bg-primary p-8 shadow-md">
        <h1 className="text-2xl font-bold text-white">Welcome back, Copenhagen Bike Repair!</h1>
        <p className="mt-2 text-sm text-white/90">Your snapshot for today, {currentDate}</p>
      </div>

      {/* Stats Grid */}
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <StatsGrid />
      </Suspense>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<RecentActivitySkeleton />}>
          <ActivityFeed />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <JobsChart />
        </Suspense>
      </div>
    </div>
  );
}
