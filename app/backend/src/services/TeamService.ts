import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(private _teamModel: ITeamModel = new TeamModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this._teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this._teamModel.findById(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
