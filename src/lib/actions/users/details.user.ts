"use client";

import { useQuery } from "@tanstack/react-query";

import { UserDetailsResponse } from "@/types/users-manage";

import { api as instance } from "@/lib/api";

export const useGetUserDetails = (userID: string) => {
  return useQuery({
    queryKey: ["users-details", userID],
    enabled: !!userID,
    queryFn: async () => {
      const response = await instance.get<UserDetailsResponse>(`/auth/user/${userID}`);
      return response.data;
    }
  });
};
