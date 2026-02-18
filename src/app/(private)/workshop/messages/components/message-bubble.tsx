interface MessageBubbleProps {
  sender: "user" | "customer";
  text: string;
  timestamp: string;
}

export function MessageBubble({ sender, text, timestamp }: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex gap-2 md:gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs rounded-lg px-3 py-2 break-words md:px-4 md:py-2 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        <p className="text-sm">{text}</p>
        <p className={`mt-1 text-xs ${isUser ? "opacity-70" : "opacity-60"}`}>{timestamp}</p>
      </div>
    </div>
  );
}
