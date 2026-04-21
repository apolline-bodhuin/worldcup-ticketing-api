import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Team } from "@domain/entities/Team";
import { HTTPException } from "hono/http-exception";

export class GetTeamMatchsByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode");

    const teamRepo = AppDataSource.getRepository(Team);
    const team = await teamRepo.findOneBy({ code: fifaCode.toUpperCase() });
    
    if (!team) {
      throw new HTTPException(404, { message: "Équipe introuvable" });
    }

    const matchRepo = AppDataSource.getRepository(Match);
    const matchs = await matchRepo.find({
      where: [
        { homeTeam: { code: fifaCode.toUpperCase() } },
        { awayTeam: { code: fifaCode.toUpperCase() } }
      ],
      relations: ["homeTeam", "awayTeam", "stadium"]
    });

    return c.json(matchs, 200);
  }
}
