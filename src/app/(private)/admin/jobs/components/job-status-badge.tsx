import { Badge } from "@/components/ui/badge";

import type { Status } from "../data/workshop";

interface JobStatusBadgeProps {
  status: Status;
}

const statusConfig = {
  pending: {
    variant: "secondary" as const,
    label: "Pending",
    icon: "⏳"
  },
  booked: {
    variant: "default" as const,
    label: "Booked",
    icon: "✓"
  },
  completed: {
    variant: "outline" as const,
    label: "Completed",
    icon: "✓✓"
  }
};

export default function JobStatusBadge({ status }: JobStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </Badge>
  );
}
