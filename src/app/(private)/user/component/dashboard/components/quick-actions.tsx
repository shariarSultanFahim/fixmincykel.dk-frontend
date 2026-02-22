"use client";

import { Edit, FileText, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: "New Repair",
      description: "Request",
      url: "/user/repairs/new"
    },
    {
      icon: FileText,
      label: "View All",
      description: "Jobs",
      url: "/user/repairs"
    },
    {
      icon: Edit,
      label: "Edit",
      description: "Profile",
      url: "/user/profile"
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <div className="space-y-4 px-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
          <span>⚡</span> Quick Actions
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Button
                key={idx}
                variant="outline"
                className="flex h-auto flex-col gap-2 border-none bg-primary/20 py-4 text-navy hover:text-white"
                asChild
              >
                <a href={action.url}>
                  <Icon className="size-6" />
                  <span className="text-xs font-semibold">{action.label}</span>
                  {action.description && <span className="text-xs">{action.description}</span>}
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
