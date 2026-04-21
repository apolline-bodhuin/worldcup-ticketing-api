import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { City } from "./City";

@Entity()
export class Country {
  @PrimaryColumn({ length: 2 })
  code: string; // us, me, ca

  @Column({ unique: true })
  name: string;

  @OneToMany(() => City, (city) => city.country)
  cities?: City[];

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;
  }
}
