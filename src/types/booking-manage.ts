export type BookingManageStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type BookingManagePaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface BookingManageQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: BookingManageStatus;
  paymentStatus?: BookingManagePaymentStatus;
}

export interface BookingManageMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface BookingManageJob {
  id: string;
  userId: string;
  title: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  radius: number;
  bikeName: string;
  bikeType: string;
  bikeBrand: string;
  photos: string[];
  preferredTime: string;
  urgency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  bikeId: string | null;
}

export interface BookingManageOffer {
  id: string;
  jobId: string;
  workshopId: string;
  price: number;
  estimatedTime: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingManageReview {
  id: string;
  bookingId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingManageWorkshop {
  id: string;
  workshopName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  approvalStatus: string;
  avgRating: number;
  reviewsCount: number;
}

export interface BookingManageUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  avatar: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
}

export interface AdminBooking {
  id: string;
  jobId: string;
  offerId: string;
  userId: string;
  workshopId: string;
  scheduleStart: string;
  scheduleEnd: string;
  status: BookingManageStatus;
  paymentStatus: BookingManagePaymentStatus;
  createdAt: string;
  updatedAt: string;
  job: BookingManageJob;
  offer: BookingManageOffer;
  review: BookingManageReview | null;
  workshop?: BookingManageWorkshop;
  user?: BookingManageUser;
}

export interface BookingManageListResponse {
  success: boolean;
  message: string;
  data: {
    meta: BookingManageMeta;
    data: AdminBooking[];
  };
}

export interface BookingManageDetailsResponse {
  success: boolean;
  message: string;
  data: AdminBooking;
}
