export type InvoiceStatus = "sent" | "ready" | "overdue" | "payment-received";

export type InvoiceActionTone = "primary" | "secondary" | "success" | "danger" | "muted";

export interface WorkshopInvoiceAction {
  label: string;
  tone: InvoiceActionTone;
}

export interface WorkshopInvoiceItem {
  id: string;
  name: string;
  completedJobs: number;
  jobRevenue: number;
  feePercentage: number;
  invoiceStatus: InvoiceStatus;
  invoiceStatusDetail?: string;
  actions: WorkshopInvoiceAction[];
}

export interface InvoiceReportSummary {
  reportPeriod: string;
  totalJobRevenue: number;
  totalPlatformFees: number;
  readyWorkshopsCount: number;
  totalWorkshops: number;
}
