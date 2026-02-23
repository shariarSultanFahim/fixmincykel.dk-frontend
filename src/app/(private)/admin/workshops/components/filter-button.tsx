import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { WorkshopStatus } from "../data/workshop";

interface FilterButtonProps {
  selectedStatuses: WorkshopStatus[];
  onStatusChange: (status: WorkshopStatus, checked: boolean) => void;
}

const statuses: WorkshopStatus[] = ["approved", "pending", "suspended", "rejected"];
const statusLabels: Record<WorkshopStatus, string> = {
  approved: "Approved",
  pending: "Pending",
  suspended: "Suspended",
  rejected: "Rejected"
};

export default function FilterButton({ selectedStatuses, onStatusChange }: FilterButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-border">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statuses.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatuses.includes(status)}
            onCheckedChange={(checked) => onStatusChange(status, checked)}
          >
            {statusLabels[status]}
          </DropdownMenuCheckboxItem>
        ))}
        {selectedStatuses.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => selectedStatuses.forEach((s) => onStatusChange(s, false))}
            >
              Clear filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
