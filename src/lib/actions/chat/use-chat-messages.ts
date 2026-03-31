import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { get } from "@/lib/api";

import { ApiResponse, ChatMessage, ChatMessageEntity, ChatMessagesPage } from "@/types";

const CHAT_MESSAGES_PAGE_SIZE = 20;

export const chatMessagesQueryKey = (roomId: string) => ["chat-messages", roomId] as const;

export const toChatMessage = (
  entity: ChatMessageEntity,
  status: ChatMessage["status"] = "sent"
): ChatMessage => {
  return {
    id: entity.id,
    roomId: entity.roomId,
    senderId: entity.senderId,
    text: entity.content ?? "",
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    clientId: entity.clientId ?? entity.id,
    status
  };
};

export const createMessagesInfiniteData = (
  initialMessage: ChatMessage
): InfiniteData<ChatMessagesPage> => {
  return {
    pages: [
      {
        messages: [initialMessage],
        nextCursor: null
      }
    ],
    pageParams: [null]
  };
};

export const prependToFirstPage = (
  cache: InfiniteData<ChatMessagesPage>,
  message: ChatMessage
): InfiniteData<ChatMessagesPage> => {
  const firstPage = cache.pages[0];

  if (!firstPage) {
    return createMessagesInfiniteData(message);
  }

  return {
    ...cache,
    pages: [
      {
        ...firstPage,
        messages: [message, ...firstPage.messages]
      },
      ...cache.pages.slice(1)
    ]
  };
};

export const updateByClientId = (
  cache: InfiniteData<ChatMessagesPage>,
  clientId: string,
  updater: (message: ChatMessage) => ChatMessage
): InfiniteData<ChatMessagesPage> => {
  return {
    ...cache,
    pages: cache.pages.map((page) => ({
      ...page,
      messages: page.messages.map((message) => {
        if (message.clientId !== clientId) {
          return message;
        }

        return updater(message);
      })
    }))
  };
};

interface UseChatMessagesParams {
  roomId: string;
  pageSize?: number;
}

export function useChatMessages({
  roomId,
  pageSize = CHAT_MESSAGES_PAGE_SIZE
}: UseChatMessagesParams) {
  return useInfiniteQuery({
    queryKey: chatMessagesQueryKey(roomId),
    enabled: Boolean(roomId),
    initialPageParam: null as string | null,
    queryFn: async ({ pageParam, signal }) => {
      const response = await get<ApiResponse<ChatMessageEntity[]>>(`/chat/${roomId}/messages`, {
        signal,
        params: {
          cursor: pageParam ?? undefined,
          limit: pageSize
        }
      });

      const messages = response.data.map((item) => toChatMessage(item));
      const nextCursorFromMeta = response.meta?.nextCursor ?? null;
      const derivedNextCursor = messages.length >= pageSize ? (messages.at(-1)?.id ?? null) : null;

      return {
        messages,
        nextCursor: nextCursorFromMeta ?? derivedNextCursor
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
  });
}
