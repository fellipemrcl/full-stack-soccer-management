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
}
