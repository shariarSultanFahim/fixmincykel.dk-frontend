"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";

import { useGetMyProfile } from "@/lib/actions/users/profile.user";
import { getSocketClient } from "@/lib/socket";

import {
  chatRoomsQueryKey,
  useChatNotificationRooms,
  useChatRooms,
  useIsMobile,
  useMarkChatNotificationAsRead
} from "@/hooks";

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
  const searchParams = useSearchParams();
  const appliedRouteSelectionRef = useRef("");

  const isMobile = useIsMobile();

  const { data: profileData } = useGetMyProfile();
  const currentUserId = profileData?.data?.id ?? "";

  const { data: roomsResponse, isLoading: isRoomsLoading } = useChatRooms();
  const rooms = roomsResponse?.data ?? [];
  const roomIds = rooms.map((room) => room.id);
  const queryClient = useQueryClient();
  const markNotificationAsReadMutation = useMarkChatNotificationAsRead();
  const { data: notificationsByRoom } = useChatNotificationRooms(roomIds);

  const socket = useMemo(() => getSocketClient(), []);

  const activeRoomId = selectedConversationId || rooms[0]?.id || "";

  const roomsWithUnread = useMemo(() => {
    if (!notificationsByRoom) {
      return rooms;
    }

    return rooms.map((room) => {
      const notifications = notificationsByRoom[room.id] ?? [];
      const unreadCount = notifications.filter((notification) => !notification.isRead).length;
      const latestNotification = notifications.reduce((latest, current) => {
        if (!latest) {
          return current;
        }

        return new Date(current.createdAt).getTime() > new Date(latest.createdAt).getTime()
          ? current
          : latest;
      }, notifications[0]);

      const fallbackLastMessage =
        room.lastMessage ??
        (latestNotification
          ? {
              id: latestNotification.messageId,
              roomId: room.id,
              senderId: latestNotification.triggeredById,
              content: latestNotification.body,
              createdAt: latestNotification.createdAt,
              updatedAt: latestNotification.updatedAt,
              isRead: latestNotification.isRead,
              type: "TEXT"
            }
          : null);

      return {
        ...room,
        unreadCount,
        lastMessage: fallbackLastMessage,
        lastMessageAt: room.lastMessageAt ?? latestNotification?.createdAt ?? null
      };
    });
  }, [notificationsByRoom, rooms]);

  const selectedRoom = roomsWithUnread.find((room) => room.id === activeRoomId);

  useEffect(() => {
    const routeRoomId = searchParams.get("roomId");
    const routeBookingId = searchParams.get("bookingId");
    const routeSelectionKey = `${routeRoomId ?? ""}|${routeBookingId ?? ""}`;

    if (!routeRoomId && !routeBookingId) {
      return;
    }

    if (!roomsWithUnread.length || appliedRouteSelectionRef.current === routeSelectionKey) {
      return;
    }

    const targetRoom = routeRoomId
      ? roomsWithUnread.find((room) => room.id === routeRoomId)
      : roomsWithUnread.find((room) => room.bookingId === routeBookingId);

    if (!targetRoom) {
      return;
    }

    setSelectedConversationId(targetRoom.id);
    appliedRouteSelectionRef.current = routeSelectionKey;
  }, [roomsWithUnread, searchParams]);

  useEffect(() => {
    if (!activeRoomId || !notificationsByRoom?.[activeRoomId]?.length) {
      return;
    }

    const unreadNotifications = notificationsByRoom[activeRoomId].filter(
      (notification) => !notification.isRead
    );

    if (!unreadNotifications.length) {
      return;
    }

    let isMounted = true;

    const markAsRead = async () => {
      await Promise.all(
        unreadNotifications.map((notification) =>
          markNotificationAsReadMutation.mutateAsync(notification.id)
        )
      );

      if (!isMounted) {
        return;
      }

      await queryClient.invalidateQueries({ queryKey: chatRoomsQueryKey });
      await queryClient.invalidateQueries({ queryKey: ["chat-notifications", "rooms"] });
    };

    void markAsRead();

    return () => {
      isMounted = false;
    };
  }, [activeRoomId, notificationsByRoom, markNotificationAsReadMutation, queryClient]);

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
            conversations={roomsWithUnread}
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
              conversations={roomsWithUnread}
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
