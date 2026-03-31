"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCheck } from "lucide-react";

import { chatRoomsQueryKey } from "@/lib/actions/chat";
import {
  getNotificationsQueryKey,
  useMarkNotificationAsRead,
  useNotifications
} from "@/lib/actions/notifications";
import { useGetMyWorkshopProfile } from "@/lib/actions/workshops/profile.workshop";
import { timeAgo } from "@/lib/date";
import { getSocketClient } from "@/lib/socket";

import { Button } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiResponse, Notification } from "@/types";

const asNotificationArray = (value: unknown): Notification[] => {
  if (Array.isArray(value)) {
    return value as Notification[];
  }

  if (value && typeof value === "object") {
    if ("notifications" in value && Array.isArray(value.notifications)) {
      return value.notifications as Notification[];
    }

    if ("items" in value && Array.isArray(value.items)) {
      return value.items as Notification[];
    }
  }

  return [];
};

const getNotificationHref = (notification: Notification) => {
  if (notification.bookingId) {
    return `/workshop/messages?bookingId=${notification.bookingId}`;
  }

  if (notification.jobId || notification.eventType === "NEW_JOB_POSTED") {
    return `/workshop/job-inbox`;
  }

  if (notification.invoiceId) {
    return `/workshop/analytics`;
  }

  if (notification.eventType.includes("MESSAGE")) {
    return `/workshop/messages`;
  }

  return `/workshop`;
};

const isWorkshopJobNotification = (notification: Notification) =>
  Boolean(notification.jobId || notification.eventType === "NEW_JOB_POSTED");

const isOfferAcceptedNotification = (notification: Notification) =>
  notification.eventType === "OFFER_ACCEPTED";

const getIncomingNotification = (
  payload: ApiResponse<Notification> | Notification
): Notification | null => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }

  return payload;
};

const upsertNotification = (notifications: Notification[], incoming: Notification) => {
  const existingIndex = notifications.findIndex((notification) => notification.id === incoming.id);

  if (existingIndex === -1) {
    return [incoming, ...notifications];
  }

  return notifications.map((notification) =>
    notification.id === incoming.id ? { ...notification, ...incoming } : notification
  );
};

const mergeNotificationPayload = (payload: unknown, incoming: Notification): unknown => {
  if (Array.isArray(payload)) {
    return upsertNotification(payload as Notification[], incoming);
  }

  if (payload && typeof payload === "object") {
    if ("notifications" in payload && Array.isArray(payload.notifications)) {
      return {
        ...payload,
        notifications: upsertNotification(payload.notifications as Notification[], incoming)
      };
    }

    if ("items" in payload && Array.isArray(payload.items)) {
      return {
        ...payload,
        items: upsertNotification(payload.items as Notification[], incoming)
      };
    }
  }

  return [incoming];
};

export function WorkshopNotificationPopover() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const socket = useMemo(() => getSocketClient(), []);
  const { data: workshopProfileResponse } = useGetMyWorkshopProfile();
  const workshopId = workshopProfileResponse?.data?.id;
  const notificationsKey = useMemo(() => getNotificationsQueryKey(workshopId), [workshopId]);
  const { data: notificationsResponse } = useNotifications(workshopId);
  const markNotificationAsRead = useMarkNotificationAsRead();
  const notifications = useMemo(
    () => asNotificationArray(notificationsResponse?.data),
    [notificationsResponse?.data]
  );

  const sortedNotifications = useMemo(
    () =>
      [...notifications].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [notifications]
  );

  const unreadNotifications = useMemo(
    () => sortedNotifications.filter((notification) => !notification.isRead),
    [sortedNotifications]
  );

  const recentReadNotifications = useMemo(
    () => sortedNotifications.filter((notification) => notification.isRead).slice(0, 5),
    [sortedNotifications]
  );

  const visibleNotifications = useMemo(
    () => [...unreadNotifications, ...recentReadNotifications],
    [unreadNotifications, recentReadNotifications]
  );

  const unreadCount = unreadNotifications.length;

  useEffect(() => {
    if (!socket) {
      return;
    }

    const onNotification = (payload: ApiResponse<Notification> | Notification) => {
      const incoming = getIncomingNotification(payload);
      if (!incoming || !workshopId || incoming.receiverWorkshopId !== workshopId) {
        return;
      }

      queryClient.setQueryData<ApiResponse<unknown> | undefined>(notificationsKey, (data) => {
        if (!data) {
          return data;
        }

        return {
          ...data,
          data: mergeNotificationPayload(data.data, incoming)
        };
      });

      void queryClient.invalidateQueries({ queryKey: notificationsKey });
    };

    socket.on("notification", onNotification);

    return () => {
      socket.off("notification", onNotification);
    };
  }, [socket, queryClient, workshopId, notificationsKey]);

  const markOneAsRead = async (notificationId: string) => {
    await markNotificationAsRead.mutateAsync(notificationId);

    queryClient.setQueryData<ApiResponse<Notification[]> | undefined>(notificationsKey, (data) => {
      if (!data) {
        return data;
      }

      return {
        ...data,
        data: asNotificationArray(data.data).map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification
        )
      };
    });
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markOneAsRead(notification.id);
    }

    if (isWorkshopJobNotification(notification)) {
      await queryClient.refetchQueries({ queryKey: ["workshop-jobs"], type: "all" });
    }

    if (isOfferAcceptedNotification(notification)) {
      // Revalidate chat list API and chat notification queries for all rooms
      await Promise.all([
        queryClient.refetchQueries({ queryKey: chatRoomsQueryKey, type: "all" }),
        queryClient.invalidateQueries({ queryKey: ["chat-notifications"], type: "all" }),
        queryClient.invalidateQueries({ queryKey: ["chat-notifications", "rooms"], type: "all" })
      ]);
    }

    router.push(getNotificationHref(notification));
  };

  const handleReadAll = async () => {
    if (!unreadNotifications.length) {
      return;
    }

    await Promise.all(
      unreadNotifications.map((notification) => markNotificationAsRead.mutateAsync(notification.id))
    );

    queryClient.setQueryData<ApiResponse<Notification[]> | undefined>(notificationsKey, (data) => {
      if (!data) {
        return data;
      }

      return {
        ...data,
        data: asNotificationArray(data.data).map((notification) => ({
          ...notification,
          isRead: true
        }))
      };
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open notifications" className="relative">
          <Bell className="size-5 text-navy" />
          {unreadCount > 0 ? (
            <span className="absolute -top-1 -right-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-90 rounded-2xl border-2 border-navy/20 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-semibold text-navy">Notifications</h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => void handleReadAll()}
            disabled={!unreadCount || markNotificationAsRead.isPending}
            className="h-8 px-2 text-primary"
          >
            <CheckCheck className="size-4" />
            Read all
          </Button>
        </div>

        <ScrollArea className="h-80">
          <div className="space-y-2 p-3">
            {visibleNotifications.length ? (
              visibleNotifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => void handleNotificationClick(notification)}
                  className="w-full rounded-xl border border-navy/15 bg-muted/30 p-3 text-left transition hover:border-primary/70 hover:bg-primary/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-navy">{notification.title}</p>
                    {!notification.isRead ? (
                      <span className="mt-0.5 inline-block size-2 shrink-0 rounded-full bg-primary" />
                    ) : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {notification.body}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {timeAgo(notification.createdAt)}
                  </p>
                </button>
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-navy/20">
                <p className="text-sm text-muted-foreground">No notifications yet</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
