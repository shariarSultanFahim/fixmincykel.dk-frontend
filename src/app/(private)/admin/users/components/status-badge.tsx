import { Badge } from "@/components/ui/badge";

import type { UserStatus } from "../data/users";

interface StatusBadgeProps {
  status: UserStatus;
}

const statusConfig = {
  active: {
    variant: "default" as const,
    label: "Active",
    icon: "✓"
  },
  pending: {
    variant: "secondary" as const,
    label: "Pending",
    icon: "⚠"
  },
  banned: {
    variant: "destructive" as const,
    label: "Banned",
    icon: "⊘"
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
