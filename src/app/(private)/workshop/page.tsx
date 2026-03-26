"use client";

import { useGetAnalytics } from "@/lib/actions/analytics/get-analytics";

import { Card, CardContent } from "@/components/ui";

import { Chart } from "./component/dashboard/components/chart";
import { RecentActivity } from "./component/dashboard/components/RecentActivity";
import {
  ChartSkeleton,
  RecentActivitySkeleton,
  StatsCardSkeleton
} from "./component/dashboard/components/Skeletons";
import { StatsCard } from "./component/dashboard/components/statsCard";
import dashboardData from "./component/dashboard/data/dashboard.json";

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  maximumFractionDigits: 0
});

function DashboardContent() {
  const { data: analyticsResponse, isLoading, isError } = useGetAnalytics();
  const analytics = analyticsResponse?.data;

  const currentDate = new Date().toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl bg-primary p-8 shadow-md">
          <h1 className="text-2xl font-bold text-white">Welcome back, Workshop!</h1>
          <p className="mt-2 text-sm text-white/90">Your snapshot for today, {currentDate}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivitySkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  if (isError || !analytics) {
    return (
      <Card className="rounded-2xl border-none shadow-sm">
        <CardContent className="py-10 text-center text-muted-foreground">
          <p>Failed to load dashboard. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-primary hover:underline"
          >
            Reload Page
          </button>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      id: "total-offers",
      label: "Total Offers Made",
      value: analytics.totalOffersMade,
      icon: "Send",
      iconColor: "bg-purple-50 text-purple-500"
    },
    {
      id: "active-bookings",
      label: "Active Bookings",
      value: analytics.activeBookings,
      icon: "Calendar",
      iconColor: "bg-green-50 text-green-500"
    },
    {
      id: "conversion-rate",
      label: "Conversion Rate",
      value: `${analytics.conversionRate}%`,
      icon: "Mail",
      iconColor: "bg-blue-50 text-blue-500"
    },
    {
      id: "rating",
      label: "Rating",
      value: `${analytics.avgRating.toFixed(1)} ★`,
      subtitle: `${analytics.reviewsCount} reviews`,
      icon: "Star",
      iconColor: "bg-yellow-50 text-yellow-500"
    },
    {
      id: "avg-job-value",
      label: "Avg. Job Value",
      value: currencyFormatter.format(analytics.avgJobValue),
      icon: "Clock",
      iconColor: "bg-orange-50 text-orange-500"
    },
    {
      id: "revenue",
      label: "Your Revenue",
      value: currencyFormatter.format(analytics.workshopRevenue),
      icon: "DollarSign",
      iconColor: "bg-emerald-50 text-emerald-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="rounded-xl bg-primary p-8 shadow-md">
        <h1 className="text-2xl font-bold text-white">Welcome back, Workshop!</h1>
        <p className="mt-2 text-sm text-white/90">Your snapshot for today, {currentDate}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value.toString()}
            icon={stat.icon}
            iconColor={stat.iconColor}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity activities={dashboardData.recentActivity} />
        <Chart data={dashboardData.weeklyJobs} title="Jobs Received This Week" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
