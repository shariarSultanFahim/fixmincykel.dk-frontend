import { Separator } from "@/components/ui";
import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardThemeProvider } from "@/providers";

import { AdminAppSidebar } from "./component/layouts/appbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardThemeProvider type="admin">
      <SidebarProvider>
        <AdminAppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 bg-primary data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </header>
          <div className="flex flex-1 flex-col gap-4 overflow-y-hidden bg-background p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardThemeProvider>
  );
}
