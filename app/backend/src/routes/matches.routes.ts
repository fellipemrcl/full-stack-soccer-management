import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress !== undefined) {
    matchController.getMatchesByQuery(req, res);
  } else {
    matchController.getAllMatches(req, res);
  }
});

matchRouter.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

matchRouter.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

matchRouter.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default matchRouter;
