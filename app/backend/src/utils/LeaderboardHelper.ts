import ILeaderBoard from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardHelper {
  static calculateGoalsBalance(teams: ILeaderBoard[]) {
    const mappedGoalsBalance = teams.map((team) => ({
      ...team,
      goalsBalance: team.goalsFavor - team.goalsOwn,
    }));

    return mappedGoalsBalance;
  }
}
