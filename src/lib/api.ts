import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { AUTH_SESSION_COOKIE } from "@/constants/auth";
import { env } from "@/env";

import { parseAuthSession } from "@/lib/auth/session";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json"
  }
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  const headers = config.headers as Record<string, string | undefined> | undefined;
  const hasAuthorizationHeader = Boolean(headers?.Authorization || headers?.authorization);

  if (token && !hasAuthorizationHeader) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isAxiosError(err)) return Promise.reject(err);

    return Promise.reject(new AxiosError("Bilinmeyen hata"));
  }
);

type Cfg = AxiosRequestConfig & { signal?: AbortSignal };

export const get = async <T>(url: string, config?: Cfg) => (await api.get<T>(url, config)).data;

export const post = async <T, B = unknown>(url: string, body?: B, config?: Cfg) =>
  (await api.post<T>(url, body, config)).data;

export const put = async <T, B = unknown>(url: string, body?: B, config?: Cfg) =>
  (await api.put<T>(url, body, config)).data;

export const del = async <T>(url: string, config?: Cfg) => (await api.delete<T>(url, config)).data;

const getCookieValue = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const prefix = `${name}=`;
  const found = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!found) {
    return null;
  }

  return found.slice(prefix.length);
};

async function getToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession = getCookieValue(AUTH_SESSION_COOKIE);
  if (!rawSession) {
    return null;
  }

  const session = parseAuthSession(rawSession);
  const token = session?.accessToken ?? null;
  return token;
}
