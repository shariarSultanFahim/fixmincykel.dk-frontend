"use client";

import { useMutation } from "@tanstack/react-query";

import type {
  CreatePlatformCategoryPayload,
  PlatformCategoryMutationResponse,
  PlatformDataResponse,
  UpdatePlatformDataPayload
} from "@/types/platform-data";

import { api as instance } from "@/lib/api";

export const useCreatePlatformCategory = () => {
  return useMutation({
    mutationFn: async (payload: CreatePlatformCategoryPayload) => {
      const response = await instance.post<PlatformCategoryMutationResponse>("/category", payload);

      return response.data;
    }
  });
};

export const useDeletePlatformCategory = () => {
  return useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await instance.delete<PlatformCategoryMutationResponse>(
        `/category/${categoryId}`
      );

      return response.data;
    }
  });
};

export const useUpdatePlatformData = () => {
  return useMutation({
    mutationFn: async (payload: UpdatePlatformDataPayload) => {
      const response = await instance.patch<PlatformDataResponse>("/platform-data", payload);

      return response.data;
    }
  });
};
