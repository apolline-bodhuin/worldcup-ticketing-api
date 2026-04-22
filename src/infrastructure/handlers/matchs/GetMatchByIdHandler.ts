import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { HTTPException } from "hono/http-exception";

export class GetMatchByIdHandler {
  async handle(c: Context) {
    const id = parseInt(c.req.param("id"));

    if (isNaN(id)) {
      throw new HTTPException(400, { message: "Invalid match ID format" });
    }

    const matchRepository = AppDataSource.getRepository(Match);

    const match = await matchRepository.findOne({
      where: { id },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    });

    if (!match) {
      return c.json({ 
        success: false, 
        error: `Match ${id} does not exist` 
      }, 404);
    }

    return c.json({
      success: true,
      message: `Match ${match.id}`,
      data: match
    }, 200);
  }
}