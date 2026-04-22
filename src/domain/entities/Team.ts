import { Entity, PrimaryColumn, Column } from "typeorm";
import { FifaCode } from "@domain/value-objets/FifaCode";

@Entity()
export class Team {
  @PrimaryColumn({ 
    type: "varchar", 
    length: 3,
    transformer: {
      from: (value: string) => value ? new FifaCode(value) : value,
      to: (value: FifaCode | string) => value instanceof FifaCode ? value.value : value
    }
  })
  code: FifaCode; 

  @Column()
  name: string;

  constructor(code: string, name: string) {
    this.code = code ? new FifaCode(code) : (undefined as any);
    this.name = name;
  }
}