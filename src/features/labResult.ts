import { z } from "zod";
export const labResultsSchema = z.object({
  testResults: z.array(
    z.object({
      testName: z.string(),
      result: z.string(),
      date: z.string()
    })
  ),
  medicalReports: z.array(
    z.object({
      title: z.string(),
      url: z.string()
    })
  )
});
export type LabResults = z.infer<typeof labResultsSchema>;