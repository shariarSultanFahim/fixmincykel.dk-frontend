import { z } from "zod";

export function createRegisterSchema() {
  return z.object({
    workshopName: z.string().min(2, "Workshop name must be at least 2 characters"),
    cvrNumber: z.string().min(8, "CVR number must be at least 8 characters"),
    address: z.string().min(3, "Address must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    latitude: z
      .number({ message: "Please choose your workshop location" })
      .min(-90, "Latitude is invalid")
      .max(90, "Latitude is invalid"),
    longitude: z
      .number({ message: "Please choose your workshop location" })
      .min(-180, "Longitude is invalid")
      .max(180, "Longitude is invalid")
  });
}

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;
