import { LoginResponse } from "@/types/auth";
import type { AuthRole } from "@/types/auth-role";
import type { AuthSession } from "@/types/auth-session";

const normalizeAuthRole = (role: string | null | undefined): AuthRole | null => {
  if (!role) {
    return null;
  }

  const normalized = role.toLowerCase();

  if (normalized === "admin" || normalized === "user" || normalized === "workshop") {
    return normalized;
  }

  return null;
};

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  const payload = parts[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");

  try {
    const decoded = Buffer.from(padded, "base64").toString("utf8");
    const parsed = JSON.parse(decoded) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
};

const extractRoleFromToken = (token: string): AuthRole | null => {
  const payload = decodeJwtPayload(token);
  const role = typeof payload?.role === "string" ? payload.role : null;
  return normalizeAuthRole(role);
};

const parseSessionFromUnknown = (value: unknown): AuthSession | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<AuthSession>;
  if (typeof candidate.accessToken !== "string" || typeof candidate.refreshToken !== "string") {
    return null;
  }

  const role = normalizeAuthRole(candidate.role) ?? extractRoleFromToken(candidate.accessToken);
  if (!role) {
    return null;
  }

  return {
    accessToken: candidate.accessToken,
    refreshToken: candidate.refreshToken,
    role
  };
};

export const parseAuthSession = (raw: string): AuthSession | null => {
  const parse = (input: string): AuthSession | null => {
    try {
      const parsed = JSON.parse(input) as unknown;
      return parseSessionFromUnknown(parsed);
    } catch {
      return null;
    }
  };

  const parsedRaw = parse(raw);
  if (parsedRaw) {
    return parsedRaw;
  }

  try {
    const decoded = decodeURIComponent(raw);
    return parse(decoded);
  } catch {
    return null;
  }
};

export const buildAuthSessionFromLoginResponse = (data: LoginResponse): AuthSession => {
  const accessToken = data.data?.accessToken;
  const refreshToken = data.data?.refreshToken;

  if (!data.success || !accessToken || !refreshToken) {
    throw new Error(data.message || "Login failed.");
  }

  const role = normalizeAuthRole(data.data?.user?.role) ?? extractRoleFromToken(accessToken);
  if (!role) {
    throw new Error("Unable to detect user role from login response.");
  }

  return {
    accessToken,
    refreshToken,
    role
  };
};
