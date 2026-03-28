import { useMutation, useQuery } from "@tanstack/react-query";

import { get, patch } from "@/lib/api";

import { ApiResponse, ChatNotification } from "@/types";

export const chatRoomNotificationsQueryKey = (roomId: string) =>
  ["chat-notifications", "room", roomId] as const;

export const chatNotificationRoomsQueryKey = (roomIds: string[]) =>
  ["chat-notifications", "rooms", ...roomIds] as const;

export function useChatRoomNotifications(roomId: string) {
  return useQuery({
    queryKey: chatRoomNotificationsQueryKey(roomId),
    enabled: Boolean(roomId),
    queryFn: ({ signal }) =>
      get<ApiResponse<ChatNotification[]>>(`/chat-notification/room/${roomId}`, { signal })
  });
}

export function useChatNotificationRooms(roomIds: string[]) {
  return useQuery({
    queryKey: chatNotificationRoomsQueryKey(roomIds),
    enabled: roomIds.length > 0,
    queryFn: async ({ signal }) => {
      const entries = await Promise.all(
        roomIds.map(async (roomId) => {
          const response = await get<ApiResponse<ChatNotification[]>>(
            `/chat-notification/room/${roomId}`,
            {
              signal
            }
          );

          return [roomId, response.data] as const;
        })
      );

      return Object.fromEntries(entries) as Record<string, ChatNotification[]>;
    }
  });
}

export function useMarkChatNotificationAsRead() {
  return useMutation({
    mutationFn: (notificationId: string) =>
      patch<ApiResponse<ChatNotification>>(`/chat-notification/${notificationId}/read`)
  });
}
