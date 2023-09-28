import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatches;

  public async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return dbData;
  }
}
