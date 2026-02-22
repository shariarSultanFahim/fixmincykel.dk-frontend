import { CheckCircle2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Booking } from "@/types";

interface PastBookingCardProps {
  booking: Booking;
}

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  maximumFractionDigits: 0
});

export function PastBookingCard({ booking }: PastBookingCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-base font-semibold text-navy">{booking.title}</p>
          <p className="text-xs text-muted-foreground">{booking.jobId}</p>
          <p className="text-sm text-muted-foreground">
            {booking.workshop.name} ·{" "}
            {new Date(booking.scheduledAt).toLocaleDateString("en-DK", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
          <p className="text-sm font-semibold text-navy">
            {currencyFormatter.format(booking.priceDkk)}
          </p>
        </div>

        <Button variant="secondary" size="sm" className="pointer-events-none gap-1">
          <CheckCircle2Icon className="size-4" />
          Completed
        </Button>
      </div>
    </Card>
  );
}
