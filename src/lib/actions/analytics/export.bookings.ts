"use client";

import { useMutation } from "@tanstack/react-query";

import type { BookingManageQueryParams } from "@/types/booking-manage";

import { api } from "@/lib/api";

export const exportBookings = async (params?: BookingManageQueryParams): Promise<Blob> => {
  const response = await api.get<Blob>("/analytics/export/bookings", {
    params,
    responseType: "blob"
  });

  return response.data;
};

export const useExportBookings = () => {
  return useMutation({
    mutationFn: async (params?: BookingManageQueryParams) => exportBookings(params)
  });
};
