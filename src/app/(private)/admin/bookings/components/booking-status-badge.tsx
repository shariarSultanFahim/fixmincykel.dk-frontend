import type { BookingManageStatus } from "@/types/booking-manage";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: BookingManageStatus;
}

const statusConfig = {
  PENDING: {
    variant: "secondary" as const,
    label: "Pending",
    icon: "-"
  },
  CONFIRMED: {
    variant: "secondary" as const,
    label: "Confirmed",
    icon: "✓"
  },
  IN_PROGRESS: {
    variant: "secondary" as const,
    label: "In Progress",
    icon: "~"
  },
  COMPLETED: {
    variant: "default" as const,
    label: "Completed",
    icon: "✓✓"
  },
  CANCELLED: {
    variant: "destructive" as const,
    label: "Canceled",
    icon: "x"
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
