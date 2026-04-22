import { Context } from "hono";
import { AppDataSource } from "../../database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { HTTPException } from "hono/http-exception";

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode");

    if (fifaCode.length !== 3) {
      throw new HTTPException(400, { message: `Invalid FIFA code: "${fifaCode}"` });
    }

    const codeUpper = fifaCode.toUpperCase();
    const teamRepo = AppDataSource.getRepository(Team);

    const team = await teamRepo.findOne({
      where: { code: codeUpper as any }
    });

    if (!team) {
      throw new HTTPException(404, { message: `Team ${codeUpper} does not exist` });
    }

    return c.json({
      success: true,
      message: `Team ${codeUpper}`,
      data: team
    }, 200);
  }
}