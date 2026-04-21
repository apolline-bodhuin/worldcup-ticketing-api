import { Hono } from "hono";
import { GetCitiesHandler } from "../handlers/cities/GetCitiesHandler";
import { GetCityByNameHandler } from "../handlers/cities/GetCityByNameHandler";
import { GetCityMatchsHandler } from "../handlers/cities/GetCityMatchsHandler";

const citiesRouter = new Hono();
citiesRouter.get("/", (c) => new GetCitiesHandler().handle(c));
citiesRouter.get("/:name/matchs", (c) => new GetCityMatchsHandler().handle(c));
citiesRouter.get("/:name", (c) => new GetCityByNameHandler().handle(c));

export { citiesRouter };