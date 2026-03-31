"use client";

import { useMutation } from "@tanstack/react-query";

import { ResetPasswordRequest, ResetPasswordResponse } from "@/types/auth";

import { post } from "@/lib/api";

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, password }: ResetPasswordRequest) =>
      post<ResetPasswordResponse, { password: string }>(
        "/auth/reset-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
  });
}
