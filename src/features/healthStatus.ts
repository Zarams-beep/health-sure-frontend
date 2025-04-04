import { z } from "zod";
export const healthStatusSchema = z.object({
  healthCondition: z.string().min(1, "Health condition is required"),
  vitalSigns: z.object({
    bloodPressure:z.number(),
    heartRate: z.number(),
    temperature: z.number(),
    sugar: z.number(),
    oxygen: z.number(),
    cholesterol: z.number(),
    BMI: z.number(),
  }),
  allergies: z.array(z.string()),
});
