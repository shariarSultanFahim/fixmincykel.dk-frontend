export interface InvoiceLineItem {
  id: string;
  description: string;
  dateTime: string;
  amount: number;
}

export interface MonthlyInvoiceDetail {
  invoiceNumber: string;
  workshopName: string;
  period: string;
  issueDate: string;
  dueDate: string;
  feePercentage: number;
  lineItems: InvoiceLineItem[];
}
