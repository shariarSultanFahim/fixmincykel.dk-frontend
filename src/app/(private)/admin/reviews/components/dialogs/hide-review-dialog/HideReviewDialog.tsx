import { AlertTriangle } from "lucide-react";

import type { ReviewModerationItem } from "@/types/review-moderation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HideReviewDialogProps {
  review: ReviewModerationItem;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function HideReviewDialog({ review, onClose, onConfirm }: HideReviewDialogProps) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="space-y-4 border-border sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Hide Review</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Hide the review from{" "}
          <span className="font-semibold text-gray-900">{review.userName}</span> about{" "}
          <span className="font-semibold text-gray-900">{review.workshopName}</span>?
        </p>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 text-sm text-orange-700">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <span>
              This will remove the review from public view but keep it in the database for records.
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            className="bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => onConfirm(review.id)}
          >
            Hide Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
