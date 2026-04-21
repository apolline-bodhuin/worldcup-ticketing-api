import { Entity, PrimaryColumn, Column, ManyToOne, type Relation } from "typeorm";
import { Country } from "./Country";

@Entity()
export class City {
  @PrimaryColumn()
  name: string;

  @ManyToOne(() => Country, (country) => country.cities, { nullable: false })
  country: Relation<Country>;

  constructor(name: string, country: Relation<Country>) {
    this.name = name;
    this.country = country;
  }
}