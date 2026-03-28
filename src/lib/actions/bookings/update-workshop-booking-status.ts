"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { patch } from "@/lib/api";

interface BookingStatusMutationResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const useStartWorkshopBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      return patch<BookingStatusMutationResponse, { status: "IN_PROGRESS" }>(
        `/booking/${bookingId}`,
        {
          status: "IN_PROGRESS"
        }
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      throw new Error(getApiErrorMessage(error, "Failed to start booking."));
    }
  });
};

export const useCompleteWorkshopBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      return patch<BookingStatusMutationResponse>(`/booking/${bookingId}/completed`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      throw new Error(getApiErrorMessage(error, "Failed to complete booking."));
    }
  });
};
