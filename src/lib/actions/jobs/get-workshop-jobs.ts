"use client";

import { useQuery } from "@tanstack/react-query";

import type { AdminJob } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

interface GetWorkshopJobsResponse {
  success: boolean;
  message: string;
  data: AdminJob[];
}

export const useGetWorkshopJobs = (sort: string = "createdAt", sortOrder: string = "asc") => {
  return useQuery({
    queryKey: ["workshop-jobs", sort, sortOrder],
    queryFn: async () => {
      const response = await instance.get<GetWorkshopJobsResponse>(
        `/workshop/me/jobs?sort=${sort}&sortOrder=${sortOrder}`
      );
      return response.data.data;
    }
  });
};
