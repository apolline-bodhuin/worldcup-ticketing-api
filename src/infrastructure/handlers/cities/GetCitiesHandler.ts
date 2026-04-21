import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { City } from "@domain/entities/City";

export class GetCitiesHandler {
  async handle(c: Context) {
    const cityRepo = AppDataSource.getRepository(City);
    const nameFilter = c.req.query("name");

    let query = cityRepo.createQueryBuilder("city").leftJoinAndSelect("city.country", "country");

    if (nameFilter) {
      query = query.where("LOWER(city.name) LIKE LOWER(:name)", { name: `%${nameFilter}%` });
    }

    const cities = await query.getMany();
    return c.json(cities, 200);
  }
}
