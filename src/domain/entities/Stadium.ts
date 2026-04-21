import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { City } from "./City";

@Entity()
export class Stadium {
  @PrimaryColumn()
  name: string;

  @Column({ type: "int" })
  capacity: number;

  @ManyToOne(() => City, { nullable: false })
  city: City;

  constructor(name: string, capacity: number, city: City) {
    if (capacity <= 0) throw new Error("Capacity must be > 0");
    this.name = name;
    this.capacity = capacity;
    this.city = city;
  }
}
