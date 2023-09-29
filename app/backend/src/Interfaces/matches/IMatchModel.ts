import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByQuery(inProgress: string): Promise<IMatch[]>;
  findById(id: number): Promise<IMatch | null>;
  updateMatch(id: IMatch['id']): Promise<void>;
}
