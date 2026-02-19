"use client";

import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { BookingStatus, CalendarData } from "@/types";

import { CompleteServiceDialog } from "../dialogs/CompleteServiceDialog";
import { RescheduleBookingDialog } from "../dialogs/RescheduleBookingDialog";
import { StartBookingDialog } from "../dialogs/StartBookingDialog";

interface ListViewProps {
  data: CalendarData;
}

const STATUS_LABELS: Record<BookingStatus, string> = {
  upcoming: "Upcoming",
  "in-progress": "In Progress",
  completed: "Completed",
  "awaiting-payment": "Awaiting Payment"
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  upcoming: "bg-sky-100 text-navy",
  "in-progress": "bg-emerald-100 text-navy",
  completed: "bg-slate-100 text-navy",
  "awaiting-payment": "bg-amber-100 text-navy"
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-DK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export function ListView({ data }: ListViewProps) {
  return (
    <Card className="rounded-3xl border-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-navy">All Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.bookings.map((booking) => (
                <TableRow key={booking.id} className="text-sm text-navy">
                  <TableCell className="whitespace-nowrap">{formatDate(booking.date)}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {booking.startTime} - {booking.endTime}
                  </TableCell>
                  <TableCell className="font-semibold">{booking.customerName}</TableCell>
                  <TableCell>{booking.serviceName}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        STATUS_STYLES[booking.status]
                      )}
                    >
                      {STATUS_LABELS[booking.status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(booking.price, data.currency)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {booking.status === "upcoming" && (
                        <>
                          <StartBookingDialog booking={booking} currency={data.currency} />
                          <RescheduleBookingDialog booking={booking} currency={data.currency} />
                        </>
                      )}
                      {booking.status === "in-progress" && (
                        <CompleteServiceDialog booking={booking} currency={data.currency} />
                      )}
                      {booking.status === "completed" && (
                        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                          Receipt
                        </Button>
                      )}
                      {booking.status === "awaiting-payment" && (
                        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                          Collect
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
