import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import ILeaderBoard, { MatchScore } from '../Interfaces/leaderboard/ILeaderboard';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import LeaderBoardHelper from '../utils/LeaderboardHelper';

export default class LeaderBoardService {
  static async groupMatches(teams: ITeam[]): Promise<Promise<MatchScore[]>[]> {
    return teams.map(async (team) => {
      const dbData = await SequelizeMatches.findAll({
        where: { homeTeamId: team.id, inProgress: false },
        attributes: { exclude: ['awayTeamId', 'homeTeamId', 'id', 'inProgress'] },
        include: [{ model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } }],
      });

      return dbData.map((match) => ({
        homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
        homeTeam: match.homeTeam?.teamName,
      }));
    });
  }

  static async getLeaderboard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await new TeamModel().findAll();
    const groupMatches = await this.groupMatches(teams);
    const groupMatchesResolved: MatchScore[][] = await Promise.all(groupMatches);

    const data = LeaderBoardHelper.calculateStatistics(groupMatchesResolved);

    return { status: 'SUCCESSFUL', data };
  }
}
