import { Match } from "@domain/entities/Match";
import { teams } from "./teams";
import { stadiums } from "./stadiums";

const fra = teams.find(t => t.code === "FRA")!;
const arg = teams.find(t => t.code === "ARG")!;
const azteca = stadiums.find(s => s.name === "Estadio Azteca")!;

export const matchs = [
  new Match(fra, arg, azteca, "scheduled", "final", new Date("2026-07-19T12:00:00Z"))
];
