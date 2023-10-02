import { NewEntity } from '..';
import { IGoal, IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByQuery(inProgress: string): Promise<IMatch[]>;
  findById(id: number): Promise<IMatch | null>;
  updateMatch(id: IMatch['id'], goalsInfo?: IGoal): Promise<void | number>;
  createMatch(data: NewEntity<IMatch>): Promise<IMatch | null>;
}
