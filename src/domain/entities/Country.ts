import { Entity, PrimaryColumn, Column, OneToMany, type Relation } from "typeorm";
import { City } from "./City";

@Entity()
export class Country {
  @PrimaryColumn({ length: 2 })
  code!: string;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => City, (city) => city.country)
  cities?: Relation<City>[];

  constructor(code?: string, name?: string) {
    if (code && name) {
      const isValid = 
        (name === "USA" && code === "us") || 
        (name === "Mexico" && code === "me") || 
        (name === "Canada" && code === "ca");

      if (!isValid) {
        throw new Error("Pays non autorisé (doit être USA/us, Mexico/me, ou Canada/ca)");
      }
      
      this.code = code;
      this.name = name;
    }
  }
}