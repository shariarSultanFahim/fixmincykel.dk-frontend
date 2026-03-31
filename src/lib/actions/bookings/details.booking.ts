"use client";

import { useQuery } from "@tanstack/react-query";

import { BookingManageDetailsResponse } from "@/types/booking-manage";

import { api as instance } from "@/lib/api";

export const useGetBookingDetails = (bookingId: string) => {
  return useQuery({
    queryKey: ["booking-details", bookingId],
    enabled: !!bookingId,
    queryFn: async () => {
      const response = await instance.get<BookingManageDetailsResponse>(`/booking/${bookingId}`);
      return response.data;
    }
  });
};
