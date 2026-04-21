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
      .where("LOWER(stadium.name) = LOWER(:name)", { name }) 
      .getOne();

    if (!stadium) {
      throw new HTTPException(404, { message: "Stade introuvable" });
    }

    return c.json(stadium, 200);
  }
}
