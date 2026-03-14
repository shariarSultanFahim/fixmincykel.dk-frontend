import { Filter } from "lucide-react";

import type { JobStatus } from "@/types/jobs-manage";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface JobFilterButtonProps {
  selectedStatus: JobStatus | undefined;
  onStatusChange: (status: JobStatus | undefined) => void;
}

const statuses: JobStatus[] = [
  "PENDING",
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED"
];

const statusLabels: Record<JobStatus, string> = {
  PENDING: "Pending",
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired"
};

export default function JobFilterButton({ selectedStatus, onStatusChange }: JobFilterButtonProps) {
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
