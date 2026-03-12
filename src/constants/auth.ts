import type { AuthRole } from "@/types/auth-role";

export const AUTH_SESSION_COOKIE = "ri_session";
export const ADMIN_USER_LOGIN_PATH = "/login";
export const WORKSHOP_LOGIN_PATH = "/service-provider/login";
export const UNAUTHORIZED_PATH = "/";

export const ROLE_HOME_PATHS: Record<AuthRole, string> = {
  admin: "/admin",
  user: "/user",
  workshop: "/workshop"
};
