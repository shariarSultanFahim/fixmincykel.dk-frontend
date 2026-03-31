export type UserManageStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED";
export type UserRole = "USER" | "ADMIN";
export type UserJobStatus =
  | "PENDING"
  | "OPEN"
  | "COMPLETED"
  | "IN_PROGRESS"
  | "CANCELLED"
  | "EXPIRED";
export type UserBookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface UserManageQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  role?: UserRole | "";
  status?: UserManageStatus | "";
}

export interface UserJob {
  id: string;
  title: string;
  urgency: string;
  status: UserJobStatus;
  createdAt: string;
}

export interface UserBooking {
  id: string;
  job: {
    title: string;
  };
  workshop: {
    workshopName: string;
  };
  createdAt: string;
  paymentStatus: string;
  status: UserBookingStatus;
}

export interface UserReview {
  id: string;
  workshopName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface UserManageItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  role: UserRole;
  bikes: [];
  country: string;
  city: string;
  state: string;
  isDeleted: boolean;
  isVerified: boolean;
  status: UserManageStatus;
  jobs: UserJob[];
  bookings: UserBooking[];
  reviews?: UserReview[];
  postalCode: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    bookings: number;
    messages: number;
    reviews: number;
    bikes: number;
    blogs: number;
    jobs: number;
    rooms: number;
  };
}

export interface Meta {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
}

export interface UserManagePagination {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface UserManageResponse {
  success: boolean;
  message: string;
  data: { meta: Meta; data: UserManageItem[] };
}
export interface UserDetailsResponse {
  success: boolean;
  message: string;
  data: UserManageItem;
}

export interface UserStatusMutationResponse {
  success: boolean;
  message: string;
  data: UserManageItem;
}
