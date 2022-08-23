import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/loginService';

export default class LoginController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await LoginService.login(email, password);
      res.status(StatusCodes.OK).json({ token: result });
      console.log(StatusCodes.OK);
    } catch (err) {
      next(err);
    }
  }

  static async loginValidation(req: Request, res: Response): Promise<Response> {
    const { user } = req.body;
    return res.status(StatusCodes.OK).json({ role: user.role });
  }
}
