import ILeaderBoard, {
  MatchScore,
} from '../Interfaces/leaderboard/ILeaderboard';

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

  static generateEachTeamStatistics(team: MatchScore): ILeaderBoard {
    const teamWithStatistics = {
      name: team.homeTeam,
      totalPoints: 0,
      totalGames: 1,
      totalVictories: team.homeTeamGoals > team.awayTeamGoals ? 1 : 0,
      totalDraws: team.homeTeamGoals === team.awayTeamGoals ? 1 : 0,
      totalLosses: team.homeTeamGoals < team.awayTeamGoals ? 1 : 0,
      goalsFavor: Number(team.homeTeamGoals),
      goalsOwn: Number(team.awayTeamGoals),
      goalsBalance: 0,
      efficiency: '',
    };

    return teamWithStatistics;
  }
}
