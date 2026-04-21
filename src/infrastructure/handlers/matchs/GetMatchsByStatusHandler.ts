import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { MatchStatus } from "@domain/types/MatchStatus";

export class GetMatchsByStatusHandler {
  async handle(c: Context) {
    const status = c.req.param("status") as MatchStatus;
    const matchRepository = AppDataSource.getRepository(Match);

    const matchs = await matchRepository.find({
      where: { status },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    });

    return c.json({
      success: true,
      message: `Matchs with status: ${status}`,
      data: matchs
    }, 200);
  }
}