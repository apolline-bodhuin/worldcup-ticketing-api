import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Team {
  @PrimaryColumn({ length: 3 })
  code: string; 

  @Column()
  name: string;

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;
  }
}
