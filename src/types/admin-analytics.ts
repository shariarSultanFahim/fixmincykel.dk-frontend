import type { LucideIcon } from "lucide-react";

export interface AdminOverview {
  totalUsers: number;
  activeUsers: number;
  totalWorkshops: number;
  approvedWorkshops: number;
  pendingWorkshops: number;
  totalJobs: number;
  totalBookings: number;
  bookingsCompletedThisWeek: number;
  totalPlatformRevenue: number;
}

export interface AdminJobBreakdown {
  today: number;
  thisWeek: number;
  total: number;
}

export interface AdminStatusBreakdowns {
  workshops: Record<string, number>;
  jobs: Record<string, number>;
  bookings: Record<string, number>;
}

export interface AdminAnalyticsPayload {
  overview: AdminOverview;
  jobBreakdown: AdminJobBreakdown;
  statusBreakdowns: AdminStatusBreakdowns;
}

export interface AdminAnalyticsResponse {
  success: boolean;
  message: string;
  data: AdminAnalyticsPayload;
}

export interface DailyActivityFeedItem {
  type: string;
  timestamp: string;
  message: string;
  details?: Record<string, number | string | boolean | null>;
}

export interface DailyActivityFeedResponse {
  success: boolean;
  message: string;
  data: DailyActivityFeedItem[];
}

export interface DashboardKpiStat {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  iconClassName: string;
  iconWrapperClassName: string;
}

export interface DashboardJobBreakdownStat {
  id: string;
  label: string;
  value: string;
}

export interface DashboardActivityItem {
  id: string;
  timestamp: string;
  message: string;
}

export interface DashboardQuickAction {
  id: string;
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}
