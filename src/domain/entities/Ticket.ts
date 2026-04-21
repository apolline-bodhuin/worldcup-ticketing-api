import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, type Relation } from "typeorm";
import { Match } from "./Match";

@Entity()
@Unique(["match", "seat"])
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Match, { nullable: false })
  match!: Relation<Match>;

  @Column()
  seat: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  constructor(match: Match, seat: string, firstname: string, lastname: string, email: string) {
    if (!seat) throw new Error("Seat cannot be empty");
    this.match = match;
    this.seat = seat;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }
}
