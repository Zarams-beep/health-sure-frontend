import { ContactUsFormData } from "@/types/auth";
import { z, ZodType } from "zod";

// Schema validation using Zod
export const contactUsSchema: ZodType<ContactUsFormData> = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  subject: z.string().min(1, "Subject selection is required"),
  message: z.string().min(1, "Message is required"),
});