"use client";

import { useQuery } from "@tanstack/react-query";

import type { AdminJobDetails } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

interface GetJobDetailsResponse {
  success: boolean;
  message: string;
  data: AdminJobDetails;
}

export const useGetJobById = (jobId?: string) => {
  return useQuery({
    queryKey: ["jobs", jobId],
    enabled: !!jobId,
    queryFn: async () => {
      const response = await instance.get<GetJobDetailsResponse>(`/jobs/${jobId}`);
      return response.data.data;
    }
  });
};
