import type { ReviewFormDialogProps, ReviewFormValues } from "@/types/review";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/ui";

import { ReviewForm } from "../forms/ReviewForm";

export function ReviewFormDialog({ state, open, onOpenChange }: ReviewFormDialogProps) {
  if (!state) return null;

  const isEdit = state.mode === "edit";
  const workshopName = isEdit ? state.review?.workshopName : state.pendingReview?.workshopName;
  const defaultValues: ReviewFormValues = isEdit
    ? {
        rating: state.review?.rating ?? 0,
        comment: state.review?.message ?? ""
      }
    : { rating: 0, comment: "" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit review" : "Leave a review"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Update your review for ${workshopName ?? "this workshop"}.`
              : `Share your experience with ${workshopName ?? "this workshop"}.`}
          </DialogDescription>
        </DialogHeader>
        <ReviewForm
          defaultValues={defaultValues}
          submitLabel={isEdit ? "Save changes" : "Submit review"}
          helperText={isEdit ? "Your updates will be visible right away." : undefined}
          onSubmit={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
