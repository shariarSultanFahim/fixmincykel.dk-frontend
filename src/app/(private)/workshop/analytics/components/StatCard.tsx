import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  color: string;
}

export function StatCard({ label, value, color }: StatCardProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="space-y-2">
        <p className="text-sm text-navy/70">{label}</p>
        <p className={cn("text-3xl font-bold", color)}>{value}</p>
      </CardContent>
    </Card>
  );
}
