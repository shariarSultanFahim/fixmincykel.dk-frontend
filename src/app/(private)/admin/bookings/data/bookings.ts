export type Payment = "unpaid" | "paid" | "refunded";
export type Status = "cancle" | "booked" | "completed";

export interface BookingDetails {
  jobId: string;
  jobCategory: string;
  jobDescription: string;
  workshopName: string;
  workshopAddress: string;
  workshopPhone: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceDescription: string;
  serviceNotes: string;
}

export interface Booking {
  bookingID: string;
  user: string;
  workshop: string;
  status: Status;
  date: number;
  payment: Payment;
  amount: number;
  details?: BookingDetails;
}

export const bookingData: Booking[] = [
  {
    bookingID: "BK-2042",
    user: "Maria L.",
    workshop: "Copenhagen Bike Repair",
    status: "booked",
    date: 1697359200000,
    payment: "paid",
    amount: 450,
    details: {
      jobId: "JOB-2049",
      jobCategory: "Brakes",
      jobDescription: "Brake adjustment and new brake pads installation",
      workshopName: "Copenhagen Bike Repair",
      workshopAddress: "Vesterbrogade 45, 1620 København V",
      workshopPhone: "+45 11 22 33",
      userName: "Maria Larsen",
      userEmail: "maria@email.dk",
      userPhone: "+45 12 34 56",
      serviceDescription: "Brake adjustment and new brake pads installation",
      serviceNotes: "Customer requested morning appointment. Workshop confirmed availability."
    }
  },
  {
    bookingID: "BK-2041",
    user: "Jens P.",
    workshop: "City Cycle Fix",
    status: "completed",
    date: 1697445600000,
    payment: "paid",
    amount: 300,
    details: {
      jobId: "JOB-2050",
      jobCategory: "Puncture",
      jobDescription: "Flat tire repair and wheel inspection",
      workshopName: "City Cycle Fix",
      workshopAddress: "Nørrebrogade 123, 2200 København N",
      workshopPhone: "+45 98 76 54",
      userName: "Jens Petersen",
      userEmail: "jens@email.dk",
      userPhone: "+45 98 76 54",
      serviceDescription: "Puncture repair with new tire if needed",
      serviceNotes: "Repair completed successfully. Wheel is in good condition."
    }
  },
  {
    bookingID: "BK-2040",
    user: "Sofia M.",
    workshop: "Quick Bike Service",
    status: "completed",
    date: 1697532000000,
    payment: "paid",
    amount: 200,
    details: {
      jobId: "JOB-2051",
      jobCategory: "Chain",
      jobDescription: "Chain cleaning, lubrication and replacement",
      workshopName: "Quick Bike Service",
      workshopAddress: "Strøget 45, 1200 København K",
      workshopPhone: "+45 55 66 77",
      userName: "Sofia Karlsson",
      userEmail: "sofia@email.dk",
      userPhone: "+45 55 66 77",
      serviceDescription: "Complete chain service with cleaning and lubrication",
      serviceNotes: "Chain was very rusty. Replaced with new high-quality chain."
    }
  },
  {
    bookingID: "BK-2039",
    user: "Lars N.",
    workshop: "E-Bike Specialists",
    status: "booked",
    date: 1697618400000,
    payment: "unpaid",
    amount: 350,
    details: {
      jobId: "JOB-2052",
      jobCategory: "E-Bike Service",
      jobDescription: "Battery diagnostic and potential repair or replacement",
      workshopName: "E-Bike Specialists",
      workshopAddress: "Østerbrogade 200, 2100 København Ø",
      workshopPhone: "+45 22 33 44",
      userName: "Lars Nielsen",
      userEmail: "lars@email.dk",
      userPhone: "+45 22 33 44",
      serviceDescription: "E-bike battery diagnostic, repair or replacement if needed",
      serviceNotes: "Battery may need replacement. Specialist to assess on site."
    }
  },
  {
    bookingID: "BK-2038",
    user: "Emma R.",
    workshop: "Premium Repairs",
    status: "completed",
    date: 1697704800000,
    payment: "refunded",
    amount: 500,
    details: {
      jobId: "JOB-2053",
      jobCategory: "General Tune-up",
      jobDescription: "Full bike maintenance and tune-up",
      workshopName: "Premium Repairs",
      workshopAddress: "Grønnegade 78, 1600 København V",
      workshopPhone: "+45 44 55 66",
      userName: "Emma Rasmussen",
      userEmail: "emma@email.dk",
      userPhone: "+45 44 55 66",
      serviceDescription: "Complete tune-up with all checks and adjustments",
      serviceNotes: "Booking was cancelled due to workshop closure. Full refund issued."
    }
  }
];
