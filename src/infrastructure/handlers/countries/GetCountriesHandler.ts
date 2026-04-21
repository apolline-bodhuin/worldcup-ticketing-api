import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Country } from "@domain/entities/Country";

export class GetCountriesHandler {
  async handle(c: Context) {
    const countryRepo = AppDataSource.getRepository(Country);
    const nameFilter = c.req.query("name");

    let query = countryRepo.createQueryBuilder("country");

    if (nameFilter) {
      query = query.where("LOWER(country.name) LIKE LOWER(:name)", { name: `%${nameFilter}%` });
    }

    const countries = await query.getMany();
    return c.json(countries, 200);
  }
}
