export type Category = "brakes" | "puncture" | "chain" | "general-tune-up" | "e-bike-service";
export type Status = "pending" | "booked" | "completed";

export interface Job {
  jobId: string;
  user: string;
  offers: string;
  status: Status;
  createdAt: number;
  category: Category;
}

export const jobData: Job[] = [
  {
    jobId: "JOB-2049",
    user: "Maria L.",
    offers: "3",
    status: "pending",
    createdAt: 1678886400000,
    category: "brakes"
  },
  {
    jobId: "JOB-2050",
    user: "Anders M.",
    offers: "1",
    status: "booked",
    createdAt: 1678972800000,
    category: "puncture"
  },
  {
    jobId: "JOB-2051",
    user: "Sofia K.",
    offers: "2",
    status: "completed",
    createdAt: 1679059200000,
    category: "chain"
  },
  {
    jobId: "JOB-2052",
    user: "Jens P.",
    offers: "1",
    status: "pending",
    createdAt: 1679145600000,
    category: "general-tune-up"
  },
  {
    jobId: "JOB-2053",
    user: "Emma R.",
    offers: "0",
    status: "pending",
    createdAt: 1679232000000,
    category: "e-bike-service"
  }
];
