import type { ReviewFormDialogProps, ReviewFormValues } from "@/types/review";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/ui";

import { ReviewForm } from "../forms/ReviewForm";

export function ReviewFormDialog({
  state,
  open,
  isSubmitting,
  onSubmit,
  onOpenChange
}: ReviewFormDialogProps) {
  if (!state) return null;

  const workshopName = state.pendingReview?.workshopName;
  const defaultValues: ReviewFormValues = { rating: 0, comment: "" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
          <DialogDescription>
            {`Share your experience with ${workshopName ?? "this workshop"}.`}
          </DialogDescription>
        </DialogHeader>
        <ReviewForm
          defaultValues={defaultValues}
          submitLabel="Submit review"
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
