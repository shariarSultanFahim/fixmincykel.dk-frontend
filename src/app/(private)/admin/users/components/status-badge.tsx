import type { UserManageStatus } from "@/types/users-manage";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: UserManageStatus;
}

const statusConfig: Record<
  UserManageStatus,
  { variant: "default" | "secondary" | "destructive" | "outline"; label: string; icon: string }
> = {
  ACTIVE: {
    variant: "default" as const,
    label: "Active",
    icon: "✓"
  },
  INACTIVE: {
    variant: "secondary" as const,
    label: "Inactive",
    icon: "⚠"
  },
  SUSPENDED: {
    variant: "outline" as const,
    label: "Suspended",
    icon: "⏸"
  },
  BANNED: {
    variant: "destructive" as const,
    label: "Banned",
    icon: "⊘"
  }
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    variant: "secondary" as const,
    label: status,
    icon: "?"
  };

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </Badge>
  );
}
