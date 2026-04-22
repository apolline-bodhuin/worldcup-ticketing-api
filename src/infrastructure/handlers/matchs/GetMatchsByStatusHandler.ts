import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { MatchStatus } from "@domain/types/MatchStatus";
import { HTTPException } from "hono/http-exception";

export class GetMatchsByStatusHandler {
  async handle(c: Context) {
    const status = c.req.param("status");
    const matchRepository = AppDataSource.getRepository(Match);

    const isValidStatus = Object.values(MatchStatus).includes(status as MatchStatus);
    if (!isValidStatus) {
      throw new HTTPException(400, { message: `Invalid status: "${status}"` });
    }

    const matchs = await matchRepository.find({
      where: { status: status as MatchStatus },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    });

    return c.json({
      success: true,
      message: `Matchs with status ${status}`,
      data: matchs
    }, 200);
  }
}