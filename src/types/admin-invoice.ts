export interface MonthlyInvoiceWorkshop {
  id: string;
  workshopName: string;
  ownerName: string;
  email: string;
  address: string;
  phone: string;
  platformFees: number | null;
  avgRating: number;
  avatar: string | null;
}

export interface MonthlyInvoiceItem {
  id: string;
  title: string;
  workshopId: string;
  billingMonth: string;
  totalJobs: number;
  totalJobAmount: number;
  platformFee: number;
  workshopRevenue: number;
  totalAmount: number;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  workshop: MonthlyInvoiceWorkshop;
}

export interface MonthlyInvoiceListMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface MonthlyInvoiceListResponse {
  success: boolean;
  message: string;
  meta: MonthlyInvoiceListMeta;
  data: MonthlyInvoiceItem[];
}

export interface MonthlyInvoiceListParams {
  month: string;
  page?: number;
  limit?: number;
  status?: "PENDING" | "PAID";
}

export interface MarkInvoicePaidResponse {
  success: boolean;
  message: string;
}

export interface GenerateMonthlyInvoicesRequest {
  month: string;
}

export interface GenerateMonthlyInvoicesResponse {
  success: boolean;
  message: string;
}

export interface AdjustWorkshopPlatformFeesRequest {
  workshopId: string;
  platformFees: number;
}

export interface AdjustWorkshopPlatformFeesResponse {
  success: boolean;
  message: string;
}
