export type ReviewModerationStatus = "visible" | "flagged" | "hidden";

export interface ReviewModerationQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}

export interface ReviewModerationMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
}

export interface ReviewModerationApiItem {
  id: string;
  bookingId: string;
  userId: string;
  rating: number;
  comment: string;
  isFlagged: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
  };
  booking?: {
    workshop?: {
      workshopName?: string;
    };
  };
}

export interface ReviewModerationData {
  meta: ReviewModerationMeta;
  data: ReviewModerationApiItem[];
}

export interface ReviewModerationResponse {
  success: boolean;
  message: string;
  data: ReviewModerationData;
}

export interface ReviewModerationMutationResponse {
  success: boolean;
  message: string;
  data: ReviewModerationApiItem;
}

export interface ReviewModerationItem {
  id: string;
  userName: string;
  workshopName: string;
  rating: number;
  comment: string;
  status: ReviewModerationStatus;
  createdAt: string;
}
