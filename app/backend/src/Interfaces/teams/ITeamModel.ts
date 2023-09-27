import { ID } from '..';
import { ITeam } from './ITeam';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(id: ID): Promise<ITeam | null>;
}
