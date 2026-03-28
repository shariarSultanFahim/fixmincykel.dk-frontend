"use client";

import { Suspense, useEffect, useMemo, useState } from "react";

import { useGetMyWorkshopProfile } from "@/lib/actions/workshops/profile.workshop";
import { getSocketClient } from "@/lib/socket";

import { useChatRooms } from "@/hooks";

import {
  ChatWindow,
  ChatWindowSkeleton,
  ConversationListSkeleton,
  ConversationsList,
  MobileAvatarsList,
  MobileSearch
} from "./components";

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const { data: profileData } = useGetMyWorkshopProfile();
  const currentUserId = profileData?.data?.id ?? "";

  const { data: roomsResponse } = useChatRooms();
  const rooms = roomsResponse?.data ?? [];

  const socket = useMemo(() => getSocketClient(), []);

  const activeRoomId = selectedConversationId || rooms[0]?.id || "";

  const selectedConversation = rooms.find((room) => room.id === activeRoomId);

  useEffect(() => {
    if (!socket || !activeRoomId) {
      console.log("[WorkshopMessagesPage] Skip join_room: socket or activeRoomId missing", {
        hasSocket: !!socket,
        activeRoomId
      });
      return;
    }

    console.log("[WorkshopMessagesPage] Joining room", {
      activeRoomId,
      socketConnected: socket.connected
    });

    socket.emit("join_room", { roomId: activeRoomId }, (acknowledgment: unknown) => {
      console.log("[WorkshopMessagesPage] join_room acknowledged", {
        activeRoomId,
        acknowledgment
      });
    });

    return () => {
      if (socket && activeRoomId) {
        console.log("[WorkshopMessagesPage] Leaving room", { activeRoomId });
        socket.emit("leave_room", { roomId: activeRoomId });
      }
    };
  }, [socket, activeRoomId]);

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden h-[calc(100vh-120px)] flex-col gap-6 p-6 md:flex">
        <div>
          <h1 className="text-2xl font-bold text-navy">Messages</h1>
        </div>

        <div className="flex min-h-0 flex-1 gap-6">
          {/* Desktop Conversations List */}
          <div className="shrink-0 md:w-80 lg:w-96">
            <Suspense fallback={<ConversationListSkeleton />}>
              <ConversationsList
                conversations={rooms}
                selectedId={selectedConversationId}
                onSelect={setSelectedConversationId}
              />
            </Suspense>
          </div>

          {/* Desktop Chat Window */}
          <div className="min-w-0 flex-1">
            {selectedConversation ? (
              <Suspense fallback={<ChatWindowSkeleton />}>
                <ChatWindow
                  room={selectedConversation}
                  currentUserId={currentUserId}
                  socket={socket}
                />
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
            conversations={rooms}
            selectedId={selectedConversationId}
            onSelect={setSelectedConversationId}
            searchQuery={mobileSearchQuery}
          />
        </div>

        {/* Mobile Chat Window - Takes remaining space */}
        <div className="min-h-0 flex-1">
          {selectedConversation ? (
            <Suspense fallback={<ChatWindowSkeleton />}>
              <ChatWindow
                room={selectedConversation}
                currentUserId={currentUserId}
                socket={socket}
              />
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
