"use client";

import { useQuery } from "@tanstack/react-query";

import type { VisionStatisticsResponse } from "@/types/vision-statistics";

import { get } from "@/lib/api";

export const useGetVisionStatistics = () => {
  return useQuery({
    queryKey: ["vision-statistics"],
    queryFn: ({ signal }) => get<VisionStatisticsResponse>("/vision-statistics", { signal })
  });
};
