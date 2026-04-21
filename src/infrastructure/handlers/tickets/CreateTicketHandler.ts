import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "../../database/AppDataSource";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { CreateTicketSchema } from "./CreateTicketSchema";

export class CreateTicketHandler {
  async handle(c: Context) {
    const body = await c.req.json();

    const result = CreateTicketSchema.safeParse(body);
    if (!result.success) {
      throw new HTTPException(400, { message: "Can't create ticket (wrong or missing values)" });
    }

    const { matchId, seat, customer } = result.data;

    const matchRepo = AppDataSource.getRepository(Match);
    const ticketRepo = AppDataSource.getRepository(Ticket);

    const match = await matchRepo.findOneBy({ id: matchId });
    if (!match) {
      throw new HTTPException(404, { message: `Match ${matchId} does not exist` });
    }

    const existingTicket = await ticketRepo.findOneBy({ match: { id: matchId }, seat });
    if (existingTicket) {
      throw new HTTPException(409, { message: `Seat '${seat}' is already taken for match ${matchId}` });
    }

    const newTicket = ticketRepo.create({
      match,
      seat,
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
    });

    const savedTicket = await ticketRepo.save(newTicket);

    return c.json({
      success: true,
      message: "Ticket created",
      data: {
        id: savedTicket.id,
        seat: savedTicket.seat,
        customer: {
          email: savedTicket.email
        },
        match: {
          id: savedTicket.match.id
        }
      }
    }, 201);
  }
}