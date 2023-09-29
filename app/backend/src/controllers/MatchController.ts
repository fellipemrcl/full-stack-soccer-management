import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private _matchService = new MatchService()) {}

  public async getAllMatches(_req: Request, res: Response) {
    try {
      const { data, status } = await this._matchService.getAllMatches();
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getMatchesByQuery(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const { data, status } = await this._matchService.getMatchesByQuery(
        inProgress as string,
      );
      res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public async endMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { data, status } = await this._matchService.endMatch(Number(id));
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
