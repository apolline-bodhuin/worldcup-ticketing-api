import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/types/MatchStage";
import { HTTPException } from "hono/http-exception";

export class GetMatchsByStageHandler {
  async handle(c: Context) {
    const stage = c.req.param("stage");
    if (!Object.values(MatchStage).includes(stage as MatchStage)) {
      throw new HTTPException(400, { message: "Stage invalide" });
    }

    const matchRepo = AppDataSource.getRepository(Match);
    const matchs = await matchRepo.find({
      where: { stage },
      relations: ["homeTeam", "awayTeam", "stadium"]
    });
    return c.json(matchs, 200);
  }
}
