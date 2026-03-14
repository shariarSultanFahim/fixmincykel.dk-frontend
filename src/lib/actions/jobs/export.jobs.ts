"use client";

import { api } from "@/lib/api";

export const exportJobs = async (): Promise<Blob> => {
  const response = await api.get("/analytics/export/jobs", {
    responseType: "blob"
  });

  return response.data as Blob;
};
