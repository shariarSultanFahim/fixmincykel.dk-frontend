"use client";

import { api } from "@/lib/api";

export const exportWorkshops = async (): Promise<Blob> => {
  const response = await api.get<Blob>("/analytics/export/workshops", {
    responseType: "blob"
  });

  return response.data;
};
