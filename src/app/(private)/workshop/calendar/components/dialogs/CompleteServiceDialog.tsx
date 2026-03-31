"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useCompleteWorkshopBooking } from "@/lib/actions/bookings/update-workshop-booking-status";

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

interface CompleteServiceDialogProps {
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

export function CompleteServiceDialog({ booking, currency }: CompleteServiceDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: completeBooking, isPending } = useCompleteWorkshopBooking();

  const handleCompleteBooking = async () => {
    try {
      const response = await completeBooking(booking.id);
      toast.success(response.message || "Booking completed successfully.");
      setOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to complete booking.";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
          Complete Job
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-5">
        <DialogHeader>
          <DialogTitle>Complete Service</DialogTitle>
        </DialogHeader>
        <div className="rounded-2xl border border-border/40 bg-emerald-50 p-4">
          <p className="text-xs text-muted-foreground uppercase">Total Earnings</p>
          <p className="text-2xl font-semibold text-navy">
            {formatCurrency(booking.price, currency)}
          </p>
          <p className="text-xs text-muted-foreground">{booking.serviceName}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          This will mark the booking as completed and update payment status based on backend rules.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-primary text-white hover:bg-primary/90"
            onClick={handleCompleteBooking}
            disabled={isPending}
          >
            {isPending ? "Completing..." : "Confirm & Complete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
