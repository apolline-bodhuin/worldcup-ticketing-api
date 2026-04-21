import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";

export class GetMatchsHandler {
  async handle(c: Context) {
    const matchRepository = AppDataSource.getRepository(Match);
    
    const dateQuery = c.req.query("date");
    const teamCode = c.req.query("team[code]");

    let query = matchRepository.createQueryBuilder("match")
      .leftJoinAndSelect("match.homeTeam", "homeTeam")
      .leftJoinAndSelect("match.awayTeam", "awayTeam")
      .leftJoinAndSelect("match.stadium", "stadium")
      .leftJoinAndSelect("stadium.city", "city")
      .leftJoinAndSelect("city.country", "country");

    let message = "All matchs";

    if (dateQuery) {
      query = query.andWhere("DATE(match.date) = :date", { date: dateQuery });
      message = `Matchs filtered by date: ${dateQuery}`;
    }

    if (teamCode) {
      query = query.andWhere("(homeTeam.code = :code OR awayTeam.code = :code)", { code: teamCode });
      message = `Matchs filtered by team[code]: ${teamCode}`;
    }

    const matchs = await query.getMany();

    return c.json({
      success: true,
      message: message,
      data: matchs
    }, 200);
  }
}