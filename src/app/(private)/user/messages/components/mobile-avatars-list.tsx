import { ChatRoom } from "@/types";

interface MobileAvatarsListProps {
  conversations: ChatRoom[];
  selectedId?: string;
  onSelect: (id: string) => void;
  searchQuery: string;
}

export function MobileAvatarsList({
  conversations,
  selectedId,
  onSelect,
  searchQuery
}: MobileAvatarsListProps) {
  const searchLower = searchQuery.toLowerCase();
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.workshop.workshopName.toLowerCase().includes(searchLower) ||
      conversation.bookingId.toLowerCase().includes(searchLower) ||
      (conversation.lastMessage?.content ?? "").toLowerCase().includes(searchLower)
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="scrollbar-hide flex gap-3 overflow-x-auto p-2">
      {filteredConversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className="flex shrink-0 flex-col items-center gap-2"
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-semibold text-white transition-all ${
              selectedId === conversation.id
                ? "bg-primary ring-2 ring-primary ring-offset-2"
                : "bg-secondary text-navy hover:bg-primary/80"
            }`}
          >
            {getInitials(conversation.workshop.workshopName)}
          </div>
          <span className="max-w-12.5 truncate text-xs text-gray-700">
            {conversation.workshop.workshopName.split(" ")[0]}
          </span>
          {conversation.unreadCount > 0 && (
            <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
