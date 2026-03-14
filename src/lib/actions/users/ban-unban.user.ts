"use client";

import { useMutation } from "@tanstack/react-query";

import type { UserStatusMutationResponse } from "@/types/users-manage";

import { api as instance } from "@/lib/api";

export const useBanUser = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await instance.patch<UserStatusMutationResponse>(`/auth/user/${userId}/ban`);
      return response.data;
    }
  });
};

export const useUnbanUser = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await instance.patch<UserStatusMutationResponse>(
        `/auth/user/${userId}/unban`
      );
      return response.data;
    }
  });
};
