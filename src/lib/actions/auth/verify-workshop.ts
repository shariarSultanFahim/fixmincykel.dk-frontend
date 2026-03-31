"use client";

import { useMutation } from "@tanstack/react-query";

import {
  ResendOTPRequest,
  VerifyWorkshopRequest,
  VerifyWorkshopResponse,
  type LoginResponse
} from "@/types/auth";

import { post } from "@/lib/api";
import { buildAuthSessionFromLoginResponse } from "@/lib/auth/session";

export const buildSessionFromVerifyWorkshopResponse = (data: VerifyWorkshopResponse) => {
  const workshop = data.data?.workshop;

  const normalized: LoginResponse = {
    success: data.success,
    message: data.message,
    data: {
      accessToken: data.data?.accessToken,
      refreshToken: data.data?.refreshToken,
      user: {
        id: workshop?.id ?? "",
        name: "",
        email: workshop?.email ?? "",
        phone: workshop?.phone ?? "",
        role: workshop?.role ?? "",
        isVerified: workshop?.isVerified ?? false,
        status: workshop?.approvalStatus ?? "active"
      }
    }
  };

  return buildAuthSessionFromLoginResponse(normalized);
};

export function useVerifyWorkshop() {
  return useMutation({
    mutationFn: (payload: VerifyWorkshopRequest) =>
      post<VerifyWorkshopResponse, VerifyWorkshopRequest>("/workshop/verify-workshop", payload)
  });
}

export function useResendWorkshopOTP() {
  return useMutation({
    mutationFn: (payload: ResendOTPRequest) =>
      post<{ success: boolean; message: string }, ResendOTPRequest>("/workshop/resend-otp", payload)
  });
}
