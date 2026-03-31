"use client";

import { useQuery } from "@tanstack/react-query";

import type { JobBooking } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

interface GetBookingsResponse {
  success: boolean;
  message: string;
  data: JobBooking[];
}

export const useGetBookings = (userId?: string) => {
  return useQuery({
    queryKey: ["bookings", userId],
    enabled: !!userId,
    queryFn: async () => {
      const response = await instance.get<GetBookingsResponse>(`/booking/user/${userId}`);
      return response.data;
    }
  });
};
