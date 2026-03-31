import { withPrivateRoute } from "@/lib/hoc/with-route-guard";

import { Separator } from "@/components/ui";
import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardThemeProvider, WorkshopChatRealtimeProvider } from "@/providers";

import { WorkshopAppBar } from "./component/layouts/appbar";
import { WorkshopNotificationPopover } from "./component/layouts/workshop-notification-popover";

function WorkshopLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardThemeProvider type="workshop">
      <WorkshopChatRealtimeProvider>
        <SidebarProvider>
          <WorkshopAppBar />
          <SidebarInset>
            <header className="my-1 flex h-16 shrink-0 items-center gap-2 bg-white px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 bg-primary data-[orientation=vertical]:h-4"
              />
              <DynamicBreadcrumb />
              <div className="ml-auto">
                <WorkshopNotificationPopover />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-hidden bg-background p-4">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </WorkshopChatRealtimeProvider>
    </DashboardThemeProvider>
  );
}

export default withPrivateRoute(WorkshopLayout, { allowedRoles: ["workshop"] });
