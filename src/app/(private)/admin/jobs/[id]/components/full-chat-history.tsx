import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { ChatMessage } from "../../data/jobs";

interface FullChatHistoryProps {
  messages: ChatMessage[];
}

export default function FullChatHistory({ messages }: FullChatHistoryProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Full Chat History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="border-l-4 border-primary bg-blue-50 p-4">
              <div className="flex items-baseline justify-between">
                <p className="font-medium text-gray-900">{message.sender}</p>
                <p className="text-xs text-gray-500">{message.timestamp}</p>
              </div>
              <p className="mt-2 text-sm text-gray-700">{message.message}</p>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-gray-500">No messages yet</p>
        )}
      </CardContent>
    </Card>
  );
}
