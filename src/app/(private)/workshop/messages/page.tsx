"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";

import {
  useChatNotificationRooms,
  useChatRooms,
  useMarkChatNotificationAsRead
} from "@/lib/actions/chat";
import { useGetMyWorkshopProfile } from "@/lib/actions/workshops/profile.workshop";
import { getSocketClient } from "@/lib/socket";

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
  const pendingReadNotificationIdsRef = useRef(new Set<string>());

  const { data: profileData } = useGetMyWorkshopProfile();
  const currentUserId = profileData?.data?.id ?? "";

  const { data: roomsResponse } = useChatRooms();
  const rooms = useMemo(() => roomsResponse?.data ?? [], [roomsResponse?.data]);
  const roomIds = rooms.map((room) => room.id);
  const queryClient = useQueryClient();
  const markNotificationAsReadMutation = useMarkChatNotificationAsRead();
  const { data: notificationsByRoom } = useChatNotificationRooms(roomIds);

  const socket = useMemo(() => getSocketClient(), []);

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

  const routeSelectedConversationId = useMemo(() => {
    const routeRoomId = searchParams.get("roomId");
    const routeBookingId = searchParams.get("bookingId");

    if (!routeRoomId && !routeBookingId) {
      return "";
    }

    const targetRoom = routeRoomId
      ? roomsWithUnread.find((room) => room.id === routeRoomId)
      : roomsWithUnread.find((room) => room.bookingId === routeBookingId);

    return targetRoom?.id ?? "";
  }, [roomsWithUnread, searchParams]);

  const activeRoomId = selectedConversationId || routeSelectedConversationId || rooms[0]?.id || "";
  const selectedConversation = roomsWithUnread.find((room) => room.id === activeRoomId);

  useEffect(() => {
    if (!activeRoomId || !notificationsByRoom?.[activeRoomId]?.length) {
      return;
    }

    const unreadNotifications = notificationsByRoom[activeRoomId].filter(
      (notification) => !notification.isRead
    );
    const unreadNotificationIds = unreadNotifications.map((notification) => notification.id);
    const unreadNotificationIdSet = new Set(unreadNotificationIds);

    for (const trackedNotificationId of pendingReadNotificationIdsRef.current) {
      if (!unreadNotificationIdSet.has(trackedNotificationId)) {
        pendingReadNotificationIdsRef.current.delete(trackedNotificationId);
      }
    }

    const unreadNotificationIdsToMark = unreadNotificationIds.filter(
      (notificationId) => !pendingReadNotificationIdsRef.current.has(notificationId)
    );

    if (!unreadNotificationIdsToMark.length) {
      return;
    }

    unreadNotificationIdsToMark.forEach((notificationId) =>
      pendingReadNotificationIdsRef.current.add(notificationId)
    );

    let isMounted = true;

    const markAsRead = async () => {
      try {
        await Promise.all(
          unreadNotificationIdsToMark.map((notificationId) =>
            markNotificationAsReadMutation.mutateAsync(notificationId)
          )
        );
      } catch {
        unreadNotificationIdsToMark.forEach((notificationId) =>
          pendingReadNotificationIdsRef.current.delete(notificationId)
        );

        return;
      }

      if (!isMounted) {
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["chat-notifications", "rooms"] });
    };

    void markAsRead();

    return () => {
      isMounted = false;
    };
  }, [activeRoomId, notificationsByRoom, markNotificationAsReadMutation, queryClient]);

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
                conversations={roomsWithUnread}
                selectedId={activeRoomId}
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
            conversations={roomsWithUnread}
            selectedId={activeRoomId}
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
