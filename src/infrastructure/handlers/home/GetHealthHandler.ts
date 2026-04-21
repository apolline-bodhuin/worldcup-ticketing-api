import { Context } from "hono";

export class GetHealthHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      message: process.env.API_NAME || "World Cup Ticketing API",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      status: "OK",
      version: process.env.API_VERSION || "1.0.0"
    }, 200);
  }
}