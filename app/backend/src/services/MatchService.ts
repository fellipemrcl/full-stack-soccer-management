import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

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

  public async updateMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this._matchModel.updateMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
