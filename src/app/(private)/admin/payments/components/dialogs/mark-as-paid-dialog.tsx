import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import type { WorkshopFinancial } from "../../data/payments";

interface MarkAsPaidDialogProps {
  workshop: WorkshopFinancial;
  platformFeeAmount: number;
  onClose: () => void;
}

export default function MarkAsPaidDialog({
  workshop,
  platformFeeAmount,
  onClose
}: MarkAsPaidDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const currencyFormatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0
  });

  const handleMarkAsPaid = async () => {
    setIsLoading(true);
    // Simulate marking as paid
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="space-y-4 border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark as Paid</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-600">
          Mark the platform fee of {currencyFormatter.format(platformFeeAmount)} for {workshop.name}{" "}
          as paid?
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleMarkAsPaid}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Marking..." : "Mark as Paid"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
