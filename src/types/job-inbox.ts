export type JobActionVariant = "default" | "outline" | "secondary" | "destructive";
export type JobStatus = "New" | "Viewed" | "Offer Sent" | "Booked";

export interface JobAction {
  label: string;
  variant: JobActionVariant;
}

export interface JobInboxItem {
  id: string;
  status: JobStatus;
  title: string;
  category: string;
  distance: string;
  time: string;
  user: string;
  bike: string;
  verified: boolean;
  posted: string;
  description: string;
  subtext?: string;
  actions: JobAction[];
}
