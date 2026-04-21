import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { homeRouter } from "./routes/home";
import { matchsRouter } from "./routes/matchs";
import { teamsRouter } from "./routes/teams";
import { ticketsRouter } from "./routes/tickets";
import { countriesRouter } from "./routes/countries";

export const app = new Hono();

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ success: false, error: err.message }, err.status);
  }
  return c.json({ success: false, error: "Erreur interne" }, 500);
});

app.route("/", homeRouter);
app.route("/matchs", matchsRouter);
app.route("/teams", teamsRouter);
app.route("/tickets", ticketsRouter);
app.route("/countries", countriesRouter);
