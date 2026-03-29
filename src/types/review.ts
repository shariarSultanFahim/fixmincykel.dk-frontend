export interface ReviewSummaryStats {
  averageRating: number;
  totalReviews: number;
  fiveStarReviews: number;
  helpfulVotes: number;
}

export interface PendingReviewApiItem {
  id: string;
  jobId: string;
  offerId: string;
  userId: string;
  workshopId: string;
  scheduleStart: string;
  scheduleEnd: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  workshop: {
    workshopName: string;
  };
}

export interface PendingReviewApiResponse {
  success: boolean;
  message: string;
  data: PendingReviewApiItem[];
}

export interface UserReviewApiItem {
  id: string;
  bookingId: string;
  userId: string;
  rating: number;
  comment: string;
  isFlagged: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  booking?: {
    id: string;
    jobId?: string;
    workshopId?: string;
    scheduleStart?: string;
  };
}

export interface UserReviewsApiResponse {
  success: boolean;
  message: string;
  data: UserReviewApiItem[];
}

export interface PublicReviewApiItem {
  id: string;
  rating: number;
  comment: string;
  isFlagged: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export interface PublicReviewsApiResponse {
  success: boolean;
  message: string;
  data: PublicReviewApiItem[];
}

export interface ReviewCreatePayload {
  bookingId: string;
  userId: string;
  rating: number;
  comment: string;
}

export interface ReviewCreateResponse {
  success: boolean;
  message: string;
  data: UserReviewApiItem;
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
  bookingId: string;
  workshopName: string;
  jobTitle: string;
  scheduledFor: string;
  note: string;
}

export interface ReviewFormValues {
  rating: number;
  comment: string;
}

export type ReviewFormMode = "pending";

export interface ReviewFormDialogState {
  mode: ReviewFormMode;
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
  isSubmitting?: boolean;
  onSubmit: (values: ReviewFormValues) => void;
  onOpenChange: (open: boolean) => void;
}
