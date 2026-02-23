import { Badge } from "@/components/ui/badge";

import type { Status } from "../data/bookings";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig = {
  booked: {
    variant: "secondary" as const,
    label: "Booked",
    icon: "✓"
  },
  completed: {
    variant: "default" as const,
    label: "Completed",
    icon: "✓✓"
  },
  cancle: {
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
