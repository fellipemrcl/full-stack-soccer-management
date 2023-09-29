import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByQuery(inProgress: string): Promise<IMatch[]>;
  updateMatch(id: IMatch['id']): Promise<void>;
}
