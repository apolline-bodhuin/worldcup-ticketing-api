import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Country } from "@domain/entities/Country";
import { HTTPException } from "hono/http-exception";

export class GetCountryByCodeHandler {
  async handle(c: Context) {
  const code = c.req.param("code");

  const country = await countryRepository.findOneBy({ code: code });

  if (!country) {
    return c.json({
      success: false,
      message: "Country not found"
    }, 404);
  }
  return c.json({
    success: true,
    message: `Country ${country.name}`,
    data: country
    }, 200);

  }
}


