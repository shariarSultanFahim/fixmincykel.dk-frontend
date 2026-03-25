"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { BookingManagePaymentStatus, BookingManageStatus } from "@/types/booking-manage";

import { useGetBookings } from "@/lib/actions/bookings/get.bookings";

import { useDebouncedValue } from "@/hooks/use-debounced-value";

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

import BookingActions from "./booking-actions";
import ExportCSVButton from "./booking-export-csv-button";
import FilterButton from "./booking-filter-button";
import PaymentBadge from "./booking-payment-badge";
import StatusBadge from "./booking-status-badge";
import SearchBar from "./search-bar";

const PAGE_SIZE = 10;

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK"
});

export default function BookingTable() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const searchQuery = useDebouncedValue(searchInput, 700);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<BookingManageStatus | undefined>(undefined);
  const [selectedPayment, setSelectedPayment] = useState<BookingManagePaymentStatus | undefined>(
    undefined
  );

  const { data, isLoading, isError } = useGetBookings({
    page,
    limit: PAGE_SIZE,
    searchTerm: searchQuery || undefined,
    status: selectedStatus,
    paymentStatus: selectedPayment
  });

  const bookings = data?.data.data ?? [];
  const meta = data?.data.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(1, Number(meta?.totalPage ?? 1));
  const currentPage = Math.min(page, totalPages);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleStatusChange = (status?: BookingManageStatus) => {
    setSelectedStatus(status);
    setPage(1);
  };

  const handlePaymentChange = (paymentStatus?: BookingManagePaymentStatus) => {
    setSelectedPayment(paymentStatus);
    setPage(1);
  };

  const handleView = (id: string) => {
    router.push(`/admin/bookings/${id}`);
  };

  return (
    <div className="space-y-4">
      <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
        <CardContent className="flex-1">
          <SearchBar value={searchInput} onSearch={handleSearchChange} />
        </CardContent>
        <CardContent className="flex gap-2">
          <FilterButton
            selectedStatus={selectedStatus}
            selectedPayment={selectedPayment}
            onStatusChange={handleStatusChange}
            onPaymentChange={handlePaymentChange}
          />
          <ExportCSVButton bookings={bookings} />
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-gray-500">
                  Loading bookings...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-gray-500">
                  Failed to load bookings. Please try again.
                </TableCell>
              </TableRow>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => handleView(booking.id)}
                >
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell
                  // className="hover:underline"
                  // onClick={() => router.push(`/admin/users/${booking.userId}`)}
                  >
                    {booking.user?.name ?? booking.userId}
                  </TableCell>
                  <TableCell
                  // className="hover:underline"
                  // onClick={() => router.push(`/admin/workshops/${booking.workshopId}`)}
                  >
                    {booking.workshop?.workshopName ?? booking.workshopId}
                  </TableCell>
                  <TableCell className="">
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell className="">
                    <PaymentBadge paymentStatus={booking.paymentStatus} />
                  </TableCell>
                  <TableCell>
                    {new Date(booking.scheduleStart).toLocaleDateString("da-DK")}
                  </TableCell>
                  <TableCell className="">
                    {currencyFormatter.format(booking.offer?.price ?? 0)}
                  </TableCell>
                  <TableCell className="">
                    <div onClick={(e) => e.stopPropagation()}>
                      <BookingActions bookingId={booking.id} onView={handleView} />
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
          Showing {bookings.length} of {total} bookings
        </p>
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
