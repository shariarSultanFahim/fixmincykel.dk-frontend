export type UserStatus = "active" | "pending" | "banned";
export type JobStatus = "pending" | "completed" | "in-progress" | "cancelled";
export type BookingStatus = "booked" | "completed" | "cancelled" | "no-show";

export interface Job {
  id: string;
  category: string;
  status: JobStatus;
  created: string;
}

export interface Booking {
  id: string;
  workshop: string;
  dateTime: string;
  status: BookingStatus;
  amount: string;
}

export interface Review {
  workshop: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserDetails {
  address: string;
  city: string;
  zipcode: string;
  jobHistory: Job[];
  bookingHistory: Booking[];
  reviews: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobsCreated: number;
  status: UserStatus;
  registered: string;
  details?: UserDetails;
}

export const usersData: User[] = [
  {
    id: "1",
    name: "Maria Larsen",
    email: "maria@email.dk",
    phone: "+45 12 34 56",
    jobsCreated: 8,
    status: "active",
    registered: "2024-08-15",
    details: {
      address: "Nørrebrogade 123, 2200 København N",
      city: "København N",
      zipcode: "2200",
      jobHistory: [
        {
          id: "JOB-2049",
          category: "Brakes",
          status: "pending",
          created: "2024-10-15"
        },
        {
          id: "JOB-2031",
          category: "Puncture",
          status: "completed",
          created: "2024-09-28"
        },
        {
          id: "JOB-2012",
          category: "Chain",
          status: "completed",
          created: "2024-09-10"
        }
      ],
      bookingHistory: [
        {
          id: "BK-2042",
          workshop: "Copenhagen Bike Repair",
          dateTime: "2024-10-16 09:00",
          status: "booked",
          amount: "DKK 450"
        },
        {
          id: "BK-2025",
          workshop: "City Cycle Fix",
          dateTime: "2024-09-29 14:00",
          status: "completed",
          amount: "DKK 200"
        }
      ],
      reviews: [
        {
          workshop: "Copenhagen Bike Repair",
          rating: 5,
          comment: "Fast service!",
          date: "2024-10-16"
        },
        {
          workshop: "City Cycle Fix",
          rating: 4,
          comment: "Good work, slightly delayed.",
          date: "2024-09-30"
        }
      ]
    }
  },
  {
    id: "2",
    name: "Jens Petersen",
    email: "jens@email.dk",
    phone: "+45 98 76 54",
    jobsCreated: 3,
    status: "active",
    registered: "2024-09-22",
    details: {
      address: "Strøget 45, 1200 København K",
      city: "København K",
      zipcode: "1200",
      jobHistory: [
        {
          id: "JOB-2050",
          category: "Gear",
          status: "completed",
          created: "2024-10-18"
        },
        {
          id: "JOB-2035",
          category: "Wheel",
          status: "completed",
          created: "2024-09-25"
        },
        {
          id: "JOB-2020",
          category: "Brakes",
          status: "completed",
          created: "2024-09-12"
        }
      ],
      bookingHistory: [
        {
          id: "BK-2051",
          workshop: "Cycle Pro",
          dateTime: "2024-10-20 10:30",
          status: "booked",
          amount: "DKK 350"
        }
      ],
      reviews: [
        {
          workshop: "Cycle Pro",
          rating: 5,
          comment: "Excellent service!",
          date: "2024-10-14"
        }
      ]
    }
  },
  {
    id: "3",
    name: "Lars Nielsen",
    email: "lars@email.dk",
    phone: "+45 55 66 77",
    jobsCreated: 1,
    status: "pending",
    registered: "2024-10-05",
    details: {
      address: "Vesterbrogade 10, 1620 København V",
      city: "København V",
      zipcode: "1620",
      jobHistory: [
        {
          id: "JOB-2045",
          category: "Tire",
          status: "pending",
          created: "2024-10-17"
        }
      ],
      bookingHistory: [],
      reviews: []
    }
  },
  {
    id: "4",
    name: "Anna Jensen",
    email: "anna@email.dk",
    phone: "+45 22 33 44",
    jobsCreated: 0,
    status: "banned",
    registered: "2024-06-18",
    details: {
      address: "Østerbrogade 200, 2100 København Ø",
      city: "København Ø",
      zipcode: "2100",
      jobHistory: [],
      bookingHistory: [],
      reviews: []
    }
  }
];
