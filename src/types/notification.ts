export type NotificationEventType =
  | "NEW_JOB_POSTED"
  | "BOOKING_CREATED"
  | "BOOKING_UPDATED"
  | "BOOKING_CANCELLED"
  | "INVOICE_CREATED"
  | "INVOICE_UPDATED"
  | "NEW_MESSAGE"
  | string;

export interface Notification {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  receiverUserId: string | null;
  receiverWorkshopId: string | null;
  triggeredById: string | null;
  jobId: string | null;
  bookingId: string | null;
  invoiceId: string | null;
  eventType: NotificationEventType;
  createdAt: string;
  updatedAt: string;
}
