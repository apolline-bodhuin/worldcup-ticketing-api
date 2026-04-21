import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { HTTPException } from "hono/http-exception";

export class GetMatchByIdHandler {
  async handle(c: Context) {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) throw new HTTPException(400, { message: "Invalid ID" });

    const matchRepo = AppDataSource.getRepository(Match);
    const match = await matchRepo.findOne({
      where: { id },
      relations: ["homeTeam", "awayTeam", "stadium"]
    });

    if (!match) throw new HTTPException(404, { message: "Match introuvable" });
    return c.json(match, 200);
  }
}
