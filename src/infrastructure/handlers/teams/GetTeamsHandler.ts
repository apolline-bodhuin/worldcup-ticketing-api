import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { HTTPException } from "hono/http-exception";

export class GetTeamsHandler {
  async handle(c: Context) {
    const teamRepo = AppDataSource.getRepository(Team);
    const sort = c.req.query("sort");
    const nameFilter = c.req.query("name");

    let query = teamRepo.createQueryBuilder("team");

    if (nameFilter) {
      query = query.where("LOWER(team.name) LIKE LOWER(:name)", { name: `%${nameFilter}%` });
    }

    if (sort) {
      if (sort === "name") {
        query = query.orderBy("team.name", "ASC");
      } else if (sort === "-name") {
        query = query.orderBy("team.name", "DESC");
      } else {
        throw new HTTPException(400, { message: "Paramètre sort invalide" });
      }
    } else {
      query = query.orderBy("team.name", "ASC"); // Défaut
    }

    const teams = await query.getMany();
    return c.json(teams, 200);
  }
}
