"use client";

import { api } from "@/lib/api";

export const exportJobs = async (): Promise<Blob> => {
  const response = await api.get<Blob>("/analytics/export/jobs", {
    responseType: "blob"
  });

  return response.data;
};
