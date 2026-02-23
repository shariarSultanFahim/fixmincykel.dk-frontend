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

import type { Payment, Status } from "../data/bookings";

interface FilterButtonProps {
  selectedStatuses: Status[];
  selectedPayments: Payment[];
  onStatusChange: (status: Status, checked: boolean) => void;
  onPaymentChange: (payment: Payment, checked: boolean) => void;
}

const statuses: Status[] = ["booked", "completed", "cancle"];
const statusLabels: Record<Status, string> = {
  booked: "Booked",
  completed: "Completed",
  cancle: "Canceled"
};

const payments: Payment[] = ["paid", "unpaid", "refunded"];
const paymentLabels: Record<Payment, string> = {
  paid: "Paid",
  unpaid: "Unpaid",
  refunded: "Refunded"
};

export default function FilterButton({
  selectedStatuses,
  selectedPayments,
  onStatusChange,
  onPaymentChange
}: FilterButtonProps) {
  const activeFilters = selectedStatuses.length + selectedPayments.length;
  const allFilters = statuses.length + payments.length;

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
        <DropdownMenuLabel>Filter by Payment</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {payments.map((payment) => (
          <DropdownMenuCheckboxItem
            key={payment}
            checked={selectedPayments.includes(payment)}
            onCheckedChange={(checked) => onPaymentChange(payment, checked)}
          >
            {paymentLabels[payment]}
          </DropdownMenuCheckboxItem>
        ))}

        {(selectedStatuses.length > 0 || selectedPayments.length > 0) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                selectedStatuses.forEach((status) => onStatusChange(status, false));
                selectedPayments.forEach((payment) => onPaymentChange(payment, false));
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
