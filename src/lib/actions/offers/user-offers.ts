"use client";

import { useQuery } from "@tanstack/react-query";

import type { JobOffer } from "@/types/jobs-manage";

import { api as instance } from "@/lib/api";

interface UserOffersResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: JobOffer[];
  };
}

export const useGetUserOffers = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["user-offers", page, limit],
    queryFn: async () => {
      const response = await instance.get<UserOffersResponse>("/offers/my-offers/user", {
        params: { page, limit }
      });
      return response.data?.data?.data ?? [];
    }
  });
};
