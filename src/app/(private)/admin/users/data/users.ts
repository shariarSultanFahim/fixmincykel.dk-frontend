export type UserStatus = "active" | "pending" | "banned";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobsCreated: number;
  status: UserStatus;
  registered: string;
}

export const usersData: User[] = [
  {
    id: "1",
    name: "Maria Larsen",
    email: "maria@email.dk",
    phone: "+45 12 34 56",
    jobsCreated: 8,
    status: "active",
    registered: "2024-08-15"
  },
  {
    id: "2",
    name: "Jens Petersen",
    email: "jens@email.dk",
    phone: "+45 98 76 54",
    jobsCreated: 3,
    status: "active",
    registered: "2024-09-22"
  },
  {
    id: "3",
    name: "Lars Nielsen",
    email: "lars@email.dk",
    phone: "+45 55 66 77",
    jobsCreated: 1,
    status: "pending",
    registered: "2024-10-05"
  },
  {
    id: "4",
    name: "Anna Jensen",
    email: "anna@email.dk",
    phone: "+45 22 33 44",
    jobsCreated: 0,
    status: "banned",
    registered: "2024-06-18"
  }
];
