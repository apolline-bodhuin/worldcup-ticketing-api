import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { HTTPException } from "hono/http-exception";
import { ... } from '../../../domain/value-objects/FifaCode'

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    const code = c.req.param("fifaCode");

    try {
      new FifaCode(code.toUpperCase()); 
    } catch (e) {
      throw new HTTPException(400, { message: "Format du code FIFA invalide" });
    }

    const teamRepo = AppDataSource.getRepository(Team);
    const team = await teamRepo.findOneBy({ code: code.toUpperCase() });

    if (!team) {
      throw new HTTPException(404, { message: "Équipe introuvable" }); 
    }

    return c.json(team, 200);
  }
}
