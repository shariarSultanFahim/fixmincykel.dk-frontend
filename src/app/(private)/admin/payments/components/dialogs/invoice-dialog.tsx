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

interface InvoiceDialogProps {
  workshop: WorkshopFinancial;
  onClose: () => void;
}

export default function InvoiceDialog({ workshop, onClose }: InvoiceDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    // Simulate sending invoice
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="space-y-4 border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Invoice</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-600">
          Are you sure you want to send an invoice to {workshop.name}?
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Sending..." : "Send Invoice"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
