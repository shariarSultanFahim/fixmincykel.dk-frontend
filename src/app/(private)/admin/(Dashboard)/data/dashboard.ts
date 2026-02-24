import {
  AlertCircle,
  CalendarDays,
  DollarSign,
  MessageSquareText,
  PackageCheck,
  Users,
  Wrench
} from "lucide-react";

import type { ActivityItem, JobBreakdownStat, KpiStat, QuickAction } from "@/types/dashboard";

export const kpiStats: KpiStat[] = [
  {
    id: "active-users",
    label: "Total Active Users (Cyclists)",
    value: "2,847",
    icon: Users,
    iconClassName: "text-white",
    iconWrapperClassName: "bg-[color:var(--color-primary)]"
  },
  {
    id: "approved-workshops",
    label: "Total Approved Workshops",
    value: "147",
    icon: Wrench,
    iconClassName: "text-white",
    iconWrapperClassName: "bg-emerald-500"
  },
  {
    id: "jobs-created",
    label: "Jobs Created (All Time)",
    value: "1,842",
    icon: PackageCheck,
    iconClassName: "text-white",
    iconWrapperClassName: "bg-sky-500"
  },
  {
    id: "bookings-completed",
    label: "Bookings Completed (This Week)",
    value: "89",
    icon: CalendarDays,
    iconClassName: "text-white",
    iconWrapperClassName: "bg-indigo-500"
  },
  {
    id: "platform-revenue",
    label: "Total Platform Revenue",
    value: "DKK 24,850",
    icon: DollarSign,
    iconClassName: "text-white",
    iconWrapperClassName: "bg-emerald-600"
  },
  {
    id: "pending-approvals",
    label: "Pending Workshop Approvals",
    value: "12",
    icon: AlertCircle,
    iconClassName: "text-white",
    iconWrapperClassName: "bg-amber-500"
  },
  {
    id: "reviews-moderation",
    label: "Reviews Awaiting Moderation",
    value: "5",
    icon: MessageSquareText,
    iconClassName: "text-white",
    iconWrapperClassName: "bg-pink-500"
  }
];

export const jobBreakdownStats: JobBreakdownStat[] = [
  { id: "today", label: "Today", value: "42" },
  { id: "week", label: "This Week", value: "210" },
  { id: "all-time", label: "All Time", value: "1,842" }
];

export const activityFeed: ActivityItem[] = [
  {
    id: "activity-1",
    time: "10:30",
    message: 'Workshop "City Cycle Fix" approved.'
  },
  {
    id: "activity-2",
    time: "09:15",
    message: "User Maria L. created Job #JOB-2049."
  },
  {
    id: "activity-3",
    time: "Yesterday, 16:45",
    message: "Dispute #DIS-2042 resolved (partial refund issued)."
  },
  {
    id: "activity-4",
    time: "Yesterday, 14:20",
    message: "New workshop registration: E-Bike Specialists."
  },
  {
    id: "activity-5",
    time: "Yesterday, 11:05",
    message: "Platform fee payment received from Copenhagen Bike Repair."
  }
];

export const quickActions: QuickAction[] = [
  {
    id: "review-workshops",
    label: "Review Pending Workshops (12)",
    href: "/admin/workshops"
  },
  {
    id: "moderate-reviews",
    label: "Moderate Reviews (5)",
    href: "/admin/reviews"
  },
  {
    id: "view-disputes",
    label: "View Open Disputes",
    href: "/admin/bookings"
  },
  {
    id: "manage-users",
    label: "Manage Users",
    href: "/admin/users"
  }
];
