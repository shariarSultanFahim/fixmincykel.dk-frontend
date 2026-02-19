"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarHeartIcon,
  GitCompare,
  LayoutDashboard,
  ListTodo,
  LogOut,
  MessageSquareQuote,
  Star,
  ToolCase,
  User
} from "lucide-react";

import { Separator } from "@/components/ui";
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
          url: `/user`,
          icon: LayoutDashboard
        },
        {
          title: "My Repairs",
          url: `/user/reparirs`,
          icon: ListTodo
        },
        {
          title: "Compare Offers",
          url: `/user/offers`,
          icon: GitCompare
        },
        {
          title: "My Bookings",
          url: `/user/bookings`,
          icon: CalendarHeartIcon
        },
        {
          title: "Messages",
          url: `/user/messages`,
          icon: MessageSquareQuote
        },
        {
          title: "Reviews",
          url: `/user/reviews`,
          icon: Star
        },
        {
          title: "Profile",
          url: `/user/profile`,
          icon: User
        }
      ]
    }
  ]
};

export function UserAppBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/user") {
      return pathname === "/user";
    }

    return pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);
  };

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/user">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full">
                  <ToolCase className="size-8 rounded-lg bg-primary text-white" />
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
                href="/login"
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
