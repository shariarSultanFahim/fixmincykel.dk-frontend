import type { Booking } from "@/types";

export const upcomingBookings: Booking[] = [
  {
    id: "booking-2048",
    title: "Brake Squeaking",
    jobId: "JOB-2048",
    scheduledAt: "2026-02-23T09:00:00+01:00",
    priceDkk: 350,
    workshop: {
      name: "Copenhagen Bike Repair",
      address: "Noerrebrogade 42, 2200 Kobenhavn N",
      phone: "+45 12 34 56 78",
      email: "contact@copenhagenbike.dk"
    },
    status: "upcoming"
  }
];

export const pastBookings: Booking[] = [
  {
    id: "booking-2045",
    title: "Flat Tire Repair",
    jobId: "JOB-2045",
    scheduledAt: "2026-01-28T14:00:00+01:00",
    priceDkk: 150,
    workshop: {
      name: "City Cycle Fix",
      address: "Vesterbrogade 12, 1620 Kobenhavn V",
      phone: "+45 22 11 45 90",
      email: "hello@citycyclefix.dk"
    },
    status: "completed"
  },
  {
    id: "booking-2042",
    title: "Chain Replacement",
    jobId: "JOB-2042",
    scheduledAt: "2026-01-20T11:30:00+01:00",
    priceDkk: 250,
    workshop: {
      name: "Quick Bike Service",
      address: "Amagerbrogade 18, 2300 Kobenhavn S",
      phone: "+45 33 98 77 66",
      email: "support@quickbike.dk"
    },
    status: "completed"
  }
];
