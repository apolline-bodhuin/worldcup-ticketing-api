import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Team } from "@domain/entities/Team";
import { MatchStage } from "@domain/types/MatchStage";
import { HTTPException } from "hono/http-exception";

export class GetTeamMatchsByStageHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase();
    const stage = c.req.param("stage");

    if (!Object.values(MatchStage).includes(stage as MatchStage)) {
      throw new HTTPException(400, { message: "Phase de tournoi (stage) invalide" });
    }

    const teamRepo = AppDataSource.getRepository(Team);
    const team = await teamRepo.findOneBy({ code: fifaCode });
    if (!team) {
      throw new HTTPException(404, { message: "Équipe introuvable" });
    }

    const matchRepo = AppDataSource.getRepository(Match);
    const matchs = await matchRepo.find({
      where: [
        { homeTeam: { code: fifaCode }, stage: stage },
        { awayTeam: { code: fifaCode }, stage: stage }
      ],
      relations: ["homeTeam", "awayTeam", "stadium"]
    });

    return c.json(matchs, 200);
  }
}
