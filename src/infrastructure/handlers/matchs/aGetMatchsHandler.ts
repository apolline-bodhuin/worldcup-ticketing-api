import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { HTTPException } from "hono/http-exception";

export class GetMatchsHandler {
  async handle(c: Context) {
    const matchRepo = AppDataSource.getRepository(Match);
    
    // Récupération des Query Strings
    const dateFilter = c.req.query("date");
    const teamCodeFilter = c.req.query("team[code]");

    let query = matchRepo.createQueryBuilder("match")
      .leftJoinAndSelect("match.homeTeam", "homeTeam")
      .leftJoinAndSelect("match.awayTeam", "awayTeam")
      .leftJoinAndSelect("match.stadium", "stadium")
      .leftJoinAndSelect("stadium.city", "city");

    if (dateFilter) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateFilter)) {
        throw new HTTPException(400, { message: "Format de date invalide. Utilisez YYYY-MM-DD" });
      }
      query = query.andWhere("DATE(match.date) = :date", { date: dateFilter });
    }

    if (teamCodeFilter) {
      const code = teamCodeFilter.toUpperCase();
      query = query.andWhere(
        "(homeTeam.code = :code OR awayTeam.code = :code)", 
        { code }
      );
    }

    const matchs = await query.getMany();
    return c.json(matchs, 200);
  }
}
