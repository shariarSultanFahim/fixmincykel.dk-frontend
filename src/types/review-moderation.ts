export type ReviewModerationStatus = "visible" | "flagged";

export interface ReviewModerationItem {
  id: string;
  userName: string;
  workshopName: string;
  rating: number;
  comment: string;
  status: ReviewModerationStatus;
  createdAt: string;
}
