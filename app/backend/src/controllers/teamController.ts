import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/teamService';

export default class TeamController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const teams = await TeamService.getAll();
      return res.status(StatusCodes.OK).json(teams);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const team = await TeamService.getById(req.params.id);

      if (!team) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Team not found' });

      return res.status(StatusCodes.OK).json(team);
    } catch (err) {
      next(err);
    }
  }
}
