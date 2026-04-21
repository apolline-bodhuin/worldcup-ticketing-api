import { Hono } from "hono";
import { GetTeamsHandler } from "../handlers/teams/GetTeamsHandler";
import { GetTeamByFifaCodeHandler } from "../handlers/teams/GetTeamByFifaCodeHandler";
import { GetTeamMatchsByFifaCodeHandler } from "../handlers/teams/GetTeamMatchsByFifaCodeHandler";

const teamsRouter = new Hono();

teamsRouter.get("/", (c) => new GetTeamsHandler().handle(c));
teamsRouter.get("/:fifaCode", (c) => new GetTeamByFifaCodeHandler().handle(c));
teamsRouter.get("/:fifaCode/matchs", (c) => new GetTeamMatchsByFifaCodeHandler().handle(c));

export { teamsRouter };
