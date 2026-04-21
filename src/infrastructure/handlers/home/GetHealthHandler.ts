import { Context } from "hono";

export class GetHealthHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      status: "OK",
      version: process.env.API_VERSION || "1.0.0"
    }, 200);
  }
}
