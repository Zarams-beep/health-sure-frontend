import { z } from "zod";

export const OptSchemaEmail = z.object({
   email: z
    .string()
    .min(1, "Email is required")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
})

export const OptSchemaPin = z.object({
   otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type OPTEmailData = z.infer<typeof OptSchemaEmail>
export type OPTPinData = z.infer<typeof OptSchemaPin>