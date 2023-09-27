import { Identifiable } from '..';

export interface IGoalsMatch {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends Identifiable, IGoalsMatch {
  homeTeamId: number;
  awayTeamId: number;
  inProgress: boolean;
  homeTeam?: { teamName: string };
  awayTeam?: { teamName: string };
}
