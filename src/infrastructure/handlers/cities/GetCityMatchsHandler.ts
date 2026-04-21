import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { City } from "@domain/entities/City";
import { HTTPException } from "hono/http-exception";

export class GetCityMatchsHandler {
  async handle(c: Context) {
    const name = c.req.param("name");

    const cityRepo = AppDataSource.getRepository(City);
    const city = await cityRepo.createQueryBuilder("city")
      .where("LOWER(city.name) = LOWER(:name)", { name })
      .getOne();

    if (!city) {
      throw new HTTPException(404, { message: "Ville introuvable" }); 
    }

    const matchRepo = AppDataSource.getRepository(Match);
    const matchs = await matchRepo.find({
      where: { stadium: { city: { name: city.name } } },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city"]
    });

    return c.json(matchs, 200);
  }
}
