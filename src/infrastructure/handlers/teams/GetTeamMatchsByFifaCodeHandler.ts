import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Team } from "@domain/entities/Team";
import { HTTPException } from "hono/http-exception";

export class GetTeamMatchsByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase();

    if (fifaCode.length !== 3) {
      throw new HTTPException(400, { message: `Invalid FIFA code: "${fifaCode}"` });
    }

    const teamRepo = AppDataSource.getRepository(Team);
    
    const team = await teamRepo.findOne({
      where: { code: fifaCode as any }
    });

    if (!team) {
      throw new HTTPException(404, { message: `Team ${fifaCode} does not exist` });
    }

    const matchRepo = AppDataSource.getRepository(Match);

    const matchs = await matchRepo.find({
      where: [
        { homeTeam: { code: fifaCode as any } },
        { awayTeam: { code: fifaCode as any } }
      ],
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    });

    return c.json({
      success: true,
      message: `Matchs for team ${fifaCode}`,
      data: matchs
    }, 200);
  }
}