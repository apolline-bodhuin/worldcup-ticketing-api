import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { HTTPException } from "hono/http-exception";

export class GetStadiumMatchsHandler {
  async handle(c: Context) {
    const name = c.req.param("name");
    
    const stadiumRepo = AppDataSource.getRepository(Stadium);
    const stadium = await stadiumRepo.createQueryBuilder("stadium")
      .where("LOWER(stadium.name) = LOWER(:name)", { name })
      .getOne();

    if (!stadium) throw new HTTPException(404, { message: "Stade introuvable" });

    const matchRepo = AppDataSource.getRepository(Match);
    const matchs = await matchRepo.find({
      where: { stadium: { name: stadium.name } },
      relations: ["homeTeam", "awayTeam", "stadium"]
    });

    return c.json(matchs, 200);
  }
}
