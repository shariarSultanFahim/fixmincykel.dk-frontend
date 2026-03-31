"use client";

import { useQuery } from "@tanstack/react-query";

import type { MyActivitiesResponse } from "@/types/activity";

import { api as instance } from "@/lib/api";

export const useGetMyActivities = () => {
  return useQuery({
    queryKey: ["user-activities"],
    queryFn: async () => {
      const response = await instance.get<MyActivitiesResponse>("/activity/my-activities");
      return response.data?.data ?? [];
    }
  });
};
