export type BookingStatus = "upcoming" | "in-progress" | "completed" | "awaiting-payment";

export interface CalendarBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
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
