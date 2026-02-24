"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import type { FeeStatus } from "../data/payments";

interface FilterButtonProps {
  selectedFeeStatuses: FeeStatus[];
  onFeeStatusChange: (status: FeeStatus, checked: boolean) => void;
}

export default function FilterButton({
  selectedFeeStatuses,
  onFeeStatusChange
}: FilterButtonProps) {
  const [open, setOpen] = useState(false);

  const feeStatuses: FeeStatus[] = ["paid", "pending"];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-border">
          Filter
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border">
        <DropdownMenuLabel className="text-gray-700">Fee Status</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        {feeStatuses.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => onFeeStatusChange(status, !selectedFeeStatuses.includes(status))}
            className="cursor-pointer gap-2 rounded"
          >
            <Checkbox
              checked={selectedFeeStatuses.includes(status)}
              onCheckedChange={(checked) => onFeeStatusChange(status, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="capitalize">{status === "paid" ? "Paid" : "Pending"}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
