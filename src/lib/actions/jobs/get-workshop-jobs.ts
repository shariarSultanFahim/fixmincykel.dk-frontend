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

export const useGetWorkshopJobs = (
  sort: string = "createdAt",
  sortOrder: string = "desc",
  status: string = "OPEN",
  category: string | null = null
) => {
  const params = new URLSearchParams();
  params.append("sort", sort);
  params.append("sortOrder", sortOrder);
  params.append("status", status);
  if (category && category !== "All") {
    params.append("category", category);
  }

  return useQuery({
    queryKey: ["workshop-jobs", sort, sortOrder, status, category],
    queryFn: async () => {
      const response = await instance.get<GetWorkshopJobsResponse>(
        `/workshop/me/jobs?${params.toString()}`
      );
      return extractWorkshopJobs(response.data);
    }
  });
};
