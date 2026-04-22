import { Entity, PrimaryColumn, ManyToOne, type Relation } from "typeorm";
import { Country } from "./Country";

@Entity()
export class City {
  @PrimaryColumn()
  name!: string;

  @ManyToOne(() => Country, (country) => country.cities, { nullable: false })
  country!: Relation<Country>;

  constructor(name?: string, country?: Country) {
    if (name && country) {
      const validCities: Record<string, string[]> = {
        "us": ["Atlanta", "Boston", "Dallas", "Houston", "Kansas City", "Los Angeles", "Miami", "New York", "Philadelphia", "Seattle", "San Francisco"],
        "me": ["Guadalajara", "Mexico City", "Monterrey"],
        "ca": ["Toronto", "Vancouver"]
      };

      const allowedCities = validCities[country.code.toLowerCase()];

      if (!allowedCities || !allowedCities.includes(name)) {
        throw new Error(`La ville '${name}' n'est pas une ville hôte valide pour le pays '${country.name}'.`);
      }

      this.name = name;
      this.country = country;
    }
  }
}