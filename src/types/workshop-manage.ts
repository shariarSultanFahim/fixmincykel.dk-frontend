export type WorkshopApprovalStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export interface WorkshopBooking {
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
}

export interface WorkshopInvoice {
  id: string;
  workshopId: string;
  billingMonth: string;
  totalJobs: number;
  totalAmount: number;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkshopJob {
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

export interface WorkshopRoom {
  id: string;
  bookingId: string;
  userId: string;
  workshopId: string;
  name: string;
  lastMessageId: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WorkshopCount {
  categories: number;
  bookings: number;
  jobs: number;
  invoices: number;
  rooms: number;
  workshopOpeningHours: number;
}

export interface AdminWorkshop {
  id: string;
  workshopName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  avatar: string | null;
  role: string;
  isVerified: boolean;
  approvalStatus: WorkshopApprovalStatus;
  avgRating: number;
  city: string;
  country: string | null;
  ownerName: string;
  latitude: number;
  longitude: number;
  cvrNumber: string;
  createdAt: string;
  updatedAt: string;
  state: string | null;
  postalCode: string;
  bookings: WorkshopBooking[];
  categories: unknown[];
  workshopOpeningHours: unknown[];
  invoices: WorkshopInvoice[];
  jobs: WorkshopJob[];
  reviewsCount: number;
  rooms: WorkshopRoom[];
  _count: WorkshopCount;
}

export interface WorkshopListMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface WorkshopListResponse {
  success: boolean;
  message: string;
  data: {
    meta: WorkshopListMeta;
    data: AdminWorkshop[];
  };
}

export interface WorkshopDetailsResponse {
  success: boolean;
  message: string;
  data: AdminWorkshop;
}

export interface WorkshopStatusResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    approvalStatus: WorkshopApprovalStatus;
    workshopName: string;
    email: string;
  };
}

export interface WorkshopQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  approvalStatus?: WorkshopApprovalStatus;
}
