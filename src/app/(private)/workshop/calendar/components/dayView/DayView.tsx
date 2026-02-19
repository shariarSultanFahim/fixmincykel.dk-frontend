"use client";

import { formatDate, isToday } from "@/lib/date";
import { cn } from "@/lib/utils";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { BookingStatus, CalendarBooking, CalendarData } from "@/types";

import { CompleteServiceDialog } from "../dialogs/CompleteServiceDialog";
import { RescheduleBookingDialog } from "../dialogs/RescheduleBookingDialog";
import { StartBookingDialog } from "../dialogs/StartBookingDialog";

interface DayViewProps {
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

const ITEM_STYLES: Record<BookingStatus, string> = {
  upcoming: "bg-sky-50",
  "in-progress": "bg-emerald-50",
  completed: "bg-slate-50",
  "awaiting-payment": "bg-amber-50"
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-DK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
};

const getBookingTime = (booking: CalendarBooking) => {
  return `${booking.startTime} - ${booking.endTime}`;
};

export function DayView({ data }: DayViewProps) {
  const todaysBookings = data.bookings.filter(
    (booking) => booking.date === data.today || isToday(booking.date)
  );

  return (
    <Card className="rounded-3xl border-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold text-navy">Today&apos;s Bookings</CardTitle>
        <p className="text-sm text-muted-foreground">{formatDate(data.today)}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {todaysBookings.map((booking) => (
          <div
            key={booking.id}
            className={cn("space-y-3 rounded-2xl p-4", ITEM_STYLES[booking.status])}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{getBookingTime(booking)}</p>
                <p className="text-sm text-navy">
                  Customer: <span className="font-semibold">{booking.customerName}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {booking.serviceName} · {formatCurrency(booking.price, data.currency)}
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  STATUS_STYLES[booking.status]
                )}
              >
                {STATUS_LABELS[booking.status]}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {booking.status === "upcoming" && (
                <>
                  <StartBookingDialog booking={booking} currency={data.currency} />
                  <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                    Message
                  </Button>
                  <RescheduleBookingDialog booking={booking} currency={data.currency} />
                </>
              )}
              {booking.status === "in-progress" && (
                <>
                  <CompleteServiceDialog booking={booking} currency={data.currency} />
                  <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                    Add Note
                  </Button>
                </>
              )}
              {booking.status === "completed" && (
                <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                  View Receipt
                </Button>
              )}
              {booking.status === "awaiting-payment" && (
                <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                  Collect Payment
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Color Legend</p>
          <div className="flex flex-wrap gap-4 text-xs text-navy">
            {(Object.keys(STATUS_LABELS) as BookingStatus[]).map((status) => (
              <div key={status} className="flex items-center gap-2">
                <span className={cn("h-3 w-3 rounded-full", STATUS_STYLES[status])} />
                <span>{STATUS_LABELS[status]}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
