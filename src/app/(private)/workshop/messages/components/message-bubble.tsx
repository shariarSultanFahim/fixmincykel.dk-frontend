import { ChatMessageStatus } from "@/types";

interface MessageBubbleProps {
  isSent: boolean;
  text: string;
  timestamp: string;
  status?: ChatMessageStatus;
}

export function MessageBubble({ isSent, text, timestamp, status = "sent" }: MessageBubbleProps) {
  return (
    <div className={`flex gap-2 md:gap-3 ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`wrap-break-words max-w-xs rounded-lg px-3 py-2 md:px-4 md:py-2 ${
          isSent ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        <p className="text-sm">{text}</p>
        <p className={`mt-1 text-xs ${isSent ? "opacity-70" : "opacity-60"}`}>
          {timestamp}
          {isSent && status !== "sent" ? ` • ${status}` : ""}
        </p>
      </div>
    </div>
  );
}
