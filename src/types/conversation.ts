export interface Message {
  id: string;
  sender: "user" | "customer";
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  workshopId: string;
  workshopName: string;
  jobId: string;
  lastMessage: string;
  lastMessageTime: string;
  isUnread: boolean;
  messages: Message[];
}
