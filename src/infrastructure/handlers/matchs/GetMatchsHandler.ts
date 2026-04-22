import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { HTTPException } from "hono/http-exception"; 

export class GetMatchsHandler {
  async handle(c: Context) {
    const matchRepository = AppDataSource.getRepository(Match);
    
    const dateQuery = c.req.query("date");
    const teamCode = c.req.query("team[code]");

    if (dateQuery) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateQuery)) {
        throw new HTTPException(400, { message: "Format de date invalide (YYYY-MM-DD attendu)" });
      }
    }

    let query = matchRepository.createQueryBuilder("match")
      .leftJoinAndSelect("match.homeTeam", "homeTeam")
      .leftJoinAndSelect("match.awayTeam", "awayTeam")
      .leftJoinAndSelect("match.stadium", "stadium")
      .leftJoinAndSelect("stadium.city", "city") 
      .leftJoinAndSelect("city.country", "country"); 

    if (dateQuery) {
      query = query.andWhere("DATE(match.date) = :date", { date: dateQuery });
    }

    if (teamCode) {
      query = query.andWhere("(homeTeam.code = :code OR awayTeam.code = :code)", { code: teamCode });
    }

    const matchs = await query.getMany();

    return c.json({
      success: true,
      message: dateQuery ? `Matchs filtered by date: ${dateQuery}` : 
               teamCode ? `Matchs filtered by team[code]: ${teamCode}` : "All matchs",
      data: matchs
    }, 200);
  }
}