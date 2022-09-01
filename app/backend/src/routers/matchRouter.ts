import { Router } from 'express';
import MatchController from '../controllers/matchController';
import tokenValidation from '../middlewares/tokenMiddleware';

const router = Router();

router.get('/', MatchController.getAll);

router.post('/', tokenValidation, MatchController.addMatch);

router.patch('/:id', MatchController.matchGoals);

router.patch('/:id/finish', MatchController.updateMatch);

export default router;
