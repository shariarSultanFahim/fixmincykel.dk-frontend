export type ChatMessageStatus = "sending" | "sent" | "failed";

export interface ChatRoomWorkshop {
  id: string;
  workshopName: string;
  email?: string;
  avatar?: string | null;
}

export interface ChatRoomUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string | null;
}

export interface ChatRoomBooking {
  id: string;
  jobId?: string;
}

export interface ChatMessageEntity {
  id: string;
  roomId: string;
  senderId: string;
  content: string | null;
  type?: string;
  isRead?: boolean;
  createdAt: string;
  updatedAt: string;
  clientId?: string | null;
}

export interface ChatRoom {
  id: string;
  bookingId: string;
  userId: string;
  workshopId: string;
  name: string;
  lastMessageId: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
  workshop: ChatRoomWorkshop;
  user: ChatRoomUser;
  booking?: ChatRoomBooking;
  lastMessage: ChatMessageEntity | null;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
  status: ChatMessageStatus;
}

export interface ChatNotification {
  id: string;
  chatRoomId: string;
  messageId: string;
  triggeredById: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessagesMeta {
  hasNextPage?: boolean;
  nextCursor?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: ChatMessagesMeta;
}

export interface ChatMessagesPage {
  messages: ChatMessage[];
  nextCursor: string | null;
}

export interface SendMessageInput {
  roomId: string;
  text: string;
}
