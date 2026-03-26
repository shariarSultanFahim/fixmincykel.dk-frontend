"use client";

import { useQuery } from "@tanstack/react-query";

import { api as instance } from "@/lib/api";

export interface WorkshopAnalyticsData {
  totalOffersMade: number;
  totalBookings: number;
  conversionRate: number;
  activeBookings: number;
  completedBookings: number;
  totalRevenue: number;
  avgJobValue: number;
  platformFees: number;
  workshopRevenue: number;
  avgRating: number;
  reviewsCount: number;
}

interface GetAnalyticsResponse {
  success: boolean;
  message: string;
  data: WorkshopAnalyticsData;
}

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics", "workshop"],
    queryFn: async () => {
      const response = await instance.get<GetAnalyticsResponse>("/analytics/workshop");
      return response.data;
    }
  });
};
