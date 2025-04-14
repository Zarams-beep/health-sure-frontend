import { z } from "zod";

export const labResultsSchema = z.object({
    testResults: z.array(
      z.object({
        testName: z.string().min(1, "Test name is required").or(z.literal("")),
        result: z.string().min(1, "Result is required").or(z.literal("")),
        date: z.string().min(1, "Date is required").or(z.literal("")),
      })
    ).optional(),
    medicalReports: z.array(
      z.object({
        title: z.string().min(1, "Title is required").or(z.literal("")),
        url: z.string().url("Invalid URL format").or(z.literal("")),
      })
    ).optional(),
  });