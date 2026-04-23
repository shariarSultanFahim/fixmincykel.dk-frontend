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
  DialogTrigger,
  Input,
  Label,
  Textarea
} from "@/components/ui";
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
  const [newPrice, setNewPrice] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const { mutateAsync: completeBooking, isPending } = useCompleteWorkshopBooking();

  const handleCompleteBooking = async () => {
    try {
      let payload: { bookingId: string; new_price?: number; reason_for_price_increase?: string } = {
        bookingId: booking.id
      };

      if (newPrice || reason.trim().length >= 1) {
        if (!newPrice || !reason) {
          toast.error("Both new price and reason must be filled if you are increasing the price.");
          return;
        }

        const priceValue = parseFloat(newPrice);
        if (isNaN(priceValue) || priceValue <= booking.price) {
          toast.error(`New price must be greater than the original price (${formatCurrency(booking.price, currency)})`);
          return;
        }

        payload.new_price = priceValue;
        payload.reason_for_price_increase = reason;
      }

      const response = await completeBooking(payload);
      toast.success(response.message || "Booking completed successfully.");
      setOpen(false);
      setNewPrice("");
      setReason("");
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

        <div className="space-y-4 border-t pt-4">
          <div className="space-y-2">
            <Label htmlFor="new_price" className="text-navy font-semibold">
              New Total Amount (Optional)
            </Label>
            <Input
              id="new_price"
              type="number"
              placeholder="e.g. 500"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="bg-gray-50/50"
            />
            <p className="text-[10px] text-muted-foreground">
              Only fill if the amount has increased. Must be more than{" "}
              {formatCurrency(booking.price, currency)}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-navy font-semibold">
              Reason for Price Increase
            </Label>
            <Textarea
              id="reason"
              placeholder="Explain why the price is higher..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[80px] bg-gray-50/50 resize-none"
            />
          </div>
        </div>
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
