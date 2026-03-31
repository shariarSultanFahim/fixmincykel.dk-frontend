"use client";

import { useMutation } from "@tanstack/react-query";

import { WorkshopStatusResponse } from "@/types/workshop-manage";

import { api as instance } from "@/lib/api";

export const useSuspendWorkshop = () => {
  return useMutation({
    mutationFn: async (workshopId: string) => {
      const response = await instance.patch<WorkshopStatusResponse>(
        `/workshop/${workshopId}/suspend`
      );
      return response.data;
    }
  });
};
