"use client";

import { useMutation } from "@tanstack/react-query";

import { LoginRequest, LoginResponse } from "@/types/auth";

import { post } from "@/lib/api";
import { buildAuthSessionFromLoginResponse } from "@/lib/auth/session";

export const buildSessionFromLoginResponse = buildAuthSessionFromLoginResponse;

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginRequest) =>
      post<LoginResponse, LoginRequest>("/workshop/login", payload)
  });
}
