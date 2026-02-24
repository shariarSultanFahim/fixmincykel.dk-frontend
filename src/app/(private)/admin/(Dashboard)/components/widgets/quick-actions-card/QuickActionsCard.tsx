import Link from "next/link";

import type { QuickAction } from "@/types/dashboard";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickActionsCardProps {
  actions: QuickAction[];
}

export default function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            asChild
            variant={action.variant ?? "default"}
            className={cn("w-full justify-center", action.className)}
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
