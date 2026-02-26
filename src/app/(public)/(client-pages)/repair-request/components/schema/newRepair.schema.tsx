import { z } from "zod";

import { dateTimeSchema } from "./dateTime.schema";
import { detailsSchema } from "./details.schema";
import { informationSchema } from "./information.schema";
import { locationSchema } from "./location.schema";
import { photoSchema } from "./photo.schema";

export const newRepairSchema = z.object({
  details: detailsSchema,
  information: informationSchema,
  photos: photoSchema,
  dateTime: dateTimeSchema,
  location: locationSchema
});

export type NewRepair = z.infer<typeof newRepairSchema>;
