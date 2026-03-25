"use client";

import { AlertCircle, CalendarDays, DollarSign, PackageCheck, Users, Wrench } from "lucide-react";

import type {
  DashboardActivityItem,
  DashboardJobBreakdownStat,
  DashboardKpiStat,
  DashboardQuickAction
} from "@/types/admin-analytics";

import {
  useGetAdminAnalytics,
  useGetDailyActivityFeed
} from "@/lib/actions/analytics/get.admin-dashboard";

import {
  ActivityFeedCard,
  JobsBreakdownCard,
  KpiCard,
  QuickActionsCard,
  StatusBreakdownCard
} from "./widgets";

const NUMBER_FORMATTER = new Intl.NumberFormat("da-DK");
const CURRENCY_FORMATTER = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK"
});

const getQuickActions = (pendingWorkshops: number): DashboardQuickAction[] => [
  {
    id: "review-workshops",
    label: `Review Pending Workshops (${pendingWorkshops})`,
    href: "/admin/workshops"
  },
  {
    id: "view-bookings",
    label: "View Bookings",
    href: "/admin/bookings"
  },
  {
    id: "manage-users",
    label: "Manage Users",
    href: "/admin/users"
  }
];

export default function DashboardContent() {
  const {
    data: analyticsResponse,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError
  } = useGetAdminAnalytics();
  const {
    data: activityResponse,
    isLoading: isActivityLoading,
    isError: isActivityError
  } = useGetDailyActivityFeed();

  const overview = analyticsResponse?.data?.overview;
  const jobBreakdown = analyticsResponse?.data?.jobBreakdown;
  const statusBreakdowns = analyticsResponse?.data?.statusBreakdowns;

  const kpiStats: DashboardKpiStat[] = [
    {
      id: "active-users",
      label: "Total Active Users (Cyclists)",
      value: NUMBER_FORMATTER.format(overview?.activeUsers ?? 0),
      icon: Users,
      iconClassName: "text-white",
      iconWrapperClassName: "bg-[color:var(--color-primary)]"
    },
    {
      id: "approved-workshops",
      label: "Total Approved Workshops",
      value: NUMBER_FORMATTER.format(overview?.approvedWorkshops ?? 0),
      icon: Wrench,
      iconClassName: "text-white",
      iconWrapperClassName: "bg-emerald-500"
    },
    {
      id: "jobs-created",
      label: "Jobs Created (All Time)",
      value: NUMBER_FORMATTER.format(overview?.totalJobs ?? 0),
      icon: PackageCheck,
      iconClassName: "text-white",
      iconWrapperClassName: "bg-sky-500"
    },
    {
      id: "bookings-completed",
      label: "Bookings Completed (This Week)",
      value: NUMBER_FORMATTER.format(overview?.bookingsCompletedThisWeek ?? 0),
      icon: CalendarDays,
      iconClassName: "text-white",
      iconWrapperClassName: "bg-indigo-500"
    },
    {
      id: "platform-revenue",
      label: "Total Platform Revenue",
      value: CURRENCY_FORMATTER.format(overview?.totalPlatformRevenue ?? 0),
      icon: DollarSign,
      iconClassName: "text-white",
      iconWrapperClassName: "bg-emerald-600"
    },
    {
      id: "pending-approvals",
      label: "Pending Workshop Approvals",
      value: NUMBER_FORMATTER.format(overview?.pendingWorkshops ?? 0),
      icon: AlertCircle,
      iconClassName: "text-white",
      iconWrapperClassName: "bg-amber-500"
    },
    {
      id: "total-bookings",
      label: "Total Bookings",
      value: NUMBER_FORMATTER.format(overview?.totalBookings ?? 0),
      icon: CalendarDays,
      iconClassName: "text-white",
      iconWrapperClassName: "bg-pink-500"
    }
  ];

  const jobBreakdownStats: DashboardJobBreakdownStat[] = [
    { id: "today", label: "Today", value: NUMBER_FORMATTER.format(jobBreakdown?.today ?? 0) },
    {
      id: "week",
      label: "This Week",
      value: NUMBER_FORMATTER.format(jobBreakdown?.thisWeek ?? 0)
    },
    { id: "all-time", label: "All Time", value: NUMBER_FORMATTER.format(jobBreakdown?.total ?? 0) }
  ];

  const activityFeed: DashboardActivityItem[] = (activityResponse?.data ?? []).map(
    (item, index) => ({
      id: `${item.type}-${item.timestamp}-${index}`,
      timestamp: item.timestamp,
      message: item.message
    })
  );

  const quickActions = getQuickActions(overview?.pendingWorkshops ?? 0);

  const hasError = isAnalyticsError || isActivityError;
  const isLoading = isAnalyticsLoading || isActivityLoading;

  return (
    <div className="space-y-6">
      {hasError && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          Failed to load dashboard analytics. Please refresh and try again.
        </div>
      )}

      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpiStats.map((stat) => (
          <KpiCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <JobsBreakdownCard stats={jobBreakdownStats} />
        </div>
        <div className="lg:col-span-3">
          <StatusBreakdownCard
            breakdowns={{
              workshops: statusBreakdowns?.workshops ?? {},
              jobs: statusBreakdowns?.jobs ?? {},
              bookings: statusBreakdowns?.bookings ?? {}
            }}
          />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeedCard items={activityFeed} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1">
          <QuickActionsCard actions={quickActions} />
        </div>
      </section>
    </div>
  );
}
