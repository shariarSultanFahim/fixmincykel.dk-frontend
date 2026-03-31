import { useCallback } from "react";

import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";

import { useToast } from "@/hooks/use-toast";

import { ChatMessage, ChatMessagesPage, SendMessageInput } from "@/types";

import {
  chatMessagesQueryKey,
  createMessagesInfiniteData,
  prependToFirstPage
} from "./use-chat-messages";

interface SendMessageContext {
  previousMessages?: InfiniteData<ChatMessagesPage>;
  roomId: string;
}

interface UseSendMessageParams {
  currentUserId: string;
  socket: Socket | null;
}

interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    roomId: string;
    senderId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    type: string;
  };
}

export function useSendMessage({ currentUserId, socket }: UseSendMessageParams) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<void, Error, SendMessageInput, SendMessageContext>({
    mutationFn: async ({ roomId, text }) => {
      if (!socket) {
        console.error("[Chat] Socket unavailable when sending message", { roomId });
        throw new Error("Socket is not connected");
      }

      if (!socket.connected) {
        console.warn("[Chat] Socket not connected, attempting to ensure connection...", {
          connected: socket.connected
        });
        // Try to reconnect if disconnected
        if (socket.disconnected) {
          socket.connect();
        }
        throw new Error("Socket disconnected");
      }

      console.log("[Chat] Emitting send_message", { roomId, text });

      // Emit message to server
      const payload = {
        roomId,
        senderId: currentUserId,
        content: text,
        text,
        type: "TEXT"
      };

      console.log("[Chat] Socket emit payload", { payload });

      // Use socket callback to get immediate response from backend
      return new Promise<void>((resolve, reject) => {
        socket.emit("send_message", payload, (response: SendMessageResponse) => {
          console.log("[Chat] Received callback from backend", { response });

          if (!response.success) {
            console.error("[Chat] Backend error in callback", { response });
            reject(new Error(response.message || "Failed to send message"));
            return;
          }

          if (!response.data) {
            console.warn("[Chat] No message data in callback response");
            reject(new Error("Invalid response from backend"));
            return;
          }

          console.log("[Chat] Message created on backend", {
            messageId: response.data.id,
            roomId: response.data.roomId
          });

          // Update cache immediately with real message from backend
          const queryKey = chatMessagesQueryKey(roomId);
          queryClient.setQueryData<InfiniteData<ChatMessagesPage>>(queryKey, (existing) => {
            if (!existing) {
              // Create new cache with the real message
              const realMessage = {
                id: response.data.id,
                roomId: response.data.roomId,
                senderId: response.data.senderId,
                text: response.data.content ?? "",
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
                clientId: response.data.id,
                status: "sent" as const
              };
              return {
                pages: [
                  {
                    messages: [realMessage],
                    nextCursor: null
                  }
                ],
                pageParams: [null]
              };
            }

            // Find and replace the optimistic message with the real one
            return {
              ...existing,
              pages: existing.pages.map((page) => ({
                ...page,
                messages: page.messages.map((msg) => {
                  // Replace optimistic message with real one
                  if (
                    msg.id.startsWith("optimistic-") &&
                    msg.senderId === currentUserId &&
                    msg.text === text &&
                    msg.roomId === roomId
                  ) {
                    console.log("[Chat] Replacing optimistic message with real one", {
                      optimisticId: msg.id,
                      realId: response.data.id
                    });
                    return {
                      id: response.data.id,
                      roomId: response.data.roomId,
                      senderId: response.data.senderId,
                      text: response.data.content ?? "",
                      createdAt: response.data.createdAt,
                      updatedAt: response.data.updatedAt,
                      clientId: response.data.id,
                      status: "sent" as const
                    };
                  }
                  return msg;
                })
              }))
            };
          });

          console.log("[Chat] Cache updated with real message");
          resolve();
        });

        // Timeout in case backend never responds
        const timeout = setTimeout(() => {
          console.warn("[Chat] Callback timeout - no response from backend");
          reject(new Error("Message send timeout - no response from backend"));
        }, 10000);

        // Clear timeout if callback fires
        socket.once("disconnect", () => {
          clearTimeout(timeout);
        });
      });
    },
    onMutate: async (variables) => {
      const queryKey = chatMessagesQueryKey(variables.roomId);
      await queryClient.cancelQueries({ queryKey });

      const previousMessages = queryClient.getQueryData<InfiniteData<ChatMessagesPage>>(queryKey);
      const now = new Date().toISOString();
      const optimisticId = `optimistic-${Date.now()}-${Math.random()}`;

      const optimisticMessage: ChatMessage = {
        id: optimisticId,
        roomId: variables.roomId,
        senderId: currentUserId,
        text: variables.text,
        createdAt: now,
        updatedAt: now,
        clientId: optimisticId,
        status: "sending"
      };

      console.log("[SendMessage] Adding optimistic message", { optimisticMessage });

      queryClient.setQueryData<InfiniteData<ChatMessagesPage>>(queryKey, (existing) => {
        if (!existing) {
          return createMessagesInfiniteData(optimisticMessage);
        }

        return prependToFirstPage(existing, optimisticMessage);
      });

      return {
        previousMessages,
        roomId: variables.roomId
      };
    },
    onError: (error, _variables, context) => {
      console.error("[Chat] Message send failed", { error: error.message });

      if (!context) {
        return;
      }

      queryClient.setQueryData(chatMessagesQueryKey(context.roomId), context.previousMessages);

      // Show error toast to user
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: error.message
      });
    },
    onSuccess: (_data, variables) => {
      console.log("[SendMessage] Message sent successfully, waiting for socket update", {
        roomId: variables.roomId
      });
      // The socket listener will update the cache when the message arrives
      // We don't need to do anything here, just log for debugging
    }
  });

  const sendMessage = useCallback(
    (input: SendMessageInput) => {
      mutation.mutate(input);
    },
    [mutation]
  );

  const sendMessageAsync = useCallback(
    async (input: SendMessageInput) => {
      await mutation.mutateAsync(input);
    },
    [mutation]
  );

  return {
    ...mutation,
    sendMessage,
    sendMessageAsync
  };
}
