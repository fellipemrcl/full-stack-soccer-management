import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private _teamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    try {
      const { data, status } = await this._teamService.getAllTeams();
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { data, status } = await this._teamService.getTeamById(Number(id));
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
