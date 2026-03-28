"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useStartWorkshopBooking } from "@/lib/actions/bookings/update-workshop-booking-status";

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
  const [open, setOpen] = useState(false);
  const { mutateAsync: startBooking, isPending } = useStartWorkshopBooking();

  const handleStartBooking = async () => {
    try {
      const response = await startBooking(booking.id);
      toast.success(response.message || "Booking started successfully.");
      setOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to start booking.";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-primary text-white hover:bg-primary/90"
            onClick={handleStartBooking}
            disabled={isPending}
          >
            {isPending ? "Starting..." : "Start Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
