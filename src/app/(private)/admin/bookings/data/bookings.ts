export type Payment = "unpaid" | "paid" | "refunded";
export type Status = "cancle" | "booked" | "completed";

export interface Booking {
  bookingID: string;
  user: string;
  workshop: string;
  status: Status;
  date: number;
  payment: Payment;
  amount: number;
}

export const bookingData: Booking[] = [
  {
    bookingID: "BK-2042",
    user: "Maria L.",
    workshop: "Copenhagen Bike Repair",
    status: "booked",
    date: 1678886400000,
    payment: "paid",
    amount: 150
  },
  {
    bookingID: "BK-2041",
    user: "Jens P.",
    workshop: "City Cycle Fix",
    status: "completed",
    date: 1678972800000,
    payment: "paid",
    amount: 200
  },
  {
    bookingID: "BK-2040",
    user: "Sofia M.",
    workshop: "Quick Bike Service",
    status: "completed",
    date: 1679059200000,
    payment: "paid",
    amount: 350
  },
  {
    bookingID: "BK-2039",
    user: "Lars N.",
    workshop: "E-Bike Specialists",
    status: "booked",
    date: 1679145600000,
    payment: "unpaid",
    amount: 600
  },
  {
    bookingID: "BK-2038",
    user: "Anna J.",
    workshop: "Copenhagen Bike Repair",
    status: "cancle",
    date: 1679232000000,
    payment: "refunded",
    amount: 250
  }
];
