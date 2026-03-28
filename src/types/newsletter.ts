export interface NewsletterSubscription {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribeNewsletterPayload {
  email: string;
}

export interface SubscribeNewsletterResponse {
  success: boolean;
  message: string;
  data: NewsletterSubscription;
}
