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

  static formatEachTeam(matches: MatchScore[][]): ILeaderBoard[] {
    const teams: ILeaderBoard[] = [];

    matches.forEach((match) => {
      match.forEach((m) => {
        const existingTeam = teams.find((team) => team.name === m.homeTeam);

        if (existingTeam) {
          const updatedTeam = this.updateTeamStatistics(existingTeam, m);
          teams.push(updatedTeam);
        } else {
          const newTeam = this.generateEachTeamStatistics(m);
          teams.push(newTeam);
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

  static updateTeamStatistics(
    team: ILeaderBoard,
    match: MatchScore,
  ): ILeaderBoard {
    const updatedTeam = { ...team };

    updatedTeam.totalGames += 1;
    updatedTeam.totalVictories
      += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
    updatedTeam.totalDraws
      += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
    updatedTeam.totalLosses
      += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
    updatedTeam.goalsFavor += Number(match.homeTeamGoals);
    updatedTeam.goalsOwn += Number(match.awayTeamGoals);

    return updatedTeam;
  }
}
