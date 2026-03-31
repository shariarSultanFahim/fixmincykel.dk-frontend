import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AuthRole } from "@/types/auth-role";
import {
  ADMIN_USER_LOGIN_PATH,
  AUTH_SESSION_COOKIE,
  ROLE_HOME_PATHS,
  UNAUTHORIZED_PATH,
  WORKSHOP_LOGIN_PATH
} from "@/constants/auth";

import { parseAuthSession } from "@/lib/auth/session";

export const getSessionFromRequest = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(AUTH_SESSION_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  return parseAuthSession(raw);
};

export const getLoginPathForRole = (role: AuthRole) => {
  if (role === "workshop") {
    return WORKSHOP_LOGIN_PATH;
  }

  return ADMIN_USER_LOGIN_PATH;
};

export const requirePrivateRole = async (allowedRoles: AuthRole[]) => {
  const session = await getSessionFromRequest();

  if (!session) {
    const fallbackRole = allowedRoles[0] ?? "user";
    redirect(getLoginPathForRole(fallbackRole));
  }

  if (!allowedRoles.includes(session.role)) {
    redirect(UNAUTHORIZED_PATH);
  }

  return session;
};

export const redirectIfAuthenticated = async () => {
  const session = await getSessionFromRequest();

  if (!session) {
    return null;
  }

  redirect(ROLE_HOME_PATHS[session.role]);
};
