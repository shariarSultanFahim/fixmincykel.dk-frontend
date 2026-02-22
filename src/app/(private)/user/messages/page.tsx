"use client";

import { Suspense, useState } from "react";

import { UserConversation } from "@/types/conversation";

import {
  ChatWindow,
  ChatWindowSkeleton,
  ConversationListSkeleton,
  ConversationsList,
  MobileAvatarsList,
  MobileSearch
} from "./components";
import messagesData from "./data/messages.json";

export default function MessagesPage() {
  const conversations: UserConversation[] = messagesData as UserConversation[];
  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id || "");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const selectedConversation = conversations.find((conv) => conv.id === selectedConversationId);

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden h-[calc(100vh-120px)] flex-col gap-6 md:flex">
        <div>
          <h1 className="text-3xl font-bold text-navy">Messages</h1>
        </div>

        <div className="flex min-h-0 flex-1 gap-6">
          {/* Desktop Conversations List */}
          <div className="shrink-0 md:w-80 lg:w-96">
            <Suspense fallback={<ConversationListSkeleton />}>
              <ConversationsList
                conversations={conversations}
                selectedId={selectedConversationId}
                onSelect={setSelectedConversationId}
              />
            </Suspense>
          </div>

          {/* Desktop Chat Window */}
          <div className="min-w-0 flex-1">
            {selectedConversation ? (
              <Suspense fallback={<ChatWindowSkeleton />}>
                <ChatWindow conversation={selectedConversation} />
              </Suspense>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border-0 bg-white shadow-md">
                <p className="text-gray-500">Select a conversation to start</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Messenger Layout */}
      <div className="flex min-h-screen flex-col gap-3 rounded-lg bg-white md:hidden">
        {/* Mobile Header */}
        <div className="bg-white p-4">
          <h1 className="mb-3 text-2xl font-bold text-navy">Messages</h1>

          {/* Mobile Search Bar */}
          <MobileSearch searchQuery={mobileSearchQuery} onSearchChange={setMobileSearchQuery} />
        </div>

        {/* Mobile Avatar List */}
        <div className="shrink-0 rounded-lg bg-white px-4 py-2 shadow-lg">
          <MobileAvatarsList
            conversations={conversations}
            selectedId={selectedConversationId}
            onSelect={setSelectedConversationId}
            searchQuery={mobileSearchQuery}
          />
        </div>

        {/* Mobile Chat Window - Takes remaining space */}
        <div className="min-h-0 flex-1">
          {selectedConversation ? (
            <Suspense fallback={<ChatWindowSkeleton />}>
              <ChatWindow conversation={selectedConversation} />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center bg-white">
              <p className="text-gray-500">Select a conversation to start</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
