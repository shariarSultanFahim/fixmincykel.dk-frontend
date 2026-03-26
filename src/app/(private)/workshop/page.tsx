"use client";

import {
  useGetAnalytics,
  useGetWeeklyBookingsAnalytics,
  useGetWorkshopActivities
} from "@/lib/actions/analytics/get-analytics";

import { Card, CardContent } from "@/components/ui";

import { Chart } from "./component/dashboard/components/chart";
import { RecentActivity } from "./component/dashboard/components/RecentActivity";
import {
  ChartSkeleton,
  RecentActivitySkeleton,
  StatsCardSkeleton
} from "./component/dashboard/components/Skeletons";
import { StatsCard } from "./component/dashboard/components/statsCard";

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  maximumFractionDigits: 0
});

const pluralize = (value: number, unit: string) => {
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
};

const formatActivityTimestamp = (isoTimestamp: string) => {
  const timestamp = new Date(isoTimestamp);
  if (Number.isNaN(timestamp.getTime())) {
    return "-";
  }

  const now = Date.now();
  const diffMs = now - timestamp.getTime();

  if (diffMs < 0) {
    return timestamp.toLocaleDateString("da-DK", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) {
    return pluralize(Math.max(1, minutes), "minute");
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 7) {
    return pluralize(Math.max(1, days), "day");
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return pluralize(Math.max(1, weeks), "week");
  }

  return timestamp.toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

function DashboardContent() {
  const {
    data: analyticsResponse,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError
  } = useGetAnalytics();
  const {
    data: weeklyResponse,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError
  } = useGetWeeklyBookingsAnalytics();
  const {
    data: activitiesResponse,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError
  } = useGetWorkshopActivities();

  const analytics = analyticsResponse?.data;
  const weeklyBookings = weeklyResponse?.data;
  const activities = activitiesResponse?.data ?? [];

  const isLoading = isAnalyticsLoading || isWeeklyLoading || isActivitiesLoading;
  const isError = isAnalyticsError || isWeeklyError || isActivitiesError;

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

  if (isError || !analytics || !weeklyBookings) {
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

  const weeklyJobs = [
    { day: "Sun", jobs: weeklyBookings.sunDay },
    { day: "Mon", jobs: weeklyBookings.monDay },
    { day: "Tue", jobs: weeklyBookings.tuesDay },
    { day: "Wed", jobs: weeklyBookings.wednesDay },
    { day: "Thu", jobs: weeklyBookings.thursDay },
    { day: "Fri", jobs: weeklyBookings.friDay },
    { day: "Sat", jobs: weeklyBookings.saturDay }
  ];

  const recentActivities = activities.slice(0, 5).map((activity, index) => ({
    id: `${activity.details?.id || index}`,
    type: activity.type,
    message: activity.message,
    timestamp: formatActivityTimestamp(activity.timestamp),
    color:
      activity.type === "OFFER_ACCEPTED"
        ? "bg-emerald-500"
        : activity.type === "OFFER_SENT"
          ? "bg-blue-500"
          : "bg-slate-500"
  }));

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
        <RecentActivity activities={recentActivities} />
        <Chart data={weeklyJobs} title="Bookings This Week" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
