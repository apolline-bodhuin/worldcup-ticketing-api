import { z } from "zod";

export const CreateTicketSchema = z.object({
  matchId: z.number().int().positive(),
  seat: z.string().min(1).max(10),
  customer: z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    email: z.string().email(),
  }),
});
