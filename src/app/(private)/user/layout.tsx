import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardThemeProvider } from "@/providers";

import { UserAppBar } from "./component/layouts/appbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardThemeProvider type="user">
      <SidebarProvider>
        <UserAppBar />
        <div className="flex flex-1 flex-col gap-4 overflow-y-hidden bg-background p-4">
          {children}
        </div>
      </SidebarProvider>
    </DashboardThemeProvider>
  );
}
