"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  ApiBookingStatus,
  CalendarBooking,
  CalendarData,
  PaymentStatus
} from "@/types/calendar";

import { api as instance } from "@/lib/api";

interface WorkshopCalendarApiBooking {
  id: string;
  scheduleStart: string;
  scheduleEnd: string;
  status: ApiBookingStatus;
  paymentStatus: PaymentStatus;
  job: {
    title: string;
    bikeName?: string;
  };
  offer: {
    price: number;
  };
  user: {
    name: string;
  };
}

interface WorkshopCalendarBookingsResponse {
  success: boolean;
  message: string;
  data: WorkshopCalendarApiBooking[];
}

const mapBookingStatus = (
  status: ApiBookingStatus,
  paymentStatus: PaymentStatus
): CalendarBooking["status"] => {
  if (status === "IN_PROGRESS") {
    return "in-progress";
  }

  if (status === "COMPLETED") {
    return paymentStatus === "PENDING" ? "awaiting-payment" : "completed";
  }

  return "upcoming";
};

const toDateString = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
};

const toTimeString = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "00:00";
  }

  return date.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

const mapToCalendarData = (bookings: WorkshopCalendarApiBooking[]): CalendarData => {
  const mappedBookings: CalendarBooking[] = bookings.map((booking) => ({
    id: booking.id,
    date: toDateString(booking.scheduleStart),
    startTime: toTimeString(booking.scheduleStart),
    endTime: toTimeString(booking.scheduleEnd),
    scheduleStart: booking.scheduleStart,
    scheduleEnd: booking.scheduleEnd,
    customerName: booking.user?.name || "Unknown",
    serviceName: booking.job?.title || booking.job?.bikeName || "Bike Service",
    price: booking.offer?.price ?? 0,
    status: mapBookingStatus(booking.status, booking.paymentStatus)
  }));

  return {
    today: new Date().toISOString().slice(0, 10),
    currency: "DKK",
    bookings: mappedBookings.sort(
      (a, b) => new Date(a.scheduleStart).getTime() - new Date(b.scheduleStart).getTime()
    )
  };
};

const useCalendarBookingsQuery = (
  workshopId: string | undefined,
  key: string,
  endpoint: string
) => {
  return useQuery({
    queryKey: ["bookings", "workshop", workshopId, key],
    enabled: Boolean(workshopId),
    queryFn: async () => {
      const response = await instance.get<WorkshopCalendarBookingsResponse>(endpoint);
      return mapToCalendarData(response.data.data);
    }
  });
};

export const useGetWorkshopCalendarBookings = (workshopId?: string) => {
  return useCalendarBookingsQuery(workshopId, "all", `/workshop/${workshopId}/bookings`);
};

export const useGetWorkshopWeeklyCalendarBookings = (workshopId?: string) => {
  return useCalendarBookingsQuery(workshopId, "weekly", `/booking/weekly/workshop/${workshopId}`);
};

export const useGetWorkshopDailyCalendarBookings = (workshopId?: string) => {
  return useCalendarBookingsQuery(workshopId, "daily", `/booking/daily/workshop/${workshopId}`);
};
