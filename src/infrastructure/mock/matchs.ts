import { Match } from "@domain/entities/Match";
import { teams } from "./teams";
import { stadiums } from "./stadiums";

const fra = teams.find(t => t.code === "FRA")!;
const arg = teams.find(t => t.code === "ARG")!;
const usa = teams.find(t => t.code === "USA")!;
const can = teams.find(t => t.code === "CAN")!;

const azteca = stadiums.find(s => s.name === "Estadio Azteca")!;
const metlife = stadiums.find(s => s.name === "MetLife Stadium")!; 

export const matchs = [
  new Match(fra, arg, azteca, "scheduled", "final", new Date("2026-07-19T12:00:00Z")),
  new Match(usa, can, metlife, "scheduled", "group", new Date("2026-06-15T20:00:00Z"))
];