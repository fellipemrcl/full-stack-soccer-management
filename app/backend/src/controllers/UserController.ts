import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private _userService = new UserService()) {}

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { data, status } = await this._userService.login(req.body);
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public async loginRole(req: Request, res: Response): Promise<Response> {
    try {
      const { data, status } = await this._userService.loginRole(req.body);
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
