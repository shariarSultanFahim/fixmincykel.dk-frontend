"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Send, Wifi, WifiOff } from "lucide-react";
import type { Socket } from "socket.io-client";

import { useChatMessages, useSendMessage, useSocketListener } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChatRoom } from "@/types";

import { MessageBubble } from "./message-bubble";

interface ChatWindowProps {
  room: ChatRoom;
  currentUserId: string;
  socket: Socket | null;
}

const formatTime = (value: string) => {
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

export function ChatWindow({ room, currentUserId, socket }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(socket?.connected ?? false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const shouldScrollToLatestRef = useRef(true);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isMessagesLoading
  } = useChatMessages({ roomId: room.id });

  const { sendMessage, isPending: isSending } = useSendMessage({
    currentUserId,
    socket
  });

  useSocketListener({ roomId: room.id, socket });

  // Monitor socket connection status
  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleConnect = () => {
      console.log("[ChatWindow] Socket connected");
      setIsSocketConnected(true);
    };

    const handleDisconnect = () => {
      console.log("[ChatWindow] Socket disconnected");
      setIsSocketConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  const messages = useMemo(() => {
    const flatMessages = data?.pages.flatMap((page) => page.messages) ?? [];

    return [...flatMessages].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [data]);

  useEffect(() => {
    shouldScrollToLatestRef.current = true;
  }, [room.id]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || messages.length === 0) {
      return;
    }

    const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
    const isNearBottom = distanceFromBottom < 120;

    if (!shouldScrollToLatestRef.current && !isNearBottom) {
      return;
    }

    requestAnimationFrame(() => {
      const targetElement = scrollRef.current;

      if (!targetElement) {
        return;
      }

      targetElement.scrollTop = targetElement.scrollHeight;
      shouldScrollToLatestRef.current = false;
    });
  }, [messages.length]);

  const handleSendMessage = () => {
    const value = messageInput.trim();

    if (!value) {
      return;
    }

    sendMessage({
      roomId: room.id,
      text: value
    });

    setMessageInput("");
  };

  const handleScroll = async () => {
    const element = scrollRef.current;

    if (!element || !hasNextPage || isFetchingNextPage) {
      return;
    }

    if (element.scrollTop <= 80) {
      await fetchNextPage();
    }
  };

  return (
    <Card className="flex h-full min-h-0 w-full flex-col rounded-lg border-0 shadow-md md:min-w-0">
      <CardHeader className="sticky top-0 z-10 bg-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg md:text-lg">{room.workshop.workshopName}</CardTitle>
            <p className="text-xs text-gray-600 md:text-sm">Booking #{room.bookingId}</p>
          </div>
          <div className="flex items-center gap-2">
            {isSocketConnected ? (
              <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                <Wifi className="h-3 w-3" />
                <span>Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                <WifiOff className="h-3 w-3" />
                <span>Disconnected</span>
              </div>
            )}
          </div>
        </div>

        {!isSocketConnected && (
          <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
            <WifiOff className="h-4 w-4 shrink-0" />
            <span>Connection lost. Messages may not send. Reconnecting...</span>
          </div>
        )}
      </CardHeader>

      <CardContent
        ref={scrollRef}
        onScroll={handleScroll}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-linear-to-b from-white to-gray-50 p-4 md:p-6"
      >
        {isFetchingNextPage && (
          <p className="text-center text-xs text-gray-500">Loading older messages...</p>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            sender={message.senderId === currentUserId ? "user" : "customer"}
            text={message.text}
            timestamp={formatTime(message.createdAt)}
            status={message.status}
          />
        ))}

        {!isMessagesLoading && messages.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            Start the conversation by sending a message.
          </p>
        )}
      </CardContent>

      <div className="bg-white px-4 py-3">
        <div className="flex gap-2">
          <Input
            placeholder={isSocketConnected ? "Type your message..." : "Connecting..."}
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={!isSocketConnected}
            className="flex-1 text-sm shadow-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || isSending || !isSocketConnected}
            className="gap-2 px-3 md:px-4"
            size="sm"
            title={
              !isSocketConnected
                ? "Waiting for connection..."
                : isSending
                  ? "Sending..."
                  : "Send message"
            }
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
