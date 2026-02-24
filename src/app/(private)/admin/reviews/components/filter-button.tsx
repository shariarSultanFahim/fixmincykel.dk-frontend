import { Filter } from "lucide-react";

import type { ReviewModerationStatus } from "@/types/review-moderation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface FilterButtonProps {
  selectedStatuses: ReviewModerationStatus[];
  onStatusChange: (status: ReviewModerationStatus, checked: boolean) => void;
}

const statusOptions: ReviewModerationStatus[] = ["visible", "flagged"];
const statusLabels: Record<ReviewModerationStatus, string> = {
  visible: "Visible",
  flagged: "Flagged"
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
        {statusOptions.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatuses.includes(status)}
            onCheckedChange={(checked) => onStatusChange(status, checked)}
          >
            {statusLabels[status]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
