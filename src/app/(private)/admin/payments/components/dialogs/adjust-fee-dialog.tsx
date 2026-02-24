import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import type { WorkshopFinancial } from "../../data/payments";

interface AdjustFeeDialogProps {
  workshop: WorkshopFinancial;
  onClose: (newPercentage?: number) => void;
}

export default function AdjustFeeDialog({ workshop, onClose }: AdjustFeeDialogProps) {
  const [percentage, setPercentage] = useState(workshop.platformFeePercentage.toString());
  const [isLoading, setIsLoading] = useState(false);

  const currencyFormatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0
  });

  const calculatedFee = (workshop.totalRevenue * parseFloat(percentage || "0")) / 100;

  const handleAdjust = async () => {
    setIsLoading(true);
    // Simulate adjusting fee
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onClose(parseFloat(percentage));
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="space-y-4 border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust Fee</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-600">
          Adjust the platform fee percentage for {workshop.name}:
        </DialogDescription>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="border-border"
              placeholder="10"
              min="0"
              max="100"
            />
            <span className="text-gray-600">%</span>
          </div>
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-gray-600">New Platform Fee:</p>
            <p className="text-lg font-semibold text-gray-900">
              {currencyFormatter.format(calculatedFee)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {currencyFormatter.format(workshop.totalRevenue)} × {percentage}%
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleAdjust}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Adjusting..." : "Adjust"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
