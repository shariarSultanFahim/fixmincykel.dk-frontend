"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { api as instance } from "@/lib/api";

interface CreateOfferPayload {
  jobId: string;
  workshopId: string;
  price: number;
  estimatedTime: string;
  message: string;
}

interface CreateOfferResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const useCreateJobOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOfferPayload) => {
      const response = await instance.post<CreateOfferResponse>("/offers", payload);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate workshop jobs and job offers queries
      queryClient.invalidateQueries({ queryKey: ["workshop-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-offers"] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        throw error.response?.data?.message || "Failed to create offer";
      }
      throw error;
    }
  });
};
