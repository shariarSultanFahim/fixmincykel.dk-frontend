export type FeeStatus = "paid" | "pending";

export interface WorkshopFinancial {
  id: string;
  name: string;
  totalRevenue: number;
  platformFeePercentage: number;
  platformFee: number;
  dateTime: number;
  feeStatus: FeeStatus;
}

export interface PaymentMetrics {
  totalOrdersProcessed: number;
  invoicesSent: number;
  totalPlatformFeesCollected: number;
}

export const paymentMetrics: PaymentMetrics = {
  totalOrdersProcessed: 1842,
  invoicesSent: 147,
  totalPlatformFeesCollected: 24850
};

export const workshopFinancialData: WorkshopFinancial[] = [
  {
    id: "WS-001",
    name: "Copenhagen Bike Repair",
    totalRevenue: 18500,
    platformFeePercentage: 10,
    platformFee: 1850,
    dateTime: 1719331200000, // 2024-10-16 09:00
    feeStatus: "paid"
  },
  {
    id: "WS-002",
    name: "City Cycle Fix",
    totalRevenue: 12300,
    platformFeePercentage: 10,
    platformFee: 1230,
    dateTime: 1718953200000, // 2024-10-15 11:00
    feeStatus: "pending"
  },
  {
    id: "WS-003",
    name: "E-Bike Specialists",
    totalRevenue: 22100,
    platformFeePercentage: 10,
    platformFee: 2210,
    dateTime: 1718608800000, // 2024-10-14 15:30
    feeStatus: "pending"
  },
  {
    id: "WS-004",
    name: "Quick Bike Service",
    totalRevenue: 8900,
    platformFeePercentage: 10,
    platformFee: 890,
    dateTime: 1718349600000, // 2024-10-17 10:00
    feeStatus: "paid"
  }
];
