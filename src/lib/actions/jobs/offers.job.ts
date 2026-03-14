"use client";

import { useQuery } from "@tanstack/react-query";

import { JobOffersResponse } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

export const useGetJobOffers = (jobId: string) => {
  return useQuery({
    queryKey: ["job-offers", jobId],
    enabled: !!jobId,
    queryFn: async () => {
      const response = await instance.get<JobOffersResponse>(`/jobs/${jobId}/offers`);
      return response.data;
    }
  });
};
