export interface Message {
  id: string;
  sender: "user" | "customer";
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  jobId: string;
  lastMessage: string;
  lastMessageTime: string;
  isUnread: boolean;
  messages: Message[];
}

export interface UserConversation {
  id: string;
  workshopId: string;
  workshopName: string;
  jobId: string;
  lastMessage: string;
  lastMessageTime: string;
  isUnread: boolean;
  messages: Message[];
}
