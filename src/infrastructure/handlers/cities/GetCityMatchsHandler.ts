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
      throw new HTTPException(404, { message: `City "${name}" does not exist` }); 
    }

    const matchRepo = AppDataSource.getRepository(Match);
    const matchs = await matchRepo.find({
      where: { stadium: { city: { id: city.id } } },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    });

    return c.json({
      success: true,
      message: `Matchs in ${city.name}`,
      data: matchs
    }, 200);
  }
}