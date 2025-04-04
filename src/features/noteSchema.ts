import { z } from "zod";
// Notes Schema
export const notesSchema = z.object({
    doctorNotes: z.array(z.string().min(1, "Doctor note cannot be empty")),
    caregiverComments: z.array(z.string().min(1, "Caregiver comment cannot be empty")),
});
