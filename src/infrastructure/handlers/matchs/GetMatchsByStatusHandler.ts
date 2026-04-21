import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { MatchStatus } from "@domain/types/MatchStatus";
import { HTTPException } from "hono/http-exception";

export class GetMatchsByStatusHandler {
  async handle(c: Context) {
    const status = c.req.param("status");

    if (!Object.values(MatchStatus).includes(status as MatchStatus)) {
      throw new HTTPException(400, { message: "Statut invalide" });
    }

    const matchRepo = AppDataSource.getRepository(Match);
    const matchs = await matchRepo.find({
      where: { status },
      relations: ["homeTeam", "awayTeam", "stadium"]
    });

    return c.json(matchs, 200);
  }
}
