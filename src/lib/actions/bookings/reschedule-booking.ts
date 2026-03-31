"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { api as instance } from "@/lib/api";

interface RescheduleBookingPayload {
  scheduleStart: string;
  scheduleEnd: string;
}

interface RescheduleBookingResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const useRescheduleBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      payload
    }: {
      bookingId: string;
      payload: RescheduleBookingPayload;
    }) => {
      const response = await instance.patch<RescheduleBookingResponse>(
        `/booking/${bookingId}/reschedule`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate bookings queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        throw error.response?.data?.message || "Failed to reschedule booking";
      }
      throw error;
    }
  });
};
