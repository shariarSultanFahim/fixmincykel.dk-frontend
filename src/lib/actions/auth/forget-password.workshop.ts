"use client";

import { useMutation } from "@tanstack/react-query";

import { ForgetPasswordRequest, ForgetPasswordResponse } from "@/types/auth";

import { post } from "@/lib/api";

export function useWorkshopForgetPassword() {
  return useMutation({
    mutationFn: (payload: ForgetPasswordRequest) =>
      post<ForgetPasswordResponse, ForgetPasswordRequest>("/workshop/forget-password", payload)
  });
}
