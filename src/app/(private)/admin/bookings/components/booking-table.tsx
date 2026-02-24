"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import type { Booking, Payment, Status } from "../data/bookings";
import BookingActions from "./booking-actions";
import ExportCSVButton from "./booking-export-csv-button";
import FilterButton from "./booking-filter-button";
import PaymentBadge from "./booking-payment-badge";
import StatusBadge from "./booking-status-badge";
import SearchBar from "./search-bar";

interface BookingTableProps {
  initialBookings: Booking[];
}

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK"
});

export default function BookingTable({ initialBookings }: BookingTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([
    "booked",
    "completed",
    "cancle"
  ]);
  const [selectedPayments, setSelectedPayments] = useState<Payment[]>([
    "paid",
    "unpaid",
    "refunded"
  ]);

  const filteredBookings = useMemo(() => {
    return initialBookings.filter((booking) => {
      if (!selectedStatuses.includes(booking.status)) return false;
      if (!selectedPayments.includes(booking.payment)) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          booking.bookingID.toLowerCase().includes(query) ||
          booking.user.toLowerCase().includes(query) ||
          booking.workshop.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [initialBookings, searchQuery, selectedPayments, selectedStatuses]);

  const handleStatusChange = (status: Status, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
  };

  const handlePaymentChange = (payment: Payment, checked: boolean) => {
    setSelectedPayments((prev) =>
      checked ? [...prev, payment] : prev.filter((p) => p !== payment)
    );
  };

  const handleView = (id: string) => {
    router.push(`/admin/bookings/${id}`);
  };

  return (
    <div className="space-y-4">
      <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
        <CardContent className="flex-1">
          <SearchBar value={searchQuery} onSearch={setSearchQuery} />
        </CardContent>
        <CardContent className="flex gap-2">
          <FilterButton
            selectedStatuses={selectedStatuses}
            selectedPayments={selectedPayments}
            onStatusChange={handleStatusChange}
            onPaymentChange={handlePaymentChange}
          />
          <ExportCSVButton bookings={filteredBookings} />
        </CardContent>
      </Card>

      <Card className="border-border py-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="rounded-tl-xl">Booking ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Workshop</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="">Amount</TableHead>
              <TableHead className="rounded-tr-xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow
                  key={booking.bookingID}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => handleView(booking.bookingID)}
                >
                  <TableCell className="font-medium">{booking.bookingID}</TableCell>
                  <TableCell>{booking.user}</TableCell>
                  <TableCell>{booking.workshop}</TableCell>
                  <TableCell className="">
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell className="">
                    <PaymentBadge payment={booking.payment} />
                  </TableCell>
                  <TableCell>{new Date(booking.date).toLocaleDateString("da-DK")}</TableCell>
                  <TableCell className="">{currencyFormatter.format(booking.amount)}</TableCell>
                  <TableCell className="">
                    <div onClick={(e) => e.stopPropagation()}>
                      <BookingActions
                        bookingId={booking.bookingID}
                        status={booking.status}
                        onView={handleView}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-gray-500">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="text-sm text-gray-600">
        Showing {filteredBookings.length} of {initialBookings.length} bookings
      </div>
    </div>
  );
}
