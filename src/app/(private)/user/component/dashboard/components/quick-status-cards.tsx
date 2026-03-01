"use client";

import { CheckCircle2, Clock, Zap } from "lucide-react";

interface StatusCard {
  icon: React.ReactNode;
  value: number;
  label: string;
  subLabel?: string;
}

export function QuickStatusCards() {
  const cards: StatusCard[] = [
    {
      icon: <Zap className="size-6" />,
      value: 2,
      label: "Active Requests"
    },
    {
      icon: <Clock className="size-6" />,
      value: 3,
      label: "Offers Received"
    },
    {
      icon: <Clock className="size-6" />,
      value: 1,
      label: "Upcoming Repairs",
      subLabel: "Tomorrow"
    },
    {
      icon: <CheckCircle2 className="size-6" />,
      value: 6,
      label: "Total Completed"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card, idx) => (
        <div key={idx} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {card.icon}
          </div>
          <p className="text-3xl font-bold text-navy">{card.value}</p>
          <p className="text-sm text-muted-foreground">{card.label}</p>
          {card.subLabel && <p className="text-xs text-muted-foreground">({card.subLabel})</p>}
        </div>
      ))}
    </div>
  );
}
