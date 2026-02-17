"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard } from "lucide-react";

import { Separator } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  SidebarMenuSubItem,
  SidebarRail
} from "@/components/ui/sidebar";

const data = {
  info: {
    title: "Bike Platform Admin",
    subtitle: "Admin Portal"
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

export function AdminAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const rootPath = pathname.split("/")[1];

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="group-data-[collapsible=icon]:hidden">
              <Link href="/admin">
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
      <Separator className="bg-[#003D75]" />
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
      <Separator className="bg-[#003D75]" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuSubItem>
            <div className="hidden flex-col gap-4 group-data-[collapsible=icon]:flex">
              <Avatar size="lg" className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <div className="flex items-center justify-start gap-4">
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">John Doe</h2>
                  <h3 className="text-sm text-white/30">john@riseimpact.com</h3>
                </div>
              </div>
            </div>
          </SidebarMenuSubItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
