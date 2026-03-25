export interface PlatformCategory {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlatformCategoryListResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: PlatformCategory[];
  };
}

export interface PlatformCategoryMutationResponse {
  success: boolean;
  message: string;
  data: PlatformCategory;
}

export interface CreatePlatformCategoryPayload {
  name: string;
}

export interface PlatformData {
  id: string;
  platformFee: number;
  maximumJobRadius: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformDataResponse {
  success: boolean;
  message: string;
  data: PlatformData;
}

export interface UpdatePlatformDataPayload {
  platformFee: number;
  maximumJobRadius: number;
}
