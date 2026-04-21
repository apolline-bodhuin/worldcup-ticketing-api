import { Hono } from "hono";
import { GetStadiumsHandler } from "../handlers/stadiums/GetStadiumsHandler";
import { GetStadiumByNameHandler } from "../handlers/stadiums/GetStadiumByNameHandler";
import { GetStadiumMatchsHandler } from "../handlers/stadiums/GetStadiumMatchsHandler";

const stadiumsRouter = new Hono();
stadiumsRouter.get("/", (c) => new GetStadiumsHandler().handle(c));
stadiumsRouter.get("/:name/matchs", (c) => new GetStadiumMatchsHandler().handle(c));
stadiumsRouter.get("/:name", (c) => new GetStadiumByNameHandler().handle(c));

export { stadiumsRouter };