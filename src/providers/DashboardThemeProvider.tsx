import type { ReactNode } from "react";

export type DashboardThemeType = "admin" | "workshop" | "user";

interface DashboardThemeProviderProps {
  children: ReactNode;
  type: DashboardThemeType;
}

const themeClassMap: Record<DashboardThemeType, string> = {
  admin: "theme-admin",
  workshop: "theme-workshop",
  user: "theme-user"
};

export function DashboardThemeProvider({ children, type }: DashboardThemeProviderProps) {
  const themeClass = themeClassMap[type];

  return <div className={themeClass}>{children}</div>;
}
