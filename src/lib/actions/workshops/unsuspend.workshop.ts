"use client";

import { useMutation } from "@tanstack/react-query";

import { WorkshopStatusResponse } from "@/types/workshop-manage";

import { api as instance } from "@/lib/api";

export const useUnsuspendWorkshop = () => {
  return useMutation({
    mutationFn: async (workshopId: string) => {
      const response = await instance.patch<WorkshopStatusResponse>(
        `/workshop/${workshopId}/unsuspend`
      );
      return response.data;
    }
  });
};
