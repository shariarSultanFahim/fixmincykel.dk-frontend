"use client";

import { useEffect, useMemo, useState } from "react";

import { useGetMyProfile } from "@/lib/actions/users/profile.user";
import { getSocketClient } from "@/lib/socket";

import { useChatRooms, useIsMobile } from "@/hooks";

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

  const isMobile = useIsMobile();

  const { data: profileData } = useGetMyProfile();
  const currentUserId = profileData?.data?.id ?? "";

  const { data: roomsResponse, isLoading: isRoomsLoading } = useChatRooms();
  const rooms = roomsResponse?.data ?? [];

  const socket = useMemo(() => getSocketClient(), []);

  const activeRoomId = selectedConversationId || rooms[0]?.id || "";

  const selectedRoom = rooms.find((room) => room.id === activeRoomId);

  useEffect(() => {
    if (!socket || !activeRoomId) {
      console.log("[MessagesPage] Skip join_room: socket or activeRoomId missing", {
        hasSocket: !!socket,
        activeRoomId
      });
      return;
    }

    console.log("[MessagesPage] Joining room", { activeRoomId, socketConnected: socket.connected });

    socket.emit("join_room", { roomId: activeRoomId }, (acknowledgment: any) => {
      console.log("[MessagesPage] join_room acknowledged", { activeRoomId, acknowledgment });
    });

    return () => {
      console.log("[MessagesPage] Leaving room", { activeRoomId });
      socket.emit("leave_room", { roomId: activeRoomId });
    };
  }, [activeRoomId, socket]);

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col gap-3 rounded-lg bg-white">
        <div className="bg-white p-4">
          <h1 className="mb-3 text-2xl font-bold text-navy">Messages</h1>
          <MobileSearch searchQuery={mobileSearchQuery} onSearchChange={setMobileSearchQuery} />
        </div>

        <div className="shrink-0 rounded-lg bg-white px-4 py-2 shadow-lg">
          <MobileAvatarsList
            conversations={rooms}
            selectedId={activeRoomId}
            onSelect={setSelectedConversationId}
            searchQuery={mobileSearchQuery}
          />
        </div>

        <div className="min-h-0 flex-1">
          {selectedRoom && currentUserId ? (
            <ChatWindow room={selectedRoom} currentUserId={currentUserId} socket={socket} />
          ) : isRoomsLoading ? (
            <ChatWindowSkeleton />
          ) : (
            <div className="flex h-full items-center justify-center bg-white">
              <p className="text-gray-500">Select a conversation to start</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex-col gap-6 md:flex">
      <div>
        <h1 className="text-3xl font-bold text-navy">Messages</h1>
      </div>

      <div className="flex min-h-0 flex-1 gap-6">
        <div className="shrink-0 md:w-80 lg:w-96">
          {isRoomsLoading ? (
            <ConversationListSkeleton />
          ) : (
            <ConversationsList
              conversations={rooms}
              selectedId={activeRoomId}
              onSelect={setSelectedConversationId}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          {selectedRoom && currentUserId ? (
            <ChatWindow room={selectedRoom} currentUserId={currentUserId} socket={socket} />
          ) : isRoomsLoading ? (
            <ChatWindowSkeleton />
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border-0 bg-white shadow-md">
              <p className="text-gray-500">Select a conversation to start</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
