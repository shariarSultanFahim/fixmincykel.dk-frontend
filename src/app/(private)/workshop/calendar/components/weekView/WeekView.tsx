"use client";

import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { BookingStatus, CalendarData } from "@/types";

interface WeekViewProps {
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

export function WeekView({ data }: WeekViewProps) {
  const weekDays = Array.from(new Set(data.bookings.map((booking) => booking.date))).sort();
  const visibleDays = weekDays.slice(0, 7);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {visibleDays.map((date) => {
        const dayBookings = data.bookings.filter((booking) => booking.date === date);

        return (
          <Card key={date} className="rounded-3xl border-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base font-semibold text-navy">
                {formatDate(date)}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{dayBookings.length} bookings</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {dayBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={cn("space-y-2 rounded-2xl p-3", ITEM_STYLES[booking.status])}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                      {booking.startTime} - {booking.endTime}
                    </p>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        STATUS_STYLES[booking.status]
                      )}
                    >
                      {STATUS_LABELS[booking.status]}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-navy">{booking.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.serviceName} · {formatCurrency(booking.price, data.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
