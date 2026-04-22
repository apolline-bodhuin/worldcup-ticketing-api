import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Country } from "@domain/entities/Country";

export class GetCountryByCodeHandler {
  async handle(c: Context) {
    try {
      const code = c.req.param("code");
      
      const countryRepository = AppDataSource.getRepository(Country);
      
      const country = await countryRepository.findOneBy({ code: code });

      if (!country) {
        return c.json({
          success: false,
          error: `Country "${code}" does not exist`
        }, 404);
      }

      return c.json({
        success: true,
        message: `Country ${country.name}`,
        data: country
      }, 200);

    } catch (error) {
      return c.json({ success: false, error: "Internal Server Error", data: error }, 500);
    }
  }
}