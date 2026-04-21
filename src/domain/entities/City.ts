import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Country } from "./Country";

@Entity()
export class City {
  @PrimaryColumn()
  name: string;

  @ManyToOne(() => Country, (country) => country.cities, { nullable: false })
  country: Country;

  constructor(name: string, country: Country) {
    this.name = name;
    this.country = country;
  }
}
