"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bolt,
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  Folder,
  LayoutDashboard,
  MessageSquareCode,
  ToolCase,
  User
} from "lucide-react";

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
          url: "/admin",
          icon: LayoutDashboard
        },
        {
          title: "User Management",
          url: "/admin/users",
          icon: User
        },
        {
          title: "Workshop Management",
          url: "/admin/workshops",
          icon: ToolCase
        },
        {
          title: "Job Management",
          url: "/admin/jobs",
          icon: BriefcaseBusiness
        },
        {
          title: "Booking Management",
          url: "/admin/bookings",
          icon: Folder
        },
        {
          title: "Payments & Fees",
          url: "/admin/payments",
          icon: CreditCard
        },
        {
          title: "Review Moderation",
          url: "/admin/reviews",
          icon: MessageSquareCode
        },
        {
          title: "System Settings",
          url: "/admin/settings",
          icon: Bolt
        },
        {
          title: "Invoices & Payouts",
          url: "/admin/invoices",
          icon: ClipboardList
        }
      ]
    }
  ]
};

export function AdminAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/admin") {
      return pathname === "/admin";
    }

    return pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);
  };

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
          <SidebarGroup key={group.title} className="m-0 p-0">
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isItemActive(item.url)} className="py-6">
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
