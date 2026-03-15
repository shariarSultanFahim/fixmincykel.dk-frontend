"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { BikeType } from "@/types/job-create";

import { api as instance } from "@/lib/api";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UserProfileApiUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
}

export interface UserBikeApiItem {
  id: string;
  ownerId: string;
  name: string;
  type: BikeType;
  brand: string;
  model: string;
  year: number;
  color: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpdateMyProfileData {
  name: string;
  address: string;
}

interface UpdateMyProfileInput {
  userId: string;
  data: UpdateMyProfileData;
  image?: File | null;
}

export interface CreateBikeInput {
  name: string;
  type: BikeType;
  brand: string;
  model: string;
  year: number;
  color: string;
  isPrimary: boolean;
  ownerId?: string;
}

interface UpdateBikeInput {
  bikeId: string;
  data: CreateBikeInput;
}

const toUserUpdateFormData = (payload: UpdateMyProfileInput) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
};

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["user-profile", "me"],
    queryFn: async () => {
      const response = await instance.get<ApiResponse<UserProfileApiUser>>("/auth/user/me");
      return response.data;
    }
  });
};

export const useGetMyBikes = () => {
  return useQuery({
    queryKey: ["user-profile", "bikes"],
    queryFn: async () => {
      const response = await instance.get<ApiResponse<UserBikeApiItem[]>>("/bike/user/me");
      return response.data;
    }
  });
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateMyProfileInput) => {
      const response = await instance.patch<ApiResponse<UserProfileApiUser>>(
        `/auth/user/${payload.userId}`,
        toUserUpdateFormData(payload),
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-profile", "me"] });
    }
  });
};

export const useCreateBike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBikeInput) => {
      const response = await instance.post<ApiResponse<UserBikeApiItem>>("/bike", payload);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-profile", "bikes"] });
      await queryClient.invalidateQueries({ queryKey: ["user-profile", "me"] });
    }
  });
};

export const useUpdateBike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bikeId, data }: UpdateBikeInput) => {
      const response = await instance.patch<ApiResponse<UserBikeApiItem>>(`/bike/${bikeId}`, data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-profile", "bikes"] });
    }
  });
};
