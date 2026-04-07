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

export interface WeeklyBookingsData {
  sunDay: number;
  monDay: number;
  tuesDay: number;
  wednesDay: number;
  thursDay: number;
  friDay: number;
  saturDay: number;
}

export interface WorkshopActivityItem {
  type: string;
  timestamp: string;
  message: string;
  details: {
    id: string;
    userName?: string;
    price?: number;
  };
}

interface UserAnalyticsData {
  totalJobs: number;
  totalBookings: number;
  totalCompletedBookings: number;
  totalSpent: number;
  reviewsGiven: number;
}

interface GetAnalyticsResponse {
  success: boolean;
  message: string;
  data: WorkshopAnalyticsData;
}

interface GetUserAnalyticsResponse {
  success: boolean;
  message: string;
  data: UserAnalyticsData;
}
interface GetWeeklyBookingsResponse {
  success: boolean;
  message: string;
  data: WeeklyBookingsData;
}

interface GetWorkshopActivitiesResponse {
  success: boolean;
  message: string;
  data: WorkshopActivityItem[];
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

export const useGetWeeklyBookingsAnalytics = () => {
  return useQuery({
    queryKey: ["analytics", "weekly-bookings"],
    queryFn: async () => {
      const response = await instance.get<GetWeeklyBookingsResponse>("/analytics/weekly-bookings");
      return response.data;
    }
  });
};

export const useGetWorkshopActivities = () => {
  return useQuery({
    queryKey: ["activity", "workshop-activities"],
    queryFn: async () => {
      const response = await instance.get<GetWorkshopActivitiesResponse>(
        "/activity/workshop-activities"
      );
      return response.data;
    }
  });
};

export const useGetUserAnalytics = () => {
  return useQuery({
    queryKey: ["analytics", "user"],
    queryFn: async () => {
      const response = await instance.get<GetUserAnalyticsResponse>("/analytics/user");
      return response.data;
    }
  });
};
