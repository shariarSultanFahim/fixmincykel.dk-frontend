"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  AdjustWorkshopPlatformFeesRequest,
  AdjustWorkshopPlatformFeesResponse,
  GenerateMonthlyInvoicesRequest,
  GenerateMonthlyInvoicesResponse,
  MarkInvoicePaidResponse,
  MonthlyInvoiceListParams,
  MonthlyInvoiceListResponse
} from "@/types/admin-invoice";

import { api as instance } from "@/lib/api";

const buildMonthlyInvoiceParams = (params: MonthlyInvoiceListParams) => {
  const queryParams: Record<string, string | number> = {
    month: params.month,
    page: params.page ?? 1,
    limit: params.limit ?? 10
  };

  if (params.status) {
    queryParams.status = params.status;
  }

  return queryParams;
};

export const useGetMonthlyInvoices = (params: MonthlyInvoiceListParams, enabled = true) => {
  return useQuery({
    queryKey: ["admin-monthly-invoices", params],
    enabled,
    queryFn: async () => {
      const response = await instance.get<MonthlyInvoiceListResponse>("/invoice/monthly", {
        params: buildMonthlyInvoiceParams(params)
      });
      return response.data;
    }
  });
};

export const useGenerateMonthlyInvoices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: GenerateMonthlyInvoicesRequest) => {
      const response = await instance.post<GenerateMonthlyInvoicesResponse>(
        "/invoice/generate-monthly",
        payload
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-monthly-invoices"] });
    }
  });
};

export const useMarkInvoiceAsPaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await instance.patch<MarkInvoicePaidResponse>(`/invoice/${invoiceId}/paid`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-monthly-invoices"] });
    }
  });
};

export const useAdjustWorkshopPlatformFees = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AdjustWorkshopPlatformFeesRequest) => {
      const response = await instance.patch<AdjustWorkshopPlatformFeesResponse>(
        `/workshop/${payload.workshopId}/platform-fees`,
        {
          platformFees: payload.platformFees
        }
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-monthly-invoices"] });
    }
  });
};

export const useDownloadInvoice = () => {
  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await instance.get<Blob>(`/invoice/${invoiceId}/download`, {
        responseType: "blob"
      });
      return response.data;
    }
  });
};
