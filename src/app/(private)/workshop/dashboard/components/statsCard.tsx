import { Calendar, Clock, DollarSign, LucideIcon, Mail, Send, Star } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
  iconColor: string;
  badge?: string;
  subtitle?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Send,
  Calendar,
  Clock,
  Star,
  DollarSign
};

export function StatsCard({ label, value, icon, iconColor, badge, subtitle }: StatsCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <Card className="border-none shadow-md transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-navy/70">{label}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconColor}`}>
          {IconComponent && <IconComponent className="h-5 w-5" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-navy">{value}</div>
        {badge && <p className="mt-1 text-xs font-medium text-yellow-600">{badge}</p>}
        {subtitle && <p className="mt-1 text-xs text-navy/60">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
