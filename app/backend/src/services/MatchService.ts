import { NewEntity } from '../Interfaces';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IGoal, IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(private _matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this._matchModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getMatchesByQuery(
    inProgress: string,
  ): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this._matchModel.findByQuery(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateMatch(
    id: number,
    goalsInfo?: IGoal,
  ): Promise<ServiceResponse<{ message: string }>> {
    const match = await this._matchModel.updateMatch(id, goalsInfo);
    if (!match) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'No match found.' },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createMatch(
    data: NewEntity<IMatch>,
  ): Promise<ServiceResponse<IMatch>> {
    if (data.homeTeamId === data.awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: {
          message: 'It is not possible to create a match with two equal teams',
        },
      };
    }
    const newMatch = await this._matchModel.createMatch(data);
    if (!newMatch) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
    return { status: 'CREATED', data: newMatch };
  }
}
