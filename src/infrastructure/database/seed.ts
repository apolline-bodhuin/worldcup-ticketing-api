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
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    console.log("Cleaning database...");
    await AppDataSource.getRepository(Ticket).createQueryBuilder().delete().where("1=1").execute();
    await AppDataSource.getRepository(Match).createQueryBuilder().delete().where("1=1").execute();
    await AppDataSource.getRepository(Stadium).createQueryBuilder().delete().where("1=1").execute();
    await AppDataSource.getRepository(Team).createQueryBuilder().delete().where("1=1").execute();
    await AppDataSource.getRepository(City).createQueryBuilder().delete().where("1=1").execute();
    await AppDataSource.getRepository(Country).createQueryBuilder().delete().where("1=1").execute();
  } catch (error) {
    console.error("Can't clear database:", error);
    throw error;
  }
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