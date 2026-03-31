import { useQuery } from "@tanstack/react-query";

import { get } from "@/lib/api";

import { ApiResponse, ChatRoom } from "@/types";

export const chatRoomsQueryKey = ["chat-rooms", "my"] as const;

export const chatRoomDetailsQueryKey = (roomId: string) => ["chat-room", roomId] as const;

export function useChatRooms() {
  return useQuery({
    queryKey: chatRoomsQueryKey,
    queryFn: ({ signal }) => get<ApiResponse<ChatRoom[]>>("/chat/my-rooms", { signal })
  });
}

export function useChatRoomDetails(roomId: string) {
  return useQuery({
    queryKey: chatRoomDetailsQueryKey(roomId),
    enabled: Boolean(roomId),
    queryFn: ({ signal }) => get<ApiResponse<ChatRoom>>(`/chat/${roomId}`, { signal })
  });
}
