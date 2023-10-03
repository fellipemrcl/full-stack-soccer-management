export default interface ILeaderBoard {
  name?: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export type MatchScore = {
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeam?: string;
};
