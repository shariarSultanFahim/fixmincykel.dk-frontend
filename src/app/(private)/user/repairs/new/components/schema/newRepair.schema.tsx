import { z } from "zod";

import { dateTimeSchema } from "./dateTime.schema";
import { detailsSchema } from "./details.schema";
import { informationSchema } from "./information.schema";
import { photoSchema } from "./photo.schema";
import { preferencesSchema } from "./preferences.schema";

export const newRepairSchema = z.object({
  details: detailsSchema,
  information: informationSchema,
  photos: photoSchema,
  dateTime: dateTimeSchema,
  preferences: preferencesSchema
});

export type NewRepair = z.infer<typeof newRepairSchema>;
