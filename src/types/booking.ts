export type BookingStatus = "upcoming" | "completed";

export interface BookingWorkshop {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Booking {
  id: string;
  title: string;
  jobId: string;
  scheduledAt: string;
  priceDkk: number;
  workshop: BookingWorkshop;
  status: BookingStatus;
}
