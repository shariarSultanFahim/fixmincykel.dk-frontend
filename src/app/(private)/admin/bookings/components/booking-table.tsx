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
import { TablePagination } from "@/components/widgets";

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

const PAGE_SIZE = 5;

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK"
});

export default function BookingTable({ initialBookings }: BookingTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
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

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + PAGE_SIZE);

  const handleStatusChange = (status: Status, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
    setPage(1);
  };

  const handlePaymentChange = (payment: Payment, checked: boolean) => {
    setSelectedPayments((prev) =>
      checked ? [...prev, payment] : prev.filter((p) => p !== payment)
    );
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleView = (id: string) => {
    router.push(`/admin/bookings/${id}`);
  };

  return (
    <div className="space-y-4">
      <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
        <CardContent className="flex-1">
          <SearchBar value={searchQuery} onSearch={handleSearchChange} />
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
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((booking) => (
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

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {paginatedBookings.length} of {filteredBookings.length} bookings
        </p>
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
