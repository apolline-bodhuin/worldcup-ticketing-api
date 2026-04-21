import "reflect-metadata";
import { app } from "@infrastructure/app";
import { AppDataSource } from "./infrastructure/database/AppDataSource";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    console.log(`Server running on port ${process.env.PORT}`);
  })
  .catch((err) => {
    console.error("Can't connect database", err);
    process.exit(1);
  });

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  hostname: "127.0.0.1", // <-- AJOUTE CETTE LIGNE
  fetch: app.fetch,
};
