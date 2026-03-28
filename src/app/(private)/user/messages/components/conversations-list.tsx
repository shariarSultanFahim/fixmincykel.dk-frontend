"use client";

import { useState } from "react";

import { MessageCircle, Search, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChatRoom } from "@/types";

interface ConversationsListProps {
  conversations: ChatRoom[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const formatConversationTime = (value: string | null) => {
  if (!value) {
    return "No messages yet";
  }

  return new Date(value).toLocaleString([], {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export function ConversationsList({ conversations, selectedId, onSelect }: ConversationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conversation) => {
    const searchLower = searchQuery.toLowerCase();
    const workshopName = conversation.workshop.workshopName.toLowerCase();
    const bookingId = conversation.bookingId.toLowerCase();
    const lastMessage = (conversation.lastMessage?.content ?? "").toLowerCase();

    return (
      workshopName.includes(searchLower) ||
      bookingId.includes(searchLower) ||
      lastMessage.includes(searchLower)
    );
  });

  return (
    <Card className="flex h-full min-h-0 flex-col border-0 shadow-md">
      <CardHeader className="sticky top-0 z-10 bg-white">
        <CardTitle className="mb-3 text-lg md:text-base">Conversations</CardTitle>
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pr-9 pl-9 text-xs md:text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 overflow-y-auto p-0">
        <div className="divide-y">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={`w-full p-3 text-left transition-colors md:p-4 ${
                selectedId === conversation.id
                  ? "border-r-4 border-primary bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-2 md:gap-3">
                <div
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full md:mt-2 ${
                    conversation.unreadCount > 0 ? "bg-primary" : "bg-transparent"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-navy md:text-sm">
                    {conversation.workshop.workshopName}
                  </h3>
                  <p className="text-xs text-gray-700">Booking #{conversation.bookingId}</p>
                  <p className="truncate text-xs text-gray-600 md:text-sm">
                    {conversation.lastMessage?.content ?? "No messages yet"}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatConversationTime(conversation.lastMessageAt)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredConversations.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageCircle className="mb-3 h-12 w-12 text-gray-300" />
            <p className="text-sm text-gray-500">
              {searchQuery ? "No conversations match your search" : "No conversations yet"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
