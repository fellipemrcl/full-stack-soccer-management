import ILeaderBoard from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardHelper {
  static calculateGoalsBalance(teams: ILeaderBoard[]) {
    const mappedGoalsBalance = teams.map((team) => ({
      ...team,
      goalsBalance: team.goalsFavor - team.goalsOwn,
    }));

    return mappedGoalsBalance;
  }

  static calculateTotalPoints(teams: ILeaderBoard[]) {
    const pointsPerVictory = 3;
    const mappedTotalPoints = teams.map((team) => ({
      ...team,
      totalPoints: team.totalVictories * pointsPerVictory + team.totalDraws,
    }));

    return mappedTotalPoints;
  }
}
