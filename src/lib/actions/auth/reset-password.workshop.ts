"use client";

import { useMutation } from "@tanstack/react-query";

import { ResetPasswordRequest, ResetPasswordResponse } from "@/types/auth";

import { post } from "@/lib/api";

export function useWorkshopResetPassword() {
  return useMutation({
    mutationFn: ({ token, password }: ResetPasswordRequest) =>
      post<ResetPasswordResponse, { password: string }>(
        "/workshop/reset-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
  });
}
