import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Team } from "./Team";
import { Stadium } from "./Stadium";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team)
  homeTeam!: Team;

  @ManyToOne(() => Team)
  awayTeam!: Team;

  @Column({ default: 0 })
  homeScore: number = 0;

  @Column({ default: 0 })
  awayScore: number = 0;

  @ManyToOne(() => Stadium)
  stadium!: Stadium;

  @Column()
  status: string;

  @Column()
  stage: string; 

  @Column()
  date: Date;

  constructor(homeTeam: Team, awayTeam: Team, stadium: Stadium, status: string, stage: string, date: Date) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.stadium = stadium;
    this.status = status;
    this.stage = stage;
    this.date = date;
  }
}
