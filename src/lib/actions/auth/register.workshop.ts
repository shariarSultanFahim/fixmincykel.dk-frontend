"use client";

import { useMutation } from "@tanstack/react-query";

import { WorkshopRegisterRequest, WorkshopRegisterResponse } from "@/types/auth";

import { post } from "@/lib/api";

export function useWorkshopRegister() {
  return useMutation({
    mutationFn: (payload: WorkshopRegisterRequest) =>
      post<WorkshopRegisterResponse, WorkshopRegisterRequest>("/workshop/register", payload)
  });
}
