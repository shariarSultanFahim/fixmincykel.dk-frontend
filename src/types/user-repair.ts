import type { BikeType } from "./job-create";
import type { JobStatus, JobUrgency } from "./jobs-manage";

export interface UserRepair {
  id: string;
  userId: string;
  title: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  radius: number;
  bikeName: string;
  bikeType: BikeType;
  bikeBrand: string;
  photos: string[];
  preferredTime: string;
  urgency: JobUrgency;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  bikeId: string | null;
}

export interface UserRepairListMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UserRepairListPayload {
  result: UserRepair[];
  meta: UserRepairListMeta;
}

export interface UserRepairListResponse {
  success: boolean;
  message: string;
  data: UserRepairListPayload;
}

export interface UserRepairQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}
