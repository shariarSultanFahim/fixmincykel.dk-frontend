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
import type { CalendarBooking } from "@/types";

interface StartBookingDialogProps {
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

export function StartBookingDialog({ booking, currency }: StartBookingDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
          Start
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-5">
        <DialogHeader>
          <DialogTitle>Start Booking</DialogTitle>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-primary text-white hover:bg-primary/90">Cancel</Button>
          </DialogClose>
          <Button className="bg-primary text-white hover:bg-primary/90">Start Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
