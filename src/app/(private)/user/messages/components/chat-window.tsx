"use client";

import { useState } from "react";

import { Send } from "lucide-react";

import { Conversation } from "@/types/conversation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { MessageBubble } from "./message-bubble";

interface ChatWindowProps {
  conversation: Conversation;
}

export function ChatWindow({ conversation }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("");
    }
  };

  return (
    <Card className="flex h-full min-h-0 w-full flex-col rounded-lg border-0 shadow-md md:min-w-0">
      <CardHeader className="sticky top-0 z-10 bg-white">
        <CardTitle className="text-lg md:text-lg">{conversation.workshopName}</CardTitle>
        <p className="text-xs text-gray-600 md:text-sm">{conversation.jobId}</p>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-linear-to-b from-white to-gray-50 p-4 md:p-6">
        {conversation.messages.map((message) => (
          <MessageBubble
            key={message.id}
            sender={message.sender}
            text={message.text}
            timestamp={message.timestamp}
          />
        ))}
      </CardContent>

      <div className="bg-white px-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 text-sm shadow-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="gap-2 px-3 md:px-4"
            size="sm"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
