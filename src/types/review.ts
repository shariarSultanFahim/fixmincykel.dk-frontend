export interface ReviewSummaryStats {
  averageRating: number;
  totalReviews: number;
  fiveStarReviews: number;
  helpfulVotes: number;
}

export interface ReviewItem {
  id: string;
  workshopName: string;
  jobId: string;
  jobTitle: string;
  rating: number;
  date: string;
  message: string;
  helpfulCount: number;
}

export interface PendingReview {
  id: string;
  workshopName: string;
  jobTitle: string;
  scheduledFor: string;
  note: string;
}

export interface ReviewFormValues {
  rating: number;
  comment: string;
}

export type ReviewFormMode = "pending" | "edit";

export interface ReviewFormDialogState {
  mode: ReviewFormMode;
  review?: ReviewItem;
  pendingReview?: PendingReview;
}

export interface ReviewFormProps {
  defaultValues: ReviewFormValues;
  submitLabel: string;
  onSubmit: (values: ReviewFormValues) => void;
  onCancel?: () => void;
  helperText?: string;
  isSubmitting?: boolean;
}

export interface RatingStarsProps {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md";
  readOnly?: boolean;
}

export interface ReviewCardProps {
  review: ReviewItem;
  onEdit: (review: ReviewItem) => void;
}

export interface PendingReviewCardProps {
  pendingReview: PendingReview;
  onOpen: (pendingReview: PendingReview) => void;
}

export interface ReviewSummaryBarProps {
  stats: ReviewSummaryStats;
}

export interface ReviewFormDialogProps {
  state: ReviewFormDialogState | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
