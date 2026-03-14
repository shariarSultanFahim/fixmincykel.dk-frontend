import { Filter } from "lucide-react";

import type { UserManageStatus } from "@/types/users-manage";

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

interface FilterButtonProps {
  selectedStatus?: UserManageStatus;
  onStatusChange: (status?: UserManageStatus) => void;
}

const statuses: UserManageStatus[] = ["ACTIVE", "INACTIVE", "SUSPENDED", "BANNED"];
const statusLabels: Record<UserManageStatus, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  SUSPENDED: "Suspended",
  BANNED: "Banned"
};

export default function FilterButton({ selectedStatus, onStatusChange }: FilterButtonProps) {
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
            checked={selectedStatus === status}
            onCheckedChange={(checked) => onStatusChange(checked ? status : undefined)}
          >
            {statusLabels[status]}
          </DropdownMenuCheckboxItem>
        ))}
        {selectedStatus && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onStatusChange(undefined)}>
              Clear filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
