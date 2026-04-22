import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Team } from "@domain/entities/Team";
import { MatchStage } from "@domain/types/MatchStage";
import { HTTPException } from "hono/http-exception";

export class GetTeamMatchsByStageHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode");
    const stage = c.req.param("stage");

    if (fifaCode.length !== 3) {
      throw new HTTPException(400, { message: `Invalid FIFA code: "${fifaCode}"` });
    }

    const codeUpper = fifaCode.toUpperCase();

    const isValidStage = Object.values(MatchStage).includes(stage as MatchStage);
    if (!isValidStage) {
      throw new HTTPException(400, { message: `Invalid stage: "${stage}"` });
    }

    const teamRepo = AppDataSource.getRepository(Team);
    const team = await teamRepo.findOne({
      where: { code: codeUpper as any }
    });

    if (!team) {
      throw new HTTPException(404, { message: `Team ${codeUpper} does not exist` });
    }

    const matchRepo = AppDataSource.getRepository(Match);
    
    const matchs = await matchRepo.find({
      where: [
        { homeTeam: { code: codeUpper as any }, stage: stage as MatchStage },
        { awayTeam: { code: codeUpper as any }, stage: stage as MatchStage }
      ],
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    });

    return c.json({
      success: true,
      message: `Matchs for team ${codeUpper} at stage ${stage}`,
      data: matchs
    }, 200);
  }
}