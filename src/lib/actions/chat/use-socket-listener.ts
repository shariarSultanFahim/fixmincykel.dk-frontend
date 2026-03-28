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
        console.log("[SocketListener] Current cache state before update", {
          existing: existing
            ? {
                pages: existing.pages.length,
                totalMessages: existing.pages.reduce((sum, p) => sum + p.messages.length, 0)
              }
            : null
        });

        if (!existing) {
          console.log("[SocketListener] No existing cache, creating new");
          return createMessagesInfiniteData(incomingMessage);
        }

        const allMessages = existing.pages.flatMap((page) => page.messages);
        console.log("[SocketListener] All messages in cache", {
          count: allMessages.length,
          messages: allMessages.map((m) => ({
            id: m.id,
            senderId: m.senderId,
            text: m.text.substring(0, 20)
          }))
        });

        // CHECK 1: Is this message already in cache with real ID?
        // This indicates the callback already processed it
        const alreadyRealMessage = allMessages.find((m) => m.id === incomingMessage.id);
        if (alreadyRealMessage) {
          console.log("[SocketListener] ✓ Message already updated by callback", {
            messageId: incomingMessage.id,
            status: alreadyRealMessage.status
          });
          return existing; // No changes needed
        }

        // Try to find matching optimistic message by senderId + text + roomId
        // First try exact match
        let matchedMessage = allMessages.find(
          (message) =>
            message.id.startsWith("optimistic-") &&
            message.senderId === incomingMessage.senderId &&
            message.text === incomingMessage.text &&
            message.roomId === incomingMessage.roomId
        );

        // If no exact match, try by senderId + roomId (most recent optimistic)
        // This handles cases where text might be slightly different due to trimming
        if (!matchedMessage) {
          console.log("[SocketListener] No exact match for text, trying senderId + roomId match");
          const optimisticMessages = allMessages.filter(
            (m) =>
              m.id.startsWith("optimistic-") &&
              m.senderId === incomingMessage.senderId &&
              m.roomId === incomingMessage.roomId
          );

          if (optimisticMessages.length > 0) {
            // Get the most recent optimistic message
            matchedMessage = optimisticMessages.reduce((latest, current) =>
              new Date(latest.createdAt).getTime() > new Date(current.createdAt).getTime()
                ? latest
                : current
            );

            console.log("[SocketListener] Found optimistic message by senderId/roomId proximity", {
              optimisticId: matchedMessage.id,
              incomingText: incomingMessage.text.substring(0, 30),
              optimisticText: matchedMessage.text.substring(0, 30)
            });
          }
        }

        const alreadyExists = !!matchedMessage;

        console.log("[SocketListener] Message match result", {
          incomingMessage: {
            senderId: incomingMessage.senderId,
            text: incomingMessage.text.substring(0, 20),
            roomId: incomingMessage.roomId
          },
          alreadyExists,
          matchedMessage: matchedMessage
            ? {
                id: matchedMessage.id,
                clientId: matchedMessage.clientId,
                senderId: matchedMessage.senderId,
                text: matchedMessage.text.substring(0, 20),
                status: matchedMessage.status
              }
            : null
        });

        if (alreadyExists && matchedMessage) {
          console.log("[SocketListener] ✓ Updating existing message to sent", {
            optimisticId: matchedMessage.id,
            clientId: matchedMessage.clientId,
            incomingMessageId: incomingMessage.id
          });

          // Update by the matched message's clientId
          return updateByClientId(existing, matchedMessage.clientId, (message) => {
            const updated = {
              ...message,
              ...incomingMessage,
              // Use the real backend ID
              id: incomingMessage.id,
              status: "sent" as const
            };
            console.log("[SocketListener] Message updated", {
              beforeId: message.id,
              beforeStatus: message.status,
              afterId: updated.id,
              afterStatus: updated.status
            });
            return updated;
          });
        }

        console.log("[SocketListener] ✗ Message not found, prepending as new");
        return prependToFirstPage(existing, incomingMessage);
      });

      // Cache has been updated, socket listener complete
      console.log("[SocketListener] Message cache updated");
    };

    socket.on(eventName, onReceiveMessage);

    return () => {
      socket.off(eventName, onReceiveMessage);
    };
  }, [eventName, queryClient, roomId, socket]);
}
