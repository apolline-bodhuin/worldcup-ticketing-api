import "reflect-metadata";
import { DataSource } from "typeorm";
import { Country } from "@domain/entities/Country";
import { Team } from "@domain/entities/Team";
import { City } from "@domain/entities/City";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";
import { Ticket } from "@domain/entities/Ticket";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Country, Team, City, Stadium, Match, Ticket],
});
