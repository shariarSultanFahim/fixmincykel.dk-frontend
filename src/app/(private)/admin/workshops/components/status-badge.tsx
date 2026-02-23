import { Badge } from "@/components/ui/badge";

import type { WorkshopStatus } from "../data/workshop";

interface StatusBadgeProps {
  status: WorkshopStatus;
}

const statusConfig = {
  approved: {
    variant: "default" as const,
    label: "Approved",
    icon: "✓"
  },
  pending: {
    variant: "secondary" as const,
    label: "Pending",
    icon: "⚠"
  },
  suspended: {
    variant: "destructive" as const,
    label: "Suspended",
    icon: "⏸"
  },
  rejected: {
    variant: "destructive" as const,
    label: "Rejected",
    icon: "✗"
  }
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </Badge>
  );
}
