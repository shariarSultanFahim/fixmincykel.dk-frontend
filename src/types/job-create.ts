export type BikeType =
  | "ROAD"
  | "MOUNTAIN"
  | "HYBRID"
  | "ELECTRIC"
  | "BMX"
  | "GRAVEL"
  | "CRUISER"
  | "OTHER";

export interface JobCategoryOption {
  id: string;
  name: string;
}

export interface JobCategoryListPayload {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: JobCategoryOption[];
}

export interface JobCategoryListResponse {
  success: boolean;
  message: string;
  data: JobCategoryListPayload;
}

export interface CreateJobCategoryInput {
  categoryId: string;
  description: string;
}

export interface CreateJobInput {
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
  preferredTime: string;
  categories: CreateJobCategoryInput[];
  photos: File[];
}

export interface CreatedJob {
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
  bikeType: string;
  bikeBrand: string;
  photos: string[];
  preferredTime: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  createdAt: string;
  updatedAt: string;
  bikeId: string | null;
}

export interface CreateJobResponse {
  success: boolean;
  message: string;
  data: CreatedJob;
}
