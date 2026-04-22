import { Stadium } from "@domain/entities/Stadium";
import { cities } from "./cities";

const dallas = cities.find(c => c.name === "Dallas")!;
const mexicoCity = cities.find(c => c.name === "Mexico City")!;
const newYork = cities.find(c => c.name === "New York")!; 

export const stadiums = [
  new Stadium("AT&T Stadium", 70122, dallas),
  new Stadium("Estadio Azteca", 72766, mexicoCity),
  new Stadium("MetLife Stadium", 82500, newYork) 
];