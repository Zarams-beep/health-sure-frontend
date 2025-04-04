import { z } from "zod";

export const basicInfoSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    DOB: z.string().min(1, "Date of Birth is required"),
    Age: z.string().min(1, "Age is required"),
    Gender: z.enum(["Male", "Female", "Other"]),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number cannot exceed 15 digits"),
    email: z.string().email("Invalid email format"),
    HouseAddress: z.string().min(5, "Address must be at least 5 characters"),
    EmergencyNumber: z.string().min(10, "Emergency number must be at least 10 digits").max(15, "Emergency number cannot exceed 15 digits"),
    NextOfKinName: z.string().min(3, "Next of Kin Name must be at least 3 characters"),
    NextOfKinGender: z.enum(["Male", "Female", "Other"]),
    NextOfKinPhoneNumber: z.string().min(10, "Next of Kin phone number must be at least 10 digits").max(15, "Next of Kin phone number cannot exceed 15 digits"),
    NextOfKinEmailAddress: z.string().email("Invalid email format"),
});
