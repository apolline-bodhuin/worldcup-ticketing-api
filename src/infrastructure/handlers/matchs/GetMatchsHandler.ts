import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";

export class GetMatchsHandler {
  async handle(c: Context) {
    const matchRepository = AppDataSource.getRepository(Match);
    
    // Filtres (TD 03 & 04.1)
    const dateQuery = c.req.query("date");
    const teamCode = c.req.query("team[code]");

    let query = matchRepository.createQueryBuilder("match")
      .leftJoinAndSelect("match.homeTeam", "homeTeam")
      .leftJoinAndSelect("match.awayTeam", "awayTeam")
      .leftJoinAndSelect("match.stadium", "stadium");

    if (dateQuery) {
      query = query.andWhere("DATE(match.date) = :date", { date: dateQuery });
    }

    const matchs = await query.getMany();
    return c.json(matchs, 200);
  }
}
