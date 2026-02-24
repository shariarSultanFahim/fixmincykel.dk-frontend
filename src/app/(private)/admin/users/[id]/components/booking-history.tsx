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

import type { Booking, BookingStatus } from "../../data/users";

interface BookingHistoryProps {
  bookings: Booking[];
}

function getBookingStatusColor(
  status: BookingStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "booked":
      return "secondary";
    case "cancelled":
      return "destructive";
    case "no-show":
      return "outline";
    default:
      return "outline";
  }
}

export default function BookingHistory({ bookings }: BookingHistoryProps) {
  return (
    <Card className="gap-2 border-border pt-4 pb-0">
      <CardHeader className="px-4">
        <CardTitle>Full Booking History</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>Booking ID</TableHead>
              <TableHead>Workshop</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking.id} className="border-border">
                  <TableCell className="font-medium text-primary">{booking.id}</TableCell>
                  <TableCell>{booking.workshop}</TableCell>
                  <TableCell>{booking.dateTime}</TableCell>
                  <TableCell>
                    <Badge variant={getBookingStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{booking.amount}</TableCell>
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
