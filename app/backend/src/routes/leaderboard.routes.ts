import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req: Request, res: Response) =>
  LeaderBoardController.getAllTeams(req, res));

export default leaderboardRouter;
