import { Hono } from "hono";
import { GetCountriesHandler } from "../handlers/countries/GetCountriesHandler";
import { GetCountryByCodeHandler } from "../handlers/countries/GetCountryByCodeHandler";
import { GetCountryCitiesHandler } from "../handlers/countries/GetCountryCitiesHandler";

const countriesRouter = new Hono();

countriesRouter.get("/", (c) => new GetCountriesHandler().handle(c));
countriesRouter.get("/:code/cities", (c) => new GetCountryCitiesHandler().handle(c));
countriesRouter.get("/:code", (c) => new GetCountryByCodeHandler().handle(c));

export { countriesRouter };