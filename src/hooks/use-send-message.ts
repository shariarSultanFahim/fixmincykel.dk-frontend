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

      socket.emit("send_message", payload);

      console.log("[Chat] Message emitted to server", { roomId });

      // Resolve immediately after emit - let the socket listener handle cache updates
      // The mutation completes quickly, and the socket listener will update the UI
      // when the receive_message event comes back
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
