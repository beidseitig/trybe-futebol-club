import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/loginService';

export default class LoginController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await LoginService.login({ email, password });
      res.status(StatusCodes.OK).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async loginValidation(req: Request, res: Response): Promise<Response> {
    const data = req.body.user;
    console.log(data);
    return res.status(StatusCodes.OK).json({ role: data });
  }
}
