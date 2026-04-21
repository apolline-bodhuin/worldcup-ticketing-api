import "reflect-metadata";
import { AppDataSource } from "./AppDataSource";
import { countries } from "../mock/countries";
import { cities } from "../mock/cities";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { Team } from "@domain/entities/Team";
import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";

async function clear(): Promise<void> {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // 1. Instanciation de TOUS les repositories
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const matchRepository = AppDataSource.getRepository(Match);
    const stadiumRepository = AppDataSource.getRepository(Stadium);
    const teamRepository = AppDataSource.getRepository(Team);
    const cityRepository = AppDataSource.getRepository(City);
    const countryRepository = AppDataSource.getRepository(Country);

    // 2. Suppression dans l'ordre INVERSE des relations
    await ticketRepository.createQueryBuilder().delete().execute();
    await matchRepository.createQueryBuilder().delete().execute();
    await stadiumRepository.createQueryBuilder().delete().execute();
    await teamRepository.createQueryBuilder().delete().execute();
    await cityRepository.createQueryBuilder().delete().execute();
    await countryRepository.createQueryBuilder().delete().execute();

    await AppDataSource.destroy();
    console.log("Database cleared with success");
  } catch (error) {
    console.error(error);
    console.error("Can't clear database");
  }
}
async function seed(): Promise<void> {
  try {
    await clear();
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();

    const countryRepo = AppDataSource.getRepository(Country);
    const cityRepo = AppDataSource.getRepository(City);

    for (const c of countries) {
      await countryRepo.save(countryRepo.create({ code: c.code, name: c.name }));
    }
    console.log("Countries inserted");

    for (const c of cities) {
      await cityRepo.save(cityRepo.create({ name: c.name, country: { code: c.country.code } }));
    }
    console.log("Cities inserted");

    await AppDataSource.destroy();
    console.log("Database seeded with success");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

seed();
