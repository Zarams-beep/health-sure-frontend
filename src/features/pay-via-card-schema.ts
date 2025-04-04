import { z } from "zod";

export const payViaCardSchema = z.object({
    cardNumber: z.string()
    .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Card number must be in XXXX-XXXX-XXXX-XXXX format"),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: z.string()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  saveCard: z.boolean().default(false),
});

// TypeScript type
export type PayViaCard = z.infer<typeof payViaCardSchema>;
