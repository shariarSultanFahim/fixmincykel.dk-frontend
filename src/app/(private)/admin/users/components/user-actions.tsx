import { Ban, CheckCircle, Eye, MoreHorizontal, Trash2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import type { UserStatus } from "../data/users";

interface UserActionsProps {
  userId: string;
  userStatus: UserStatus;
  onView?: (id: string) => void;
  onBan?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onUnban?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function UserActions({
  userId,
  userStatus,
  onView,
  onBan,
  onApprove,
  onReject,
  onUnban,
  onDelete
}: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {onView && (
          <DropdownMenuItem onClick={() => onView(userId)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
        )}

        {userStatus === "pending" && (
          <>
            {onApprove && (
              <DropdownMenuItem onClick={() => onApprove(userId)}>
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Approve
              </DropdownMenuItem>
            )}
            {onReject && (
              <DropdownMenuItem onClick={() => onReject(userId)}>
                <XCircle className="mr-2 h-4 w-4 text-red-600" />
                Reject
              </DropdownMenuItem>
            )}
          </>
        )}

        {userStatus !== "banned" && onBan && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onBan(userId)} className="text-red-600">
              <Ban className="mr-2 h-4 w-4" />
              Ban User
            </DropdownMenuItem>
          </>
        )}

        {userStatus === "banned" && onUnban && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onUnban(userId)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Unban User
            </DropdownMenuItem>
          </>
        )}

        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(userId)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
