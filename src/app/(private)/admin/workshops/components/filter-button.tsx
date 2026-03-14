import { Filter } from "lucide-react";

import type { WorkshopApprovalStatus } from "@/types/workshop-manage";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface FilterButtonProps {
  selectedStatus: WorkshopApprovalStatus | undefined;
  onStatusChange: (status: WorkshopApprovalStatus | undefined) => void;
}

const statuses: WorkshopApprovalStatus[] = ["APPROVED", "PENDING", "SUSPENDED", "REJECTED"];
const statusLabels: Record<WorkshopApprovalStatus, string> = {
  APPROVED: "Approved",
  PENDING: "Pending",
  SUSPENDED: "Suspended",
  REJECTED: "Rejected"
};

export default function FilterButton({ selectedStatus, onStatusChange }: FilterButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-border">
          <Filter className="mr-2 h-4 w-4" />
          {selectedStatus ? statusLabels[selectedStatus] : "Filter"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onStatusChange(undefined)}>All</DropdownMenuItem>
        <DropdownMenuSeparator />
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status}
            onSelect={() => onStatusChange(status)}
            className={selectedStatus === status ? "bg-accent" : ""}
          >
            {statusLabels[status]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
