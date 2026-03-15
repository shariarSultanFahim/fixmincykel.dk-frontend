"use client";

import { useQuery } from "@tanstack/react-query";

import type { UserRepairListResponse, UserRepairQueryParams } from "@/types/user-repair";

import { api as instance } from "@/lib/api";

const buildParams = (params?: UserRepairQueryParams): UserRepairQueryParams => {
  if (!params) {
    return {};
  }

  const cleanedParams: UserRepairQueryParams = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === "string" && value.trim() === "") {
      continue;
    }

    cleanedParams[key as keyof UserRepairQueryParams] = value;
  }

  return cleanedParams;
};

export const useGetMyJobs = (params?: UserRepairQueryParams, enabled = true) => {
  return useQuery({
    queryKey: ["user-repairs", params],
    enabled,
    queryFn: async () => {
      const response = await instance.get<UserRepairListResponse>("/auth/user/me/jobs", {
        params: buildParams(params)
      });

      return response.data;
    }
  });
};
