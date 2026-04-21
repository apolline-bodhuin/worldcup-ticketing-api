import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Country } from "@domain/entities/Country";
import { HTTPException } from "hono/http-exception";

export class GetCountryByCodeHandler {
  async handle(c: Context) {
    const code = c.req.param("code").toLowerCase(); 

    const countryRepo = AppDataSource.getRepository(Country);
    const country = await countryRepo.findOneBy({ code });

    if (!country) {
      throw new HTTPException(404, { message: "Pays introuvable" });
    }

    return c.json(country, 200);
  }
}
