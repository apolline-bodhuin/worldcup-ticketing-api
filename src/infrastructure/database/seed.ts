import "reflect-metadata";
import { AppDataSource } from "./AppDataSource";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { countries } from "../mock/countries";
import { cities } from "../mock/cities";

async function clear(): Promise<void> {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  
  await AppDataSource.getRepository(City).delete({});
  await AppDataSource.getRepository(Country).delete({});
  console.log("Database cleared");
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
