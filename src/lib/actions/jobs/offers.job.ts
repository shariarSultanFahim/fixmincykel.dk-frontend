"use client";

import { useQuery } from "@tanstack/react-query";

import { JobOffersResponse } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

export const useGetJobOffers = (jobId: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["job-offers", jobId, page, limit],
    enabled: !!jobId,
    queryFn: async () => {
      const response = await instance.get<JobOffersResponse>(
        `/jobs/${jobId}/offers?page=${page}&limit=${limit}`
      );
      return response.data;
    }
  });
};
