import { NewEntity } from '../Interfaces';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IGoal, IMatch } from '../Interfaces/matches/IMatch';
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

  public async findByQuery(inProgress: string): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: inProgress === 'true' },
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

  public async findById(id: number): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = dbData;
    return {
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    };
  }

  public async updateMatch(
    id: number,
    goalsInfo?: IGoal,
  ): Promise<void | number> {
    const match = await this.findById(id);
    if (!match) return 0;

    const updateData: Partial<IMatch> = {};

    if (
      goalsInfo?.homeTeamGoals !== undefined
      || goalsInfo?.awayTeamGoals !== undefined
    ) {
      updateData.homeTeamGoals = goalsInfo?.homeTeamGoals;
      updateData.awayTeamGoals = goalsInfo?.awayTeamGoals;
    } else {
      updateData.inProgress = false;
    }

    await this.model.update(updateData, { where: { id } });

    return 1;
  }

  public async createMatch(data: NewEntity<IMatch>): Promise<IMatch> {
    const newMatch = { ...data, inProgress: true };
    const dbData = await this.model.create(newMatch);

    const {
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    }: IMatch = dbData;
    return {
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    };
  }
}
