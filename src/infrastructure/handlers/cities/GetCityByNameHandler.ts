import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { City } from "@domain/entities/City";
import { HTTPException } from "hono/http-exception";

export class GetCityByNameHandler {
  async handle(c: Context) {
    const name = c.req.param("name");

    const cityRepo = AppDataSource.getRepository(City);
    const city = await cityRepo.createQueryBuilder("city")
      .leftJoinAndSelect("city.country", "country")
      .where("LOWER(city.name) = LOWER(:name)", { name })
      .getOne(); 

    if (!city) {
      throw new HTTPException(404, { message: `City "${name}" does not exist` }); 
    }

    return c.json({
      success: true,
      message: `City ${city.name}`,
      data: city
    }, 200);
  }
}