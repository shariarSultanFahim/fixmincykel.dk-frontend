export interface VisionStatistics {
  totalJobs: number;
  totalReviews: number;
  totalJobsCompleted: number;
  totalApprovedWorkshops: number;
  averageRating: number;
  jobRequestsEveryYear: number[];
  avgJobRequestsPerYear: number;
  totalBookingsCompleted: number;
}

export interface VisionStatisticsResponse {
  success: boolean;
  message: string;
  data: VisionStatistics;
}
