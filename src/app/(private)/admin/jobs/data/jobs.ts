export type Category = "brakes" | "puncture" | "chain" | "general-tune-up" | "e-bike-service";
export type Status = "pending" | "booked" | "completed";
export type OfferStatus = "pending" | "accepted" | "rejected";

export interface Photo {
  id: string;
  url: string;
}

export interface Offer {
  id: string;
  workshop: string;
  price: number;
  status: OfferStatus;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export interface JobDetails {
  userFullName: string;
  description: string;
  photos: Photo[];
  offers: Offer[];
  chatHistory: ChatMessage[];
}

export interface Job {
  jobId: string;
  user: string;
  offers: string;
  status: Status;
  createdAt: number;
  category: Category;
  details?: JobDetails;
}

export const jobData: Job[] = [
  {
    jobId: "JOB-2049",
    user: "Maria L.",
    offers: "3",
    status: "pending",
    createdAt: 1697359200000,
    category: "brakes",
    details: {
      userFullName: "Maria Larsen",
      description:
        "My bike brakes are making a squeaking noise and don't seem to be as responsive as they used to be. I think they need adjustment or possibly new brake pads.",
      photos: [
        { id: "1", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=JaneSmith" },
        { id: "2", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=JohnDoe" }
      ],
      offers: [
        {
          id: "OFF-1",
          workshop: "Copenhagen Bike Repair",
          price: 350,
          status: "pending",
          message: "We can fix this today. High-quality brake pads included."
        },
        {
          id: "OFF-2",
          workshop: "City Cycle Fix",
          price: 300,
          status: "pending",
          message: "Same-day service available. Free pickup within 2km."
        },
        {
          id: "OFF-3",
          workshop: "Quick Bike Service",
          price: 400,
          status: "pending",
          message: "Premium brake pads with 1-year warranty."
        }
      ],
      chatHistory: [
        {
          id: "MSG-1",
          sender: "Maria Larsen",
          message: "How soon can you complete this?",
          timestamp: "2024-10-15 10:30"
        },
        {
          id: "MSG-2",
          sender: "City Cycle Fix",
          message: "We can do it this afternoon if you bring it in by 2 PM.",
          timestamp: "2024-10-15 10:45"
        }
      ]
    }
  },
  {
    jobId: "JOB-2050",
    user: "Anders M.",
    offers: "1",
    status: "booked",
    createdAt: 1697445600000,
    category: "puncture",
    details: {
      userFullName: "Anders Mortensen",
      description:
        "Got a flat tire on my commute. Need it repaired ASAP. The wheel is damaged and may need replacement.",
      photos: [{ id: "1", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=AndersMortensen" }],
      offers: [
        {
          id: "OFF-4",
          workshop: "E-Bike Specialists",
          price: 200,
          status: "accepted",
          message: "Quick repair available. Wheel inspection included."
        }
      ],
      chatHistory: [
        {
          id: "MSG-3",
          sender: "Anders Mortensen",
          message: "Is the wheel damaged beyond repair?",
          timestamp: "2024-10-16 09:15"
        },
        {
          id: "MSG-4",
          sender: "E-Bike Specialists",
          message: "We'll inspect it when you bring it in. Likely just a puncture.",
          timestamp: "2024-10-16 09:30"
        }
      ]
    }
  },
  {
    jobId: "JOB-2051",
    user: "Sofia K.",
    offers: "2",
    status: "completed",
    createdAt: 1697532000000,
    category: "chain",
    details: {
      userFullName: "Sofia Karlsson",
      description:
        "My chain is rusty and keeps slipping. Needs cleaning and lubrication at minimum, replacement if necessary.",
      photos: [
        { id: "1", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=SofiaKarlsson1" },
        { id: "2", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=SofiaKarlsson2" }
      ],
      offers: [
        {
          id: "OFF-5",
          workshop: "Premium Repairs",
          price: 250,
          status: "rejected",
          message: "We can clean and lubricate or replace the chain."
        },
        {
          id: "OFF-6",
          workshop: "Bike Workshop Pro",
          price: 180,
          status: "accepted",
          message: "Complete chain service with cleaning and lubrication."
        }
      ],
      chatHistory: [
        {
          id: "MSG-5",
          sender: "Sofia Karlsson",
          message: "How long will it take?",
          timestamp: "2024-10-17 14:20"
        },
        {
          id: "MSG-6",
          sender: "Bike Workshop Pro",
          message: "About 30 minutes for cleaning and lubrication.",
          timestamp: "2024-10-17 14:35"
        }
      ]
    }
  },
  {
    jobId: "JOB-2052",
    user: "Jens P.",
    offers: "1",
    status: "pending",
    createdAt: 1697618400000,
    category: "general-tune-up",
    details: {
      userFullName: "Jens Petersen",
      description:
        "General maintenance needed. Oil the chain, check brakes, adjust gears, and ensure everything is working smoothly.",
      photos: [{ id: "1", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=JensPetersen" }],
      offers: [
        {
          id: "OFF-7",
          workshop: "Quick Bike Service",
          price: 150,
          status: "pending",
          message: "Standard tune-up package with all checks included."
        }
      ],
      chatHistory: [
        {
          id: "MSG-7",
          sender: "Jens Petersen",
          message: "Do you offer a discount for regular maintenance?",
          timestamp: "2024-10-18 11:00"
        }
      ]
    }
  },
  {
    jobId: "JOB-2053",
    user: "Emma R.",
    offers: "0",
    status: "pending",
    createdAt: 1697704800000,
    category: "e-bike-service",
    details: {
      userFullName: "Emma Rasmussen",
      description:
        "E-bike battery not holding charge as long as it used to. Need professional diagnostic and possible repair or replacement.",
      photos: [
        { id: "1", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=EmmaRasmussen1" },
        { id: "2", url: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=EmmaRasmussen2" }
      ],
      offers: [],
      chatHistory: []
    }
  }
];
