"use client";

import { useMutation } from "@tanstack/react-query";

import type { UserManageQueryParams } from "@/types/users-manage";

import { api as instance } from "@/lib/api";

export const exportUsers = async (params?: UserManageQueryParams): Promise<Blob> => {
  const response = await instance.get<Blob>("/analytics/export/users", {
    params,
    responseType: "blob"
  });

  return response.data;
};

export const useExportUsers = () => {
  return useMutation({
    mutationFn: async (params?: UserManageQueryParams) => exportUsers(params)
  });
};
