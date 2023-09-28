import { Identifiable } from '..';

export interface IMatch extends Identifiable {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
