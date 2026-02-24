import type { MonthlyInvoiceDetail } from "@/types/invoice-detail";
import type { InvoiceReportSummary, WorkshopInvoiceItem } from "@/types/invoice-report";

export const reportSummary: InvoiceReportSummary = {
  reportPeriod: "October 1 - 31, 2024",
  totalJobRevenue: 59700,
  totalPlatformFees: 5970,
  readyWorkshopsCount: 3,
  totalWorkshops: 4
};

export const workshopInvoiceList: WorkshopInvoiceItem[] = [
  {
    id: "workshop-1",
    name: "Copenhagen Bike Repair",
    completedJobs: 12,
    jobRevenue: 18500,
    feePercentage: 10,
    invoiceStatus: "sent",
    invoiceStatusDetail: "Nov 1",
    actions: [
      { label: "View", tone: "primary" },
      { label: "Download", tone: "muted" },
      { label: "Remind", tone: "secondary" }
    ]
  },
  {
    id: "workshop-2",
    name: "City Cycle Fix",
    completedJobs: 8,
    jobRevenue: 12300,
    feePercentage: 10,
    invoiceStatus: "ready",
    actions: [
      { label: "Review", tone: "primary" },
      { label: "Create Invoice", tone: "success" }
    ]
  },
  {
    id: "workshop-3",
    name: "Quick Bike Service",
    completedJobs: 5,
    jobRevenue: 6800,
    feePercentage: 10,
    invoiceStatus: "ready",
    actions: [
      { label: "Review", tone: "primary" },
      { label: "Create Invoice", tone: "success" }
    ]
  },
  {
    id: "workshop-4",
    name: "E-Bike Specialists",
    completedJobs: 10,
    jobRevenue: 22100,
    feePercentage: 10,
    invoiceStatus: "overdue",
    invoiceStatusDetail: "Sep",
    actions: [
      { label: "View History", tone: "primary" },
      { label: "Send Final Notice", tone: "danger" }
    ]
  }
];

export const invoiceDetails: Record<string, MonthlyInvoiceDetail> = {
  "workshop-2": {
    invoiceNumber: "INV-2410-CCF",
    workshopName: "City Cycle Fix",
    period: "October 1 - 31, 2024",
    issueDate: "November 1, 2024",
    dueDate: "November 15, 2024",
    feePercentage: 10,
    lineItems: [
      {
        id: "JOB-2048",
        description: "Puncture Repair",
        dateTime: "2024-10-16 09:00",
        amount: 200
      },
      {
        id: "JOB-2045",
        description: "Brake Service",
        dateTime: "2024-10-16 09:00",
        amount: 450
      },
      {
        id: "JOB-2050",
        description: "Full Service",
        dateTime: "2024-10-16 09:00",
        amount: 1500
      },
      {
        id: "JOB-2055",
        description: "Gear Tuning",
        dateTime: "2024-10-16 09:00",
        amount: 550
      },
      {
        id: "JOB-2060",
        description: "Chain Replacement",
        dateTime: "2024-10-16 09:00",
        amount: 800
      },
      {
        id: "JOB-2065",
        description: "Tire Replacement",
        dateTime: "2024-10-16 09:00",
        amount: 1200
      },
      {
        id: "JOB-2070",
        description: "Wheel Truing",
        dateTime: "2024-10-16 09:00",
        amount: 600
      },
      {
        id: "JOB-2075",
        description: "Full Service",
        dateTime: "2024-10-16 09:00",
        amount: 7000
      }
    ]
  },
  "workshop-3": {
    invoiceNumber: "INV-2410-QBS",
    workshopName: "Quick Bike Service",
    period: "October 1 - 31, 2024",
    issueDate: "November 1, 2024",
    dueDate: "November 15, 2024",
    feePercentage: 10,
    lineItems: [
      {
        id: "JOB-3031",
        description: "Flat Fix",
        dateTime: "2024-10-18 11:30",
        amount: 300
      },
      {
        id: "JOB-3035",
        description: "Brake Adjustment",
        dateTime: "2024-10-18 12:10",
        amount: 450
      },
      {
        id: "JOB-3039",
        description: "Tune-Up",
        dateTime: "2024-10-18 13:40",
        amount: 950
      },
      {
        id: "JOB-3044",
        description: "Chain Replacement",
        dateTime: "2024-10-21 09:15",
        amount: 1100
      },
      {
        id: "JOB-3049",
        description: "Full Service",
        dateTime: "2024-10-23 14:30",
        amount: 4000
      }
    ]
  }
};
