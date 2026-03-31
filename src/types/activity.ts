export type ActivityType =
  | "OFFER_RECEIVED"
  | "REVIEW_LEFT"
  | "BOOKING_COMPLETED"
  | "BOOKING_MADE"
  | "JOB_POSTED";

export interface ActivityDetails {
  id: string;
  price?: number;
  workshopName?: string;
  rating?: number;
  title?: string;
}

export interface Activity {
  type: ActivityType;
  timestamp: string;
  message: string;
  details: ActivityDetails;
}

export interface MyActivitiesResponse {
  success: boolean;
  message: string;
  data: Activity[];
}
