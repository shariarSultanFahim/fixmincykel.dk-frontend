"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateJobInput, CreateJobResponse } from "@/types/job-create";

import { api as instance } from "@/lib/api";

const toFormData = (payload: CreateJobInput) => {
  const formData = new FormData();

  const { photos, ...data } = payload;

  formData.append("data", JSON.stringify(data));

  photos.forEach((photo) => {
    formData.append("image", photo);
  });

  return formData;
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateJobInput) => {
      const response = await instance.post<CreateJobResponse>("/jobs", toFormData(payload), {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jobs-manage"] });
    }
  });
};
