"use client";

import { useMutation } from "@tanstack/react-query";

import { RegisterRequest, RegisterResponse } from "@/types/auth";

import { post } from "@/lib/api";

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterRequest) =>
      post<RegisterResponse, RegisterRequest>("/auth/register", payload)
  });
}
