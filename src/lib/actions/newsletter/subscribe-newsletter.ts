"use client";

import { useMutation } from "@tanstack/react-query";

import type { SubscribeNewsletterPayload, SubscribeNewsletterResponse } from "@/types/newsletter";

import { post } from "@/lib/api";

export const subscribeNewsletter = (payload: SubscribeNewsletterPayload) =>
  post<SubscribeNewsletterResponse, SubscribeNewsletterPayload>("/newsletter", payload);

export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: subscribeNewsletter
  });
};
