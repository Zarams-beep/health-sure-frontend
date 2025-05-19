// Treatment Info Schema
import { z } from "zod";

export const treatmentInfoSchema = z.object({
    assignedDoctor: z.object({
        name: z.string(),
        specialization: z.string(),
        contact: z.string(),
    }),
    treatmentPlans: z.array(z.string().min(1, "Treatment plan cannot be empty")),
    upcomingAppointments: z.array(z.object({
        date: z.string().min(1, "Appointment date is required"),
        time: z.string().min(1, "Appointment time is required"),
        location: z.string().min(1, "Location is required"),
    })),
});
