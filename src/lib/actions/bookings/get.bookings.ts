"use client";

import { useQuery } from "@tanstack/react-query";

import { BookingManageListResponse, BookingManageQueryParams } from "@/types/booking-manage";

import { api as instance } from "@/lib/api";

const buildBookingParams = (params?: BookingManageQueryParams): BookingManageQueryParams => {
  if (!params) {
    return {};
  }

  const cleanedParams: BookingManageQueryParams = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === "string" && value.trim() === "") {
      continue;
    }

    cleanedParams[key as keyof BookingManageQueryParams] = value;
  }

  return cleanedParams;
};

export const useGetBookings = (params?: BookingManageQueryParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["bookings-manage", params],
    enabled,
    queryFn: async () => {
      const response = await instance.get<BookingManageListResponse>("/booking", {
        params: buildBookingParams(params)
      });
      return response.data;
    }
  });
};
