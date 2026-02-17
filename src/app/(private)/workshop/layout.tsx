import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardThemeProvider } from "@/providers";

import { WorkshopAppBar } from "./component/layouts/appbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardThemeProvider type="workshop">
      <SidebarProvider>
        <WorkshopAppBar />
        <div className="flex flex-1 flex-col gap-4 overflow-y-hidden bg-background p-4">
          {children}
        </div>
      </SidebarProvider>
    </DashboardThemeProvider>
  );
}
