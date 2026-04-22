import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation } from "typeorm";
import { Team } from "./Team";
import { Stadium } from "./Stadium";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team)
  homeTeam!: Relation<Team>;

  @ManyToOne(() => Team)
  awayTeam!: Relation<Team>;

  @Column({ default: 0 })
  homeScore: number = 0;

  @Column({ default: 0 })
  awayScore: number = 0;

  @Column({ type: "int", nullable: true })
  homeScoreExtraTime!: number | null;

  @Column({ type: "int", nullable: true })
  awayScoreExtraTime!: number | null;

  @Column({ type: "int", nullable: true })
  homeScoreShootOut!: number | null;

  @Column({ type: "int", nullable: true })
  awayScoreShootOut!: number | null;

  @ManyToOne(() => Stadium)
  stadium!: Relation<Stadium>;

  @Column()
  status: string;

  @Column()
  stage: string; 

  @Column()
  date: Date;

  constructor(homeTeam?: Team, awayTeam?: Team, stadium?: Stadium, status?: string, stage?: string, date?: Date) {
    if (homeTeam && awayTeam && homeTeam.name === awayTeam.name) {
      throw new Error("Une équipe ne peut pas jouer contre elle-même");
    }
    if (this.homeScore < 0 || this.awayScore < 0) {
      throw new Error("Le score ne peut pas être négatif");
    }

    if (homeTeam) this.homeTeam = homeTeam;
    if (awayTeam) this.awayTeam = awayTeam;
    if (stadium) this.stadium = stadium;
    if (status) this.status = status;
    if (stage) this.stage = stage;
    if (date) this.date = date;
  }

  isDraw(): boolean {
    return this.homeScore === this.awayScore;
  }

  winner(): Team | null {
    if (this.isDraw()) return null;
    return this.homeScore > this.awayScore ? this.homeTeam : this.awayTeam;
  }
}