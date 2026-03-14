import type { WorkshopApprovalStatus } from "@/types/workshop-manage";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: WorkshopApprovalStatus;
}

const statusConfig: Record<
  WorkshopApprovalStatus,
  { variant: "default" | "secondary" | "destructive" | "outline"; label: string; icon: string }
> = {
  APPROVED: { variant: "default", label: "Approved", icon: "✓" },
  PENDING: { variant: "secondary", label: "Pending", icon: "⚠" },
  SUSPENDED: { variant: "destructive", label: "Suspended", icon: "⏸" },
  REJECTED: { variant: "destructive", label: "Rejected", icon: "✗" }
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
