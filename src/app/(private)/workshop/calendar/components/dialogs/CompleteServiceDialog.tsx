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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
          Complete
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
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Split Payment</span>
            <button type="button" className="text-primary hover:text-primary/80">
              + Add Person
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs font-medium text-navy">Enter amount</p>
              <Input placeholder="Amount" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-navy">%</p>
              <Input placeholder="50" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-navy">Amount</p>
              <Input placeholder={formatCurrency(booking.price, currency)} />
            </div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Total percentage: 68% (should be 100%)
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-primary text-white hover:bg-primary/90">Cancel</Button>
          </DialogClose>
          <Button className="bg-primary text-white hover:bg-primary/90">Confirm & Complete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
