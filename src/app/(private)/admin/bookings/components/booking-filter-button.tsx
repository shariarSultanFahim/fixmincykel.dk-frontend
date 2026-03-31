import { Filter } from "lucide-react";

import type { BookingManagePaymentStatus, BookingManageStatus } from "@/types/booking-manage";

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
  selectedStatus?: BookingManageStatus;
  selectedPayment?: BookingManagePaymentStatus;
  onStatusChange: (status?: BookingManageStatus) => void;
  onPaymentChange: (paymentStatus?: BookingManagePaymentStatus) => void;
}

const statuses: BookingManageStatus[] = [
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED"
];
const statusLabels: Record<BookingManageStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Canceled"
};

const payments: BookingManagePaymentStatus[] = ["PENDING", "PAID", "FAILED", "REFUNDED"];
const paymentLabels: Record<BookingManagePaymentStatus, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded"
};

export default function FilterButton({
  selectedStatus,
  selectedPayment,
  onStatusChange,
  onPaymentChange
}: FilterButtonProps) {
  const activeFilters = Number(Boolean(selectedStatus)) + Number(Boolean(selectedPayment));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-border">
          <Filter className="mr-2 h-4 w-4" />
          Filter {activeFilters > 0 && `(${activeFilters})`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onStatusChange(undefined)}>All Statuses</DropdownMenuItem>
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status}
            className={selectedStatus === status ? "font-medium" : undefined}
            onClick={() => onStatusChange(status)}
          >
            {statusLabels[status]}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filter by Payment</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onPaymentChange(undefined)}>All Payments</DropdownMenuItem>
        {payments.map((payment) => (
          <DropdownMenuItem
            key={payment}
            className={selectedPayment === payment ? "font-medium" : undefined}
            onClick={() => onPaymentChange(payment)}
          >
            {paymentLabels[payment]}
          </DropdownMenuItem>
        ))}

        {(selectedStatus || selectedPayment) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                onStatusChange(undefined);
                onPaymentChange(undefined);
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
