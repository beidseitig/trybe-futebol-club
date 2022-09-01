import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/matchService';

export default class MatchController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const matches = await MatchService.getAll();
      return res.status(StatusCodes.OK).json(matches);
    } catch (err) {
      next(err);
    }
  }

  static async addMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const newMatch = await MatchService.addMatch(req.body);
      return res.status(StatusCodes.CREATED).json(newMatch);
    } catch (err) {
      next(err);
    }
  }

  static async updateMatch(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      await MatchService.updateMatch(Number(id));
      return res.status(StatusCodes.OK).json({ message: 'Match updated' });
    } catch (err) {
      next(err);
    }
  }

  static async matchGoals(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      await MatchService.matchGoals(Number(id), req.body);
      return res.status(StatusCodes.OK).json({ message: 'Match updated' });
    } catch (err) {
      next(err);
    }
  }
}
