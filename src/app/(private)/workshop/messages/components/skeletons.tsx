import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ConversationListSkeleton() {
  return (
    <Card className="flex h-full min-h-0 flex-col border-0 shadow-md">
      <CardHeader className="sticky top-0 z-10 border-b bg-white">
        <Skeleton className="mb-3 h-6 w-32" />
        <Skeleton className="h-10 w-full" />
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto p-0">
        <div className="divide-y">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2 p-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ChatWindowSkeleton() {
  return (
    <Card className="flex h-full flex-col border-0 shadow-md">
      <CardHeader className="sticky top-0 bg-white">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
      </CardHeader>

      <CardContent className="flex-1 space-y-4 overflow-y-auto p-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className={`h-12 ${i % 2 === 0 ? "w-2/3" : "ml-auto w-3/4"}`} />
        ))}
      </CardContent>

      <div className="space-y-2 border-t p-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
}
