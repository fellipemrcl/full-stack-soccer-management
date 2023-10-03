import ILeaderBoard, {
  MatchScore,
} from '../Interfaces/leaderboard/ILeaderboard';

const pointsPerVictory = 3;
const percentual = 100;

export default class LeaderboardHelper {
  static calculateEfficiency(teams: ILeaderBoard[]) {
    const mappedEfficiency = teams.map((team) => ({
      ...team,
      efficiency: (
        (team.totalPoints / (team.totalGames * pointsPerVictory))
        * percentual
      ).toFixed(2),
    }));

    return mappedEfficiency;
  }

  static calculateGoalsBalance(teams: ILeaderBoard[]) {
    const mappedGoalsBalance = teams.map((team) => ({
      ...team,
      goalsBalance: team.goalsFavor - team.goalsOwn,
    }));

    return mappedGoalsBalance;
  }

  static calculateTotalPoints(teams: ILeaderBoard[]) {
    const mappedTotalPoints = teams.map((team) => ({
      ...team,
      totalPoints: team.totalVictories * pointsPerVictory + team.totalDraws,
    }));

    return mappedTotalPoints;
  }

  static calculateStatistics(matches: MatchScore[][]) {
    const teams = this.formatEachTeam(matches);
    const teamsWithCalculatedGoalsBalance = this.calculateGoalsBalance(teams);
    const teamsWithCalculatedTotalPoints = this.calculateTotalPoints(
      teamsWithCalculatedGoalsBalance,
    );
    const teamsWithCalculatedEfficiency = this.calculateEfficiency(
      teamsWithCalculatedTotalPoints,
    );
    const orderTeams = this.organizeTeams(teamsWithCalculatedEfficiency);
    return orderTeams;
  }

  static formatEachTeam(matches: MatchScore[][]) {
    const teams: ILeaderBoard[] = [];

    matches.forEach((match) => {
      match.forEach((m) => {
        const hasTeam = teams.find((t) => t.name === m.homeTeam);
        if (hasTeam) {
          hasTeam.totalGames += 1;
          hasTeam.totalVictories += m.homeTeamGoals > m.awayTeamGoals ? +1 : 0;
          hasTeam.totalDraws += m.homeTeamGoals === m.awayTeamGoals ? 1 : 0;
          hasTeam.totalLosses += m.homeTeamGoals < m.awayTeamGoals ? 1 : 0;
          hasTeam.goalsFavor += Number(m.homeTeamGoals);
          hasTeam.goalsOwn += Number(m.awayTeamGoals);
        } else {
          const team = this.generateEachTeamStatistics(m);
          teams.push(team);
        }
      });
    });
    return teams;
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

  static organizeTeams(teams: ILeaderBoard[]) {
    return teams.sort((teamA, teamB) => {
      if (teamA.totalPoints !== teamB.totalPoints) {
        return teamB.totalPoints - teamA.totalPoints;
      }

      if (teamA.totalVictories !== teamB.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }

      if (teamA.goalsBalance !== teamB.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }

      return teamB.goalsFavor - teamA.goalsFavor;
    });
  }
}
