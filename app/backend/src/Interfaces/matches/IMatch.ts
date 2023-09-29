import { Identifiable } from '..';

export interface IGoal {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends Identifiable, IGoal {
  homeTeamId: number;
  awayTeamId: number;
  inProgress: boolean;
}
