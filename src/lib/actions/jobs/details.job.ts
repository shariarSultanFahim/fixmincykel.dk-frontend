"use client";

import { useQuery } from "@tanstack/react-query";

import { JobDetailsResponse } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

export const useGetJobDetails = (jobId: string) => {
  return useQuery({
    queryKey: ["job-details", jobId],
    enabled: !!jobId,
    queryFn: async () => {
      const response = await instance.get<JobDetailsResponse>(`/jobs/${jobId}`);
      return response.data;
    }
  });
};
