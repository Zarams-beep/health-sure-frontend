import { MeetDoctorForm } from "@/types/auth";
import { z, ZodType } from "zod";

export const meetDoctorSchema: ZodType<MeetDoctorForm> = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    date: z.string().min(1, "Date of Birth is required"),
    department: z.string().min(1, "Select a department"),
    doctor: z.string().min(1, "Select a doctor"),
    message: z.string().min(1, "Message is required"),
  });
  