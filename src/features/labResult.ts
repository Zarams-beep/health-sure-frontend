import { z } from "zod";

// Lab Results Schema
export const labResultsSchema = z.object({
    testResults: z.array(z.object({
        testName: z.string().min(1, "Test name is required"),
        result: z.string().min(1, "Result is required"),
        date: z.string().min(1, "Date is required"), // You can add regex for date validation if needed
    })),
    medicalReports: z.array(z.object({
        title: z.string().min(1, "Report title is required"),
        url: z.string().url("Invalid URL format"),
    })),
});