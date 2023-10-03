import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  static async getAllTeams(_req: Request, res: Response) {
    try {
      const { data, status } = await LeaderBoardService.getLeaderboard();
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
