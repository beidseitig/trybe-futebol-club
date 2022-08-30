import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const leaderboard = await LeaderboardService.getLeaderboard();
      res.status(StatusCodes.OK).json(leaderboard);
    } catch (err) {
      next(err);
    }
  }
}
