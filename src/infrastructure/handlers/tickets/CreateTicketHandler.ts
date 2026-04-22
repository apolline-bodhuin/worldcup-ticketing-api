import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Ticket } from "@domain/entities/Ticket";
import { HTTPException } from "hono/http-exception";
import { CreateTicketSchema } from "./CreateTicketSchema";

export class CreateTicketHandler {
  async handle(c: Context) {
    try {
      const body = await c.req.json();
      
      const parsedResult = CreateTicketSchema.safeParse(body);
      
      if (!parsedResult.success) {
        throw new HTTPException(400, { message: "Can't create ticket (wrong or missing values)" });
      }

      const { matchId, seat, customer } = parsedResult.data;

      const ticketRepo = AppDataSource.getRepository(Ticket);
      const matchRepo = AppDataSource.getRepository(Match);

      const match = await matchRepo.findOneBy({ id: matchId });
      if (!match) {
        throw new HTTPException(404, { message: `Match ${matchId} does not exist` });
      }

      const existing = await ticketRepo.findOne({
        where: { match: { id: matchId }, seat: seat }
      });

      if (existing) {
        throw new HTTPException(409, { message: `Seat '${seat}' is already taken for match ${matchId}` });
      }

      const ticket = new Ticket(
        seat,
        customer.firstname,
        customer.lastname,
        customer.email,
        match
      );

      const savedTicket = await ticketRepo.save(ticket);

      return c.json({
        success: true,
        message: "Ticket created",
        data: {
          matchId: match.id,
          seat: savedTicket.seat,
          holder: {
            firstName: savedTicket.customerFirstname,
            lastName: savedTicket.customerLastname,
            email: savedTicket.customerEmail
          }
        }
      }, 201);

    } catch (error: any) {
      if (error instanceof HTTPException) throw error;
      
      if (error instanceof Error && (error.message.includes("vide") || error.message.includes("positif"))) {
        throw new HTTPException(400, { message: error.message });
      }
      
      console.error("🚨 SQL Error:", error.message);
      throw new HTTPException(500, { message: "Erreur interne" });
    }
  }
}