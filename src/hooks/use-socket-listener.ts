import { useEffect } from "react";

import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";

import { ApiResponse, ChatMessageEntity, ChatMessagesPage } from "@/types";

import {
  chatMessagesQueryKey,
  createMessagesInfiniteData,
  prependToFirstPage,
  toChatMessage,
  updateByClientId
} from "./use-chat-messages";

interface UseSocketListenerParams {
  roomId: string;
  socket: Socket | null;
  eventName?: string;
}

type ReceiveMessagePayload = ApiResponse<ChatMessageEntity> | ChatMessageEntity;

const getIncomingMessageEntity = (payload: ReceiveMessagePayload): ChatMessageEntity => {
  if ("data" in payload) {
    return payload.data;
  }

  return payload;
};

export function useSocketListener({
  roomId,
  socket,
  eventName = "receive_message"
}: UseSocketListenerParams) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !roomId) {
      return;
    }

    const onReceiveMessage = (payload: ReceiveMessagePayload) => {
      console.log("[SocketListener] Received message payload", { payload });

      const incomingEntity = getIncomingMessageEntity(payload);
      console.log("[SocketListener] Extracted entity", { entity: incomingEntity });

      const incomingMessage = toChatMessage(incomingEntity, "sent");
      console.log("[SocketListener] Converted to ChatMessage", { message: incomingMessage });

      if (incomingMessage.roomId !== roomId) {
        console.log("[SocketListener] Room mismatch, ignoring", {
          incomingRoomId: incomingMessage.roomId,
          expectedRoomId: roomId
        });
        return;
      }

      const queryKey = chatMessagesQueryKey(roomId);

      queryClient.setQueryData<InfiniteData<ChatMessagesPage>>(queryKey, (existing) => {
        console.log("[SocketListener] Current cache state", { existing });

        if (!existing) {
          console.log("[SocketListener] No existing cache, creating new");
          return createMessagesInfiniteData(incomingMessage);
        }

        const allMessages = existing.pages.flatMap((page) => page.messages);
        console.log("[SocketListener] All messages in cache", {
          count: allMessages.length,
          messages: allMessages.map((m) => ({ id: m.id, senderId: m.senderId, text: m.text }))
        });

        // Try to find matching optimistic message by senderId + text + roomId
        const matchedMessage = allMessages.find(
          (message) =>
            message.id.startsWith("optimistic-") &&
            message.senderId === incomingMessage.senderId &&
            message.text === incomingMessage.text &&
            message.roomId === incomingMessage.roomId
        );

        const alreadyExists = !!matchedMessage;

        console.log("[SocketListener] Message exists in cache?", {
          incomingMessage: {
            senderId: incomingMessage.senderId,
            text: incomingMessage.text,
            roomId: incomingMessage.roomId
          },
          alreadyExists,
          matchedMessage: matchedMessage
            ? {
                id: matchedMessage.id,
                senderId: matchedMessage.senderId,
                text: matchedMessage.text,
                status: matchedMessage.status
              }
            : null
        });

        if (alreadyExists && matchedMessage) {
          console.log("[SocketListener] Updating existing message", {
            optimisticId: matchedMessage.id,
            incomingMessageId: incomingMessage.id
          });

          // Update by the matched message's clientId (which is what's in the cache)
          return updateByClientId(existing, matchedMessage.clientId, (message) => {
            const updated = {
              ...message,
              ...incomingMessage,
              // Use the real backend ID now
              id: incomingMessage.id,
              status: "sent" as const
            };
            console.log("[SocketListener] Updated message", { from: message, to: updated });
            return updated;
          });
        }

        console.log("[SocketListener] Message not found, prepending as new");
        return prependToFirstPage(existing, incomingMessage);
      });
    };

    socket.on(eventName, onReceiveMessage);

    return () => {
      socket.off(eventName, onReceiveMessage);
    };
  }, [eventName, queryClient, roomId, socket]);
}
