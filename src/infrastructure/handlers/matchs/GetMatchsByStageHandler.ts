import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/types/MatchStage";

export class GetMatchsByStageHandler {
  async handle(c: Context) {
    const stage = c.req.param("stage") as MatchStage;
    const matchRepository = AppDataSource.getRepository(Match);

    const matchs = await matchRepository.find({
      where: { stage },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    });

    return c.json({
      success: true,
      message: `Matchs at stage ${stage}`,
      data: matchs
    }, 200);
  }
}