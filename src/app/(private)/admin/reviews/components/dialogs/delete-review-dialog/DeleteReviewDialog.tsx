import { AlertTriangle } from "lucide-react";

import type { ReviewModerationItem } from "@/types/review-moderation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DeleteReviewDialogProps {
  review: ReviewModerationItem;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function DeleteReviewDialog({
  review,
  onClose,
  onConfirm
}: DeleteReviewDialogProps) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="space-y-4 border-border sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete Review</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Permanently delete the review from{" "}
          <span className="font-semibold text-gray-900">{review.userName}</span> about{" "}
          <span className="font-semibold text-gray-900">{review.workshopName}</span>?
        </p>

        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <span>This action cannot be undone. The review will be permanently removed.</span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => onConfirm(review.id)}
          >
            Delete Permanently
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
