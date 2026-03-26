"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useRescheduleBooking } from "@/lib/actions/bookings/reschedule-booking";

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
  const [open, setOpen] = useState(false);
  const [scheduleStart, setScheduleStart] = useState(booking.scheduleStart.slice(0, 16));
  const [scheduleEnd, setScheduleEnd] = useState(booking.scheduleEnd.slice(0, 16));
  const { mutateAsync: rescheduleBooking, isPending } = useRescheduleBooking();

  const handleReschedule = async () => {
    const startDate = new Date(scheduleStart);
    const endDate = new Date(scheduleEnd);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      toast.error("Please select valid start and end dates.");
      return;
    }

    if (endDate <= startDate) {
      toast.error("End time must be after start time.");
      return;
    }

    try {
      await rescheduleBooking({
        bookingId: booking.id,
        payload: {
          scheduleStart: startDate.toISOString(),
          scheduleEnd: endDate.toISOString()
        }
      });
      toast.success("Booking rescheduled successfully!");
      setOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to reschedule booking.";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <p className="text-xs font-medium text-navy">New start time</p>
          <Input
            className="border-border"
            type="datetime-local"
            value={scheduleStart}
            onChange={(event) => setScheduleStart(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-navy">New end time</p>
          <Input
            className="border-border"
            type="datetime-local"
            value={scheduleEnd}
            onChange={(event) => setScheduleEnd(event.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-primary text-white hover:bg-primary/90"
            onClick={handleReschedule}
            disabled={isPending}
          >
            {isPending ? "Rescheduling..." : "Reschedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
