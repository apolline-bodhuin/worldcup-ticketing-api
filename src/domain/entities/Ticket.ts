import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Match } from "./Match";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  seat!: string;

  @Column()
  customerFirstname!: string;

  @Column()
  customerLastname!: string;

  @Column()
  customerEmail!: string;

  @ManyToOne(() => Match)
  match!: Match;

  constructor(seat?: string, customerFirstname?: string, customerLastname?: string, customerEmail?: string, match?: Match, id?: number) {
    if (id !== undefined && id <= 0) {
      throw new Error("L'id du ticket doit être strictement positif (> 0)");
    }
    if (seat !== undefined && seat.trim() === "") {
      throw new Error("Le siège (seat) ne peut pas être vide");
    }

    if (seat) this.seat = seat;
    if (customerFirstname) this.customerFirstname = customerFirstname;
    if (customerLastname) this.customerLastname = customerLastname;
    if (customerEmail) this.customerEmail = customerEmail;
    if (match) this.match = match;
    if (id) this.id = id;
  }
}