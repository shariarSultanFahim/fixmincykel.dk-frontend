"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, LogOut } from "lucide-react";

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
  SidebarRail,
  SidebarTrigger
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
          url: "/dashboard",
          icon: LayoutDashboard
        }
      ]
    }
  ]
};

export function WorkshopAppBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const rootPath = pathname.split("/")[1];

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-center">
              <SidebarMenuButton size="lg" asChild className="group-data-[collapsible=icon]:hidden">
                <Link href="/workshop">
                  <div className="grid flex-1 text-sm leading-tight">
                    <span className="truncate text-lg font-bold">{data.info.title}</span>
                    <span className="text-sidebar-foreground/60 truncate text-xs font-semibold">
                      {data.info.subtitle}
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
              <SidebarTrigger className="flex items-center" />
            </div>
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
                    <SidebarMenuButton
                      asChild
                      isActive={rootPath === item.url.split("/")[1]}
                      className="data-[active=true]:bg-white/25 data-[active=true]:text-primary-foreground data-[active=true]:shadow-md data-[active=true]:backdrop-blur-sm"
                    >
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
