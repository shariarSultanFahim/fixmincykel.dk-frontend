"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Calendar,
  FileChartLine,
  LayoutDashboard,
  ListTodo,
  LogOut,
  MessageSquareQuote,
  User
} from "lucide-react";

import { Separator } from "@/components/ui";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar";

const data = {
  info: {
    title: "Copenhagen Bike Repair",
    subtitle: "Workshop Portal"
  },
  navMain: [
    {
      title: "",
      items: [
        {
          title: "Dashboard",
          url: `/workshop`,
          icon: LayoutDashboard
        },
        {
          title: "Job Inbox",
          url: `/workshop/job-inbox`,
          icon: ListTodo
        },
        {
          title: "Calendar",
          url: `/workshop/calendar`,
          icon: Calendar
        },
        {
          title: "Analytics",
          url: `/workshop/analytics`,
          icon: FileChartLine
        },
        {
          title: "Messages",
          url: `/workshop/messages`,
          icon: MessageSquareQuote
        },
        {
          title: "Profile",
          url: `/workshop/profile`,
          icon: User
        }
      ]
    }
  ]
};

export function WorkshopAppBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/workshop") {
      return pathname === "/workshop";
    }

    return pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);
  };

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/workshop">
                <div className="text-sidebar-primary-foreground hidden aspect-square size-8 items-center justify-center rounded-full group-data-[collapsible=icon]:flex">
                  <Avatar size="sm" className="rounded-full">
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid flex-1 text-sm leading-tight">
                  <span className="truncate text-lg font-bold">{data.info.title}</span>
                  <span className="text-sidebar-foreground/60 truncate text-xs font-semibold">
                    {data.info.subtitle}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isItemActive(item.url)} className="">
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="space-y-5">
            <SidebarMenuButton asChild className="group-data-[collapsible=icon]:w-full">
              <Link
                href="/service-provider/login"
                className="h-10 w-full border border-secondary bg-transparent group-data-[collapsible=icon]:p-0 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:backdrop-blur-sm"
              >
                <button className="flex w-full items-center justify-center gap-2 border-none">
                  <LogOut className="size-4 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
                </button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
