export type BookingStatus = "upcoming" | "in-progress" | "completed" | "awaiting-payment";
export type ApiBookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface CalendarBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  scheduleStart: string;
  scheduleEnd: string;
  customerName: string;
  serviceName: string;
  price: number;
  status: BookingStatus;
}

export interface CalendarData {
  today: string;
  currency: string;
  bookings: CalendarBooking[];
}
