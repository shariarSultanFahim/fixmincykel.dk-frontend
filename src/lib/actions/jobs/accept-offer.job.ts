"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { api as instance } from "@/lib/api";

interface AcceptOfferResponse {
  success: boolean;
  data?: unknown;
}

export const useAcceptOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (offerId: string) => {
      const response = await instance.post<AcceptOfferResponse>(`/offers/${offerId}/accept`);
      return response.data;
    },
    onSuccess: (_, offerId) => {
      // Invalidate job offers queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["job-offers"] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        throw error.response?.data?.message || "Failed to accept offer";
      }
      throw error;
    }
  });
};
