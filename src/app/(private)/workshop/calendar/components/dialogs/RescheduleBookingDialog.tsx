"use client";

import { Button } from "@/components/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { CalendarBooking } from "@/types";

interface RescheduleBookingDialogProps {
  booking: CalendarBooking;
  currency: string;
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-DK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export function RescheduleBookingDialog({ booking, currency }: RescheduleBookingDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
          Reschedule
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-5">
        <DialogHeader>
          <DialogTitle>Reschedule Booking</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-navy">
          <p>
            <span className="text-muted-foreground">Customer:</span> {booking.customerName}
          </p>
          <p>
            <span className="text-muted-foreground">Service:</span> {booking.serviceName}
          </p>
          <p>
            <span className="text-muted-foreground">Price:</span>{" "}
            {formatCurrency(booking.price, currency)}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-navy">New time</p>
          <Input className="border-border" placeholder="Select a new time" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-primary text-white hover:bg-primary/90">Cancel</Button>
          </DialogClose>
          <Button className="bg-primary text-white hover:bg-primary/90">Reschedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
