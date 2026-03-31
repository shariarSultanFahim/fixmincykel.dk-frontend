"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { get, patch } from "@/lib/api";

import { ApiResponse, Notification } from "@/types";

export const notificationsQueryKey = ["notifications", "workshop"] as const;

export const getNotificationsQueryKey = (workshopId?: string) =>
  [...notificationsQueryKey, workshopId ?? "unknown"] as const;

export const userNotificationsQueryKey = ["notifications", "user"] as const;

export const getUserNotificationsQueryKey = (userId?: string) =>
  [...userNotificationsQueryKey, userId ?? "unknown"] as const;

export function useNotifications(workshopId?: string) {
  return useQuery({
    queryKey: getNotificationsQueryKey(workshopId),
    enabled: Boolean(workshopId),
    queryFn: ({ signal }) =>
      get<ApiResponse<Notification[]>>(`/notification/workshop/${workshopId}`, {
        signal
      })
  });
}

export function useUserNotifications(userId?: string) {
  return useQuery({
    queryKey: getUserNotificationsQueryKey(userId),
    enabled: Boolean(userId),
    queryFn: ({ signal }) =>
      get<ApiResponse<Notification[]>>(`/notification/user/${userId}`, {
        signal
      })
  });
}

export function useMarkNotificationAsRead() {
  return useMutation({
    mutationFn: (notificationId: string) =>
      patch<ApiResponse<Notification>>(`/notification/${notificationId}/read`)
  });
}
