"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  CreateWorkshopOpeningHourPayload,
  UpdateWorkshopOpeningHourInput,
  UpdateWorkshopProfileInput,
  WorkshopCategoryListResponse,
  WorkshopCategoryMutationPayload,
  WorkshopCategoryMutationResponse,
  WorkshopMeResponse,
  WorkshopOpeningHourListResponse,
  WorkshopOpeningHourMutationResponse
} from "@/types/workshop-profile";

import { api as instance } from "@/lib/api";

const toWorkshopUpdateFormData = (payload: UpdateWorkshopProfileInput) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
};

export const useGetMyWorkshopProfile = () => {
  return useQuery({
    queryKey: ["workshop-profile", "me"],
    queryFn: async () => {
      const response = await instance.get<WorkshopMeResponse>("/workshop/me");
      return response.data;
    }
  });
};

export const useUpdateWorkshopProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateWorkshopProfileInput) => {
      const response = payload.image
        ? await instance.patch<WorkshopMeResponse>(
            `/workshop/${payload.workshopId}`,
            toWorkshopUpdateFormData(payload),
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
        : await instance.patch<WorkshopMeResponse>(`/workshop/${payload.workshopId}`, payload.data);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workshop-profile", "me"] });
    }
  });
};

export const useGetWorkshopCategories = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["workshop-categories"],
    enabled,
    queryFn: async () => {
      const response = await instance.get<WorkshopCategoryListResponse>("/workshop-category");
      return response.data;
    }
  });
};

export const useAddWorkshopCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: WorkshopCategoryMutationPayload) => {
      const response = await instance.post<WorkshopCategoryMutationResponse>(
        "/workshop-category",
        payload
      );

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workshop-categories"] });
      await queryClient.invalidateQueries({ queryKey: ["workshop-profile", "me"] });
    }
  });
};

export const useRemoveWorkshopCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workshopCategoryId: string) => {
      const response = await instance.delete<WorkshopCategoryMutationResponse>(
        `/workshop-category/${workshopCategoryId}`
      );

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workshop-categories"] });
      await queryClient.invalidateQueries({ queryKey: ["workshop-profile", "me"] });
    }
  });
};

export const useGetWorkshopOpeningHours = (workshopId?: string, enabled = true) => {
  return useQuery({
    queryKey: ["workshop-opening-hours", workshopId],
    enabled: enabled && Boolean(workshopId),
    queryFn: async () => {
      const response = await instance.get<WorkshopOpeningHourListResponse>(
        `/workshop-opening-hour/workshop/${workshopId}`
      );
      return response.data;
    }
  });
};

export const useCreateWorkshopOpeningHour = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateWorkshopOpeningHourPayload) => {
      const response = await instance.post<WorkshopOpeningHourMutationResponse>(
        "/workshop-opening-hour",
        payload
      );
      return response.data;
    },
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({
        queryKey: ["workshop-opening-hours", payload.workshopId]
      });
      await queryClient.invalidateQueries({ queryKey: ["workshop-profile", "me"] });
    }
  });
};

export const useUpdateWorkshopOpeningHour = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateWorkshopOpeningHourInput) => {
      const response = await instance.patch<WorkshopOpeningHourMutationResponse>(
        `/workshop-opening-hour/${payload.openingHourId}`,
        payload.data
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workshop-opening-hours"] });
      await queryClient.invalidateQueries({ queryKey: ["workshop-profile", "me"] });
    }
  });
};
