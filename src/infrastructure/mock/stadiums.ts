import { Stadium } from "@domain/entities/Stadium";
import { cities } from "./cities";

const dallas = cities.find(c => c.name === "Dallas")!;
const mexicoCity = cities.find(c => c.name === "Mexico City")!;

export const stadiums = [
  new Stadium("AT&T Stadium", 70122, dallas),
  new Stadium("Estadio Azteca", 72766, mexicoCity)
];
