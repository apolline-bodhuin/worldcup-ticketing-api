import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";
import { HTTPException } from "hono/http-exception";

export class GetStadiumByNameHandler {
  async handle(c: Context) {
    const name = c.req.param("name");

    const stadiumRepo = AppDataSource.getRepository(Stadium);
    const stadium = await stadiumRepo.createQueryBuilder("stadium")
      .leftJoinAndSelect("stadium.city", "city")
      .leftJoinAndSelect("city.country", "country") 
      .where("LOWER(stadium.name) = LOWER(:name)", { name }) 
      .getOne();

    if (!stadium) {
      throw new HTTPException(404, { message: `Stadium "${name}" does not exist` });
    }

    return c.json({
      success: true,
      message: `Stadium ${stadium.name}`,
      data: stadium
    }, 200);
  }
}