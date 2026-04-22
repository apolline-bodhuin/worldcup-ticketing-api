import "reflect-metadata";
import { AppDataSource } from "./AppDataSource";
import { countries } from "../mock/countries";
import { cities } from "../mock/cities";
import { teams } from "../mock/teams";
import { stadiums } from "../mock/stadiums";
import { matchs } from "../mock/matchs";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { Team } from "@domain/entities/Team";
import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";

async function clear(): Promise<void> {
  const ds = AppDataSource;
  if (!ds.isInitialized) await ds.initialize();
  
  console.log("Purge de la base...");
  // On désactive les clés étrangères pour tout vider sans erreur
  await ds.query("SET FOREIGN_KEY_CHECKS = 0;");
  await ds.query("TRUNCATE TABLE ticket;");
  await ds.query("TRUNCATE TABLE `match`;"); // match est un mot réservé, on met des backticks
  await ds.query("TRUNCATE TABLE stadium;");
  await ds.query("TRUNCATE TABLE team;");
  await ds.query("TRUNCATE TABLE city;");
  await ds.query("TRUNCATE TABLE country;");
  await ds.query("SET FOREIGN_KEY_CHECKS = 1;");
}

async function seed(): Promise<void> {
  try {
    await clear();
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    console.log("Inserting data...");

    await AppDataSource.getRepository(Country).save(countries);
    console.log("Countries inserted");

    await AppDataSource.getRepository(City).save(cities);
    console.log("Cities inserted");

    await AppDataSource.getRepository(Team).save(teams);
    console.log("Teams inserted");

    await AppDataSource.getRepository(Stadium).save(stadiums);
    console.log("Stadiums inserted");

    await AppDataSource.getRepository(Match).save(matchs);
    console.log("Matchs inserted");

    await AppDataSource.destroy();
    console.log("Database seeded with success!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seed();