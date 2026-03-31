export type JobStatus = "PENDING" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "EXPIRED";
export type JobUrgency = "LOW" | "MEDIUM" | "HIGH";
export type OfferStatus = "PENDING" | "ACCEPTED" | "REJECTED";
export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface JobCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobCategoryItem {
  description: string;
  category: JobCategory;
}

export interface JobBooking {
  id: string;
  jobId: string;
  offerId: string;
  userId: string;
  workshopId: string;
  scheduleStart: string;
  scheduleEnd: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  workshop: {
    workshopName: string;
    address: string;
    phone: string;
    email: string;
  };
  offer: {
    price: number;
  };
}

export interface Workshop {
  id: string;
  email: string;
  phone: string;
  role: string;
  avatar: string | null;
  workshopName: string;
  ownerName: string;
  cvrNumber: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  isVerified: boolean;
  avgRating: number;
  reviewsCount: number;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobOffer {
  id: string;
  jobId: string;
  workshopId: string;
  price: number;
  estimatedTime: string;
  message: string;
  status: OfferStatus;
  distance: number;
  isBestValue: boolean;
  score: number;
  createdAt: string;
  updatedAt: string;
  workshop: Workshop;
}

export interface JobOffersMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface JobOffersPayload {
  meta: JobOffersMeta;
  data: JobOffer[];
}

export interface JobUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  isVerified?: boolean;
}

export interface AdminJob {
  id: string;
  title: string;
  description: string;
  address: string;
  bikeName: string;
  bikeType: string;
  bikeBrand: string;
  bikeId: string | null;
  bike: string | null;
  city: string;
  categories: JobCategoryItem[];
  latitude: number;
  bookings: JobBooking[];
  createdAt: string;
  longitude: number;
  offers: JobOffer[];
  photos: string[];
  postalCode: string;
  radius: number;
  status: JobStatus;
  urgency: JobUrgency;
  preferredTime: string;
  updatedAt: string;
  user: JobUser;
}

export interface AdminJobDetails {
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
  urgency: JobUrgency;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  bikeId: string | null;
}

export interface JobsMeta {
  page: number;
  limit: number;
  total: number;
}

export interface JobsListPayload {
  meta: JobsMeta;
  data: AdminJob[];
}

export interface JobsListResponse {
  success: boolean;
  message: string;
  data: JobsListPayload;
}

export interface JobDetailsResponse {
  success: boolean;
  message: string;
  data: AdminJobDetails;
}

export interface JobOffersResponse {
  success: boolean;
  message: string;
  data: JobOffersPayload;
}

export interface JobsQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: JobStatus;
}
