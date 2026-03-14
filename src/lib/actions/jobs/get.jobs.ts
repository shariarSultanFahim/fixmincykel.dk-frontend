"use client";

import { useQuery } from "@tanstack/react-query";

import { JobsListResponse, JobsQueryParams } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

const buildJobParams = (params?: JobsQueryParams): JobsQueryParams => {
  if (!params) return {};

  const cleanedParams: JobsQueryParams = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    cleanedParams[key as keyof JobsQueryParams] = value;
  }

  return cleanedParams;
};

export const useGetJobs = (params?: JobsQueryParams, enabled = true) => {
  return useQuery({
    queryKey: ["jobs-manage", params],
    enabled,
    queryFn: async () => {
      const response = await instance.get<JobsListResponse>("/jobs", {
        params: buildJobParams(params)
      });
      return response.data;
    }
  });
};
