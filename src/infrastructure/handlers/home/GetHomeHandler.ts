import { Context } from "hono";

export class GetHomeHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      message: process.env.API_NAME || "World Cup Ticketing API" 
    }, 200);
  }
}
