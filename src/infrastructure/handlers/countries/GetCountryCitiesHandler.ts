import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";
import { HTTPException } from "hono/http-exception";

export class GetCountryCitiesHandler {
  async handle(c: Context) {
    const code = c.req.param("code").toLowerCase();

    const countryRepo = AppDataSource.getRepository(Country);
    const country = await countryRepo.findOneBy({ code });
    if (!country) throw new HTTPException(404, { message: "Pays introuvable" });

    const cityRepo = AppDataSource.getRepository(City);
    const cities = await cityRepo.find({ where: { country: { code } } });

    return c.json(cities, 200);
  }
}
