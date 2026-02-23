export type WorkshopStatus = "approved" | "pending" | "suspended" | "rejected";

export interface Workshop {
  id: string;
  name: string;
  owner: string;
  email: string;
  rating: number;
  jobs: number;
  status: WorkshopStatus;
}

export const workshopData: Workshop[] = [
  {
    id: "1",
    name: "Copenhagen Bike Repair",
    owner: "Anders Jensen",
    email: "anders@bikeshop.dk",
    jobs: 42,
    status: "approved",
    rating: 4.5
  },
  {
    id: "2",
    name: "City Cycle Fix",
    owner: "Maria Larsen",
    email: "maria@cyclefix.dk",
    jobs: 28,
    status: "pending",
    rating: 4.3
  },
  {
    id: "3",
    name: "Quick Bike Service",
    owner: "Jens Petersen",
    email: "jens@quickbike.dk",
    jobs: 15,
    status: "approved",
    rating: 4.2
  },
  {
    id: "4",
    name: "E-Bike Specialists",
    owner: "Lars Nielsen",
    email: "lars@ebike.dk",
    jobs: 35,
    status: "approved",
    rating: 4.9
  },
  {
    id: "5",
    name: "Bike Workshop Pro",
    owner: "Sofia Hansen",
    email: "sofia@bikepro.dk",
    jobs: 8,
    status: "pending",
    rating: 3.8
  },
  {
    id: "6",
    name: "Premium Repairs",
    owner: "Henrik Andersen",
    email: "henrik@premiumrepairs.dk",
    jobs: 52,
    status: "suspended",
    rating: 4.1
  },
  {
    id: "7",
    name: "Budget Bike Fix",
    owner: "Olivia Petersen",
    email: "olivia@budgetfix.dk",
    jobs: 3,
    status: "rejected",
    rating: 2.8
  }
];
