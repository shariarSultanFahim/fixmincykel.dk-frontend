"use client";

import { useQuery } from "@tanstack/react-query";

import type { AdminAnalyticsResponse, DailyActivityFeedResponse } from "@/types/admin-analytics";

import { api as instance } from "@/lib/api";

export const useGetAdminAnalytics = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["admin-analytics"],
    enabled,
    queryFn: async () => {
      const response = await instance.get<AdminAnalyticsResponse>("/analytics/admin");
      return response.data;
    }
  });
};

export const useGetDailyActivityFeed = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["admin-activity-feed"],
    enabled,
    queryFn: async () => {
      const response = await instance.get<DailyActivityFeedResponse>("/activity/daily-feed");
      return response.data;
    }
  });
};
