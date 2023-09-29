import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByQuery(inProgress: string): Promise<IMatch[]>;
  endMatch(id: IMatch['id']): Promise<void>;
}
