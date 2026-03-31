import type { JobStatus } from "@/types/jobs-manage";

import { Badge } from "@/components/ui/badge";

interface JobStatusBadgeProps {
  status: JobStatus;
}

const statusConfig = {
  PENDING: {
    variant: "secondary" as const,
    label: "Pending",
    icon: "⏱"
  },
  OPEN: {
    variant: "outline" as const,
    label: "Open",
    icon: "⏳"
  },
  IN_PROGRESS: {
    variant: "default" as const,
    label: "In Progress",
    icon: "✓"
  },
  COMPLETED: {
    variant: "secondary" as const,
    label: "Completed",
    icon: "✓✓"
  },
  CANCELLED: {
    variant: "outline" as const,
    label: "Cancelled",
    icon: "✕"
  },
  EXPIRED: {
    variant: "destructive" as const,
    label: "Expired",
    icon: "⌛"
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
