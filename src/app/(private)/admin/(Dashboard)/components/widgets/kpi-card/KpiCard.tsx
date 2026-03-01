import type { KpiStat } from "@/types/dashboard";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  stat: KpiStat;
}

export default function KpiCard({ stat }: KpiCardProps) {
  const Icon = stat.icon;

  return (
    <Card className="border-border">
      <CardContent className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-xl font-semibold text-foreground">{stat.value}</p>
        </div>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-xl md:h-10 md:w-10",
            stat.iconWrapperClassName
          )}
        >
          <Icon className={cn("h-5 w-5 p-1 md:p-0", stat.iconClassName)} />
        </div>
      </CardContent>
    </Card>
  );
}
