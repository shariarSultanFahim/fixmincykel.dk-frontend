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

import type { Category, Status } from "../data/jobs";

interface FilterButtonProps {
  selectedStatuses: Status[];
  selectedCategories: Category[];
  onStatusChange: (status: Status, checked: boolean) => void;
  onCategoryChange: (category: Category, checked: boolean) => void;
}

const statuses: Status[] = ["pending", "booked", "completed"];
const statusLabels: Record<Status, string> = {
  pending: "Pending",
  booked: "Booked",
  completed: "Completed"
};

const categories: Category[] = ["brakes", "puncture", "chain", "general-tune-up", "e-bike-service"];
const categoryLabels: Record<Category, string> = {
  brakes: "Brakes",
  puncture: "Puncture",
  chain: "Chain",
  "general-tune-up": "General Tune-up",
  "e-bike-service": "E-Bike Service"
};

export default function FilterButton({
  selectedStatuses,
  selectedCategories,
  onStatusChange,
  onCategoryChange
}: FilterButtonProps) {
  const activeFilters = selectedStatuses.length + selectedCategories.length;
  const allFilters = statuses.length + categories.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-border">
          <Filter className="mr-2 h-4 w-4" />
          Filter {activeFilters < allFilters && `(${activeFilters})`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
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

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={(checked) => onCategoryChange(category, checked)}
          >
            {categoryLabels[category]}
          </DropdownMenuCheckboxItem>
        ))}

        {(selectedStatuses.length > 0 || selectedCategories.length > 0) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                selectedStatuses.forEach((s) => onStatusChange(s, false));
                selectedCategories.forEach((c) => onCategoryChange(c, false));
              }}
            >
              Clear all filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
