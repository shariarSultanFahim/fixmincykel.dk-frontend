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
  const filteredConversations = conversations.filter((conversation) => {
    const workshopName = (
      conversation.workshop?.workshopName ??
      conversation.user?.name ??
      "Unknown"
    ).toLowerCase();
    const bookingId = (conversation.bookingId ?? "").toLowerCase();
    const lastMessage = (conversation.lastMessage?.content ?? "").toLowerCase();

    return (
      workshopName.includes(searchLower) ||
      bookingId.includes(searchLower) ||
      lastMessage.includes(searchLower)
    );
  });

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
          <div className="relative">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-semibold text-white transition-all ${
                selectedId === conversation.id
                  ? "bg-primary ring-2 ring-primary ring-offset-2"
                  : "bg-secondary text-navy hover:bg-primary/80"
              }`}
            >
              {getInitials(
                conversation.workshop?.workshopName ?? conversation.user?.name ?? "Unknown"
              )}
            </div>
            {conversation.unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-primary" />
            )}
          </div>
          <span className="max-w-12.5 truncate text-xs text-gray-700">
            {
              (conversation.workshop?.workshopName ?? conversation.user?.name ?? "Unknown").split(
                " "
              )[0]
            }
          </span>
        </button>
      ))}
    </div>
  );
}
