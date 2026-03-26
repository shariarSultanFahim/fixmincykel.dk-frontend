"use client";

import { useMutation } from "@tanstack/react-query";

import { ResendOTPRequest, VerifyUserRequest, VerifyUserResponse } from "@/types/auth";

import { post } from "@/lib/api";
import { buildAuthSessionFromLoginResponse } from "@/lib/auth/session";

export const buildSessionFromVerifyUserResponse = (data: VerifyUserResponse) => {
  return buildAuthSessionFromLoginResponse(data as any);
};

export function useVerifyUser() {
  return useMutation({
    mutationFn: (payload: VerifyUserRequest) =>
      post<VerifyUserResponse, VerifyUserRequest>("/auth/verify-user", payload)
  });
}

export function useResendOTP() {
  return useMutation({
    mutationFn: (payload: ResendOTPRequest) => post("/auth/resend-otp", payload)
  });
}
