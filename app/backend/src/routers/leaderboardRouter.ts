import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboardController';

const router = Router();

router.get('/home', LeaderBoardController.getLeaderboard);

export default router;
