import type { LucideIcon } from "lucide-react";

export interface KpiStat {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  iconClassName: string;
  iconWrapperClassName: string;
}

export interface JobBreakdownStat {
  id: string;
  label: string;
  value: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  message: string;
}

export interface QuickAction {
  id: string;
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}
