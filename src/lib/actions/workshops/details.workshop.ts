"use client";

import { useQuery } from "@tanstack/react-query";

import { WorkshopDetailsResponse } from "@/types/workshop-manage";

import { api as instance } from "@/lib/api";

export const useGetWorkshopDetails = (workshopId: string) => {
  return useQuery({
    queryKey: ["workshop-details", workshopId],
    enabled: !!workshopId,
    queryFn: async () => {
      const response = await instance.get<WorkshopDetailsResponse>(`/workshop/${workshopId}`);
      return response.data;
    }
  });
};
