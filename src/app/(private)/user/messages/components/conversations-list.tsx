"use client";

import { useState } from "react";

import { MessageCircle, Search, X } from "lucide-react";

import { Conversation } from "@/types/conversation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ConversationsListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ConversationsList({ conversations, selectedId, onSelect }: ConversationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      conv.workshopName.toLowerCase().includes(searchLower) ||
      conv.jobId.toLowerCase().includes(searchLower) ||
      conv.lastMessage.toLowerCase().includes(searchLower)
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full p-3 text-left transition-colors md:p-4 ${
                selectedId === conv.id ? "border-r-4 border-primary bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-2 md:gap-3">
                <div
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full md:mt-2 ${
                    conv.isUnread ? "bg-primary" : "bg-transparent"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-navy md:text-sm">
                    {conv.workshopName}
                  </h3>
                  <p className="text-xs text-gray-700">{conv.jobId}</p>
                  <p className="truncate text-xs text-gray-600 md:text-sm">{conv.lastMessage}</p>
                  <p className="mt-1 text-xs text-gray-500">{conv.lastMessageTime}</p>
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
