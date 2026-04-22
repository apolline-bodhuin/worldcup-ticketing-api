import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";

export class GetStadiumsHandler {
  async handle(c: Context) {
    const repo = AppDataSource.getRepository(Stadium);
    
    const cityFilter = c.req.query("city[name]");
    const countryCodeFilter = c.req.query("country[code]");
    const countryNameFilter = c.req.query("country[name]");
    
    let query = repo.createQueryBuilder("stadium")
      .leftJoinAndSelect("stadium.city", "city")
      .leftJoinAndSelect("city.country", "country");

    let message = "All stadiums";

    if (cityFilter) {
      query = query.where("LOWER(city.name) = LOWER(:city)", { city: cityFilter });
      message = `Stadiums filtered by city[name]: ${cityFilter}`;
    } else if (countryCodeFilter) {
      query = query.where("LOWER(country.code) = LOWER(:code)", { code: countryCodeFilter });
      message = `Stadiums filtered by country[code]: ${countryCodeFilter}`;
    } else if (countryNameFilter) {
      query = query.where("LOWER(country.name) = LOWER(:country)", { country: countryNameFilter });
      message = `Stadiums filtered by country[name]: ${countryNameFilter}`;
    }

    const stadiums = await query.getMany();

    return c.json({
      success: true,
      message: message,
      data: stadiums
    }, 200);
  }
}