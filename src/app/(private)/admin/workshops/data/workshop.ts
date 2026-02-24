export type WorkshopStatus = "approved" | "pending" | "suspended" | "rejected";
export type ServiceCategory =
  | "puncture-repair"
  | "brake-service"
  | "chain-replacement"
  | "general-tune-up"
  | "wheel-repair"
  | "drivetrain-service"
  | "suspension-service"
  | "custom-builds";
export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type OpeningHours = Partial<
  Record<
    DayOfWeek,
    | {
        open: string;
        close: string;
      }
    | "closed"
  >
>;

export interface PerformanceMetrics {
  jobsReceived: number;
  conversionRate: number;
  monthlyRevenue: number;
  platformFeePaid: number;
  averageReviewScore: number;
}

export interface WorkshopDetails {
  address: string;
  cvrNumber: string;
  serviceCategories: ServiceCategory[];
  openingHours: OpeningHours;
  performanceMetrics: PerformanceMetrics;
}

export interface Workshop {
  id: string;
  name: string;
  owner: string;
  email: string;
  rating: number;
  jobs: number;
  status: WorkshopStatus;
  details?: WorkshopDetails;
}

export const workshopData: Workshop[] = [
  {
    id: "1",
    name: "Copenhagen Bike Repair",
    owner: "Anders Jensen",
    email: "anders@bikeshop.dk",
    jobs: 42,
    status: "approved",
    rating: 4.5,
    details: {
      address: "Vesterbrogade 45, 1620 København V",
      cvrNumber: "DK12345678",
      serviceCategories: [
        "puncture-repair",
        "brake-service",
        "chain-replacement",
        "general-tune-up"
      ],
      openingHours: {
        monday: { open: "09:00", close: "18:00" },
        tuesday: { open: "09:00", close: "18:00" },
        wednesday: { open: "09:00", close: "18:00" },
        thursday: { open: "09:00", close: "20:00" },
        friday: { open: "09:00", close: "18:00" },
        saturday: { open: "10:00", close: "15:00" },
        sunday: "closed"
      },
      performanceMetrics: {
        jobsReceived: 42,
        conversionRate: 65,
        monthlyRevenue: 18500,
        platformFeePaid: 1850,
        averageReviewScore: 4.8
      }
    }
  },
  {
    id: "2",
    name: "City Cycle Fix",
    owner: "Maria Larsen",
    email: "maria@cyclefix.dk",
    jobs: 28,
    status: "pending",
    rating: 4.3,
    details: {
      address: "Nørrebrogade 123, 2200 København N",
      cvrNumber: "DK87654321",
      serviceCategories: ["wheel-repair", "drivetrain-service", "brake-service"],
      openingHours: {
        monday: { open: "09:00", close: "18:00" },
        tuesday: { open: "09:00", close: "18:00" },
        wednesday: { open: "09:00", close: "18:00" },
        thursday: { open: "09:00", close: "18:00" },
        friday: { open: "09:00", close: "18:00" },
        saturday: { open: "10:00", close: "16:00" },
        sunday: "closed"
      },
      performanceMetrics: {
        jobsReceived: 28,
        conversionRate: 58,
        monthlyRevenue: 12300,
        platformFeePaid: 1230,
        averageReviewScore: 4.3
      }
    }
  },
  {
    id: "3",
    name: "Quick Bike Service",
    owner: "Jens Petersen",
    email: "jens@quickbike.dk",
    jobs: 15,
    status: "approved",
    rating: 4.2,
    details: {
      address: "Strøget 45, 1200 København K",
      cvrNumber: "DK11223344",
      serviceCategories: ["puncture-repair", "general-tune-up"],
      openingHours: {
        monday: { open: "10:00", close: "19:00" },
        tuesday: { open: "10:00", close: "19:00" },
        wednesday: { open: "10:00", close: "19:00" },
        thursday: { open: "10:00", close: "19:00" },
        friday: { open: "10:00", close: "19:00" },
        saturday: { open: "11:00", close: "17:00" },
        sunday: "closed"
      },
      performanceMetrics: {
        jobsReceived: 15,
        conversionRate: 52,
        monthlyRevenue: 8500,
        platformFeePaid: 850,
        averageReviewScore: 4.2
      }
    }
  },
  {
    id: "4",
    name: "E-Bike Specialists",
    owner: "Lars Nielsen",
    email: "lars@ebike.dk",
    jobs: 35,
    status: "approved",
    rating: 4.9,
    details: {
      address: "Østerbrogade 200, 2100 København Ø",
      cvrNumber: "DK55667788",
      serviceCategories: [
        "suspension-service",
        "drivetrain-service",
        "custom-builds",
        "brake-service"
      ],
      openingHours: {
        monday: { open: "09:00", close: "18:00" },
        tuesday: { open: "09:00", close: "18:00" },
        wednesday: { open: "09:00", close: "18:00" },
        thursday: { open: "09:00", close: "20:00" },
        friday: { open: "09:00", close: "18:00" },
        saturday: { open: "10:00", close: "16:00" },
        sunday: "closed"
      },
      performanceMetrics: {
        jobsReceived: 35,
        conversionRate: 72,
        monthlyRevenue: 22000,
        platformFeePaid: 2200,
        averageReviewScore: 4.9
      }
    }
  },
  {
    id: "5",
    name: "Bike Workshop Pro",
    owner: "Sofia Hansen",
    email: "sofia@bikepro.dk",
    jobs: 8,
    status: "pending",
    rating: 3.8,
    details: {
      address: "Lygten 14, 2400 København NV",
      cvrNumber: "DK99888777",
      serviceCategories: ["brake-service", "chain-replacement"],
      openingHours: {
        monday: { open: "10:00", close: "18:00" },
        tuesday: { open: "10:00", close: "18:00" },
        wednesday: { open: "10:00", close: "18:00" },
        thursday: { open: "10:00", close: "18:00" },
        friday: { open: "10:00", close: "18:00" },
        saturday: "closed",
        sunday: "closed"
      },
      performanceMetrics: {
        jobsReceived: 8,
        conversionRate: 45,
        monthlyRevenue: 4500,
        platformFeePaid: 450,
        averageReviewScore: 3.8
      }
    }
  },
  {
    id: "6",
    name: "Premium Repairs",
    owner: "Henrik Andersen",
    email: "henrik@premiumrepairs.dk",
    jobs: 52,
    status: "suspended",
    rating: 4.1,
    details: {
      address: "Grønnegade 78, 1600 København V",
      cvrNumber: "DK44556677",
      serviceCategories: [
        "custom-builds",
        "suspension-service",
        "drivetrain-service",
        "wheel-repair"
      ],
      openingHours: {
        monday: { open: "08:00", close: "18:00" },
        tuesday: { open: "08:00", close: "18:00" },
        wednesday: { open: "08:00", close: "18:00" },
        thursday: { open: "08:00", close: "20:00" },
        friday: { open: "08:00", close: "18:00" },
        saturday: { open: "09:00", close: "17:00" },
        sunday: "closed"
      },
      performanceMetrics: {
        jobsReceived: 52,
        conversionRate: 68,
        monthlyRevenue: 25000,
        platformFeePaid: 2500,
        averageReviewScore: 4.1
      }
    }
  },
  {
    id: "7",
    name: "Budget Bike Fix",
    owner: "Olivia Petersen",
    email: "olivia@budgetfix.dk",
    jobs: 3,
    status: "rejected",
    rating: 2.8,
    details: {
      address: "Amagerbrogade 100, 2300 København S",
      cvrNumber: "DK33221100",
      serviceCategories: ["puncture-repair"],
      openingHours: {
        monday: { open: "11:00", close: "17:00" },
        tuesday: { open: "11:00", close: "17:00" },
        wednesday: "closed",
        thursday: { open: "11:00", close: "19:00" },
        friday: { open: "11:00", close: "17:00" },
        saturday: { open: "12:00", close: "16:00" },
        sunday: "closed"
      },
      performanceMetrics: {
        jobsReceived: 3,
        conversionRate: 30,
        monthlyRevenue: 1500,
        platformFeePaid: 150,
        averageReviewScore: 2.8
      }
    }
  }
];
