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

interface SendReminderDialogProps {
  workshop: WorkshopFinancial;
  onClose: () => void;
}

export default function SendReminderDialog({ workshop, onClose }: SendReminderDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    // Simulate sending reminder
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="space-y-4 border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Payment Reminder</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-600">
          Send a payment reminder email to {workshop.name} for their overdue platform fee?
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? "Sending..." : "Send Reminder"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
