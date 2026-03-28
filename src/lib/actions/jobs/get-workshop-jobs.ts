"use client";

import { useQuery } from "@tanstack/react-query";

import type { AdminJob } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

interface GetWorkshopJobsResponse {
  success: boolean;
  message: string;
  data: Array<AdminJob & { offerSend?: boolean; workshopIds?: string[] }>;
}

type WorkshopJob = AdminJob & { offerSend?: boolean; workshopIds?: string[] };

const extractWorkshopJobs = (payload: unknown): WorkshopJob[] => {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const topLevelData = (payload as { data?: unknown }).data;

  if (Array.isArray(topLevelData)) {
    return topLevelData as WorkshopJob[];
  }

  if (topLevelData && typeof topLevelData === "object") {
    const nestedData = (topLevelData as { data?: unknown }).data;
    if (Array.isArray(nestedData)) {
      return nestedData as WorkshopJob[];
    }
  }

  return [];
};

export const useGetWorkshopJobs = (sort: string = "createdAt", sortOrder: string = "asc") => {
  return useQuery({
    queryKey: ["workshop-jobs", sort, sortOrder],
    queryFn: async () => {
      const response = await instance.get<GetWorkshopJobsResponse>(
        `/workshop/me/jobs?sort=${sort}&sortOrder=${sortOrder}`
      );
      return extractWorkshopJobs(response.data);
    }
  });
};
