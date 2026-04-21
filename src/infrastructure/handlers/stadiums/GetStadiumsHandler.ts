import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";

export class GetStadiumsHandler {
  async handle(c: Context) {
    const repo = AppDataSource.getRepository(Stadium);
    const nameFilter = c.req.query("name");
    
    let query = repo.createQueryBuilder("stadium").leftJoinAndSelect("stadium.city", "city");

    if (nameFilter) {
      query = query.where("LOWER(stadium.name) LIKE LOWER(:name)", { name: `%${nameFilter}%` });
    }
    
    const stadiums = await query.getMany();
    return c.json(stadiums, 200);
  }
}
