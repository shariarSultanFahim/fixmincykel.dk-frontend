"use client";

import { useRouter } from "next/navigation";

import type { UserBooking, UserBookingStatus } from "@/types/users-manage";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface BookingHistoryProps {
  bookings: UserBooking[];
}

function getBookingStatusVariant(
  status: UserBookingStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "CONFIRMED":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
}

const bookingStatusLabels: Record<UserBookingStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled"
};

export default function BookingHistory({ bookings }: BookingHistoryProps) {
  const router = useRouter();

  return (
    <Card className="gap-2 border-border pt-4 pb-0">
      <CardHeader className="px-4">
        <CardTitle>Full Booking History</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>Booking Title</TableHead>
              <TableHead>Workshop</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                >
                  <TableCell className="font-medium text-primary">{booking.job.title}</TableCell>
                  <TableCell>{booking.workshop.workshopName}</TableCell>
                  <TableCell>{new Date(booking.createdAt).toLocaleDateString("da-DK")}</TableCell>
                  <TableCell>
                    <Badge variant={getBookingStatusVariant(booking.status)}>
                      {bookingStatusLabels[booking.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                  No booking history
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
