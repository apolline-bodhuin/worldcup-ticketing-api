import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Match } from "./Match";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seat: string;

  @Column({ type: "float" })
  price: number;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @ManyToOne(() => Match)
  match: Match;
}