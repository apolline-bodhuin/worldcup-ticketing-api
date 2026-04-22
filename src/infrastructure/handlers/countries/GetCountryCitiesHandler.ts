import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";

export class GetCountryCitiesHandler {
  async handle(c: Context) {
    try {
      const code = c.req.param("code").toLowerCase();

      const countryRepo = AppDataSource.getRepository(Country);
      const country = await countryRepo.findOneBy({ code });
      
      if (!country) {
        return c.json({
          success: false,
          error: `Country "${code}" does not exist`
        }, 404);
      }

      const cityRepo = AppDataSource.getRepository(City);
      const cities = await cityRepo.find({ 
        where: { country: { code } },
        relations: ["country"] 
      });

      return c.json({
        success: true,
        message: `Cities in ${country.name}`,
        data: cities
      }, 200);

    } catch (error) {
      return c.json({ success: false, error: "Internal Server Error" }, 500);
    }
  }
}