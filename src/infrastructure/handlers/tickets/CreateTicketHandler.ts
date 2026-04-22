import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Ticket } from "@domain/entities/Ticket";
import { HTTPException } from "hono/http-exception";

export class CreateTicketHandler {
  async handle(c: Context) {
    try {
      const body = await c.req.json();
      
      const matchId = parseInt(body.matchId);
      const seat = body.seat;
      const customer = body.customer;

      if (isNaN(matchId) || !seat || !customer?.name || !customer?.email) {
        throw new HTTPException(400, { message: "Can't create ticket (wrong or missing values)" });
      }

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

      const ticket = ticketRepo.create({
        seat: seat,
        price: Number(body.price) || 50,
        customerName: customer.name,
        customerEmail: customer.email,
        match: match
      });

      const savedTicket = await ticketRepo.save(ticket);

      return c.json({
        success: true,
        message: "Ticket created",
        data: {
          id: savedTicket.id,
          seat: savedTicket.seat,
          price: savedTicket.price,
          customer: {
            name: savedTicket.customerName,
            email: savedTicket.customerEmail
          },
          match: { id: match.id }
        }
      }, 201);

    } catch (error: any) {
      if (error instanceof HTTPException) throw error;
      
      console.error("🚨 SQL Error:", error.message);
      throw new HTTPException(500, { message: "Erreur interne" });
    }
  }
}