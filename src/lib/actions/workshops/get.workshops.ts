"use client";

import { useQuery } from "@tanstack/react-query";

import { WorkshopListResponse, WorkshopQueryParams } from "@/types/workshop-manage";

import { api as instance } from "@/lib/api";

const buildWorkshopParams = (params?: WorkshopQueryParams): WorkshopQueryParams => {
  if (!params) return {};

  const cleanedParams: WorkshopQueryParams = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    cleanedParams[key as keyof WorkshopQueryParams] = value;
  }

  return cleanedParams;
};

export const useGetWorkshops = (params?: WorkshopQueryParams, enabled = true) => {
  return useQuery({
    queryKey: ["workshops-manage", params],
    enabled,
    queryFn: async () => {
      const response = await instance.get<WorkshopListResponse>("/workshop", {
        params: buildWorkshopParams(params)
      });
      return response.data;
    }
  });
};
