import type { z } from "zod";

import type { rescheduleFormSchema } from "@/app/(private)/user/bookings/components/reschedule-form/reschedule-form.schema";

export type RescheduleForm = z.infer<typeof rescheduleFormSchema>;
