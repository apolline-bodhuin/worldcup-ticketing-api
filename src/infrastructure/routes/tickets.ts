import { Hono } from "hono";
import { CreateTicketHandler } from "../handlers/tickets/CreateTicketHandler";

const ticketsRouter = new Hono();

ticketsRouter.post("/", (c) => new CreateTicketHandler().handle(c));

export { ticketsRouter };
