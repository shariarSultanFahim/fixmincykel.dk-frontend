"use client";

import { useEffect, type ReactNode } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useChatRooms } from "@/lib/actions/chat";
import { chatMessagesQueryKey } from "@/lib/actions/chat/use-chat-messages";
import { chatRoomsQueryKey } from "@/lib/actions/chat/use-chat-rooms";
import { useGetMyProfile } from "@/lib/actions/users/profile.user";
import { useGetMyWorkshopProfile } from "@/lib/actions/workshops/profile.workshop";
import { getSocketClient } from "@/lib/socket";

import { ApiResponse, ChatMessageEntity } from "@/types";

type ReceiveMessagePayload = ApiResponse<ChatMessageEntity> | ChatMessageEntity;

interface ChatRealtimeProviderProps {
  children: ReactNode;
}

const getIncomingMessageEntity = (payload: ReceiveMessagePayload): ChatMessageEntity => {
  if ("data" in payload) {
    return payload.data;
  }

  return payload;
};

interface ChatRealtimeBridgeProps extends ChatRealtimeProviderProps {
  actorId?: string;
}

function ChatRealtimeBridge({ children, actorId }: ChatRealtimeBridgeProps) {
  const queryClient = useQueryClient();
  const socket = getSocketClient();
  const { data: roomsResponse } = useChatRooms();
  const rooms = roomsResponse?.data ?? [];

  useEffect(() => {
    if (!socket) {
      return;
    }

    const onConnect = () => {
      if (actorId) {
        socket.emit("register", actorId);
      }

      for (const room of rooms) {
        socket.emit("join_room", room.id);
      }
    };

    const onReceiveMessage = (payload: ReceiveMessagePayload) => {
      const incomingEntity = getIncomingMessageEntity(payload);
      const roomId = incomingEntity.roomId;

      if (!roomId) {
        return;
      }

      void queryClient.invalidateQueries({ queryKey: chatMessagesQueryKey(roomId) });
      void queryClient.refetchQueries({ queryKey: chatMessagesQueryKey(roomId), type: "active" });
      void queryClient.invalidateQueries({ queryKey: chatRoomsQueryKey });
      void queryClient.refetchQueries({ queryKey: chatRoomsQueryKey, type: "active" });
    };

    socket.on("connect", onConnect);
    socket.on("receive_message", onReceiveMessage);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("receive_message", onReceiveMessage);
      for (const room of rooms) {
        socket.emit("leave_room", room.id);
      }
    };
  }, [socket, queryClient, actorId, rooms]);

  return <>{children}</>;
}

export function UserChatRealtimeProvider({ children }: ChatRealtimeProviderProps) {
  const { data: profileData } = useGetMyProfile();

  return <ChatRealtimeBridge actorId={profileData?.data?.id}>{children}</ChatRealtimeBridge>;
}

export function WorkshopChatRealtimeProvider({ children }: ChatRealtimeProviderProps) {
  const { data: profileData } = useGetMyWorkshopProfile();

  return <ChatRealtimeBridge actorId={profileData?.data?.id}>{children}</ChatRealtimeBridge>;
}
