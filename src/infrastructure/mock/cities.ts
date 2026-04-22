import { City } from "@domain/entities/City";
import { countries } from "./countries";

const usa = countries.find(c => c.code === "us")!;
const mexico = countries.find(c => c.code === "me")!;

export const cities = [
  new City("Dallas", usa),
  new City("New York", usa),
  new City("Miami", usa), 
  new City("Mexico City", mexico)
];