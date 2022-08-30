import { Router } from 'express';
import LoginController from '../controllers/loginController';
import tokenValidation from '../middlewares/tokenMiddleware';

const router = Router();

router.post('/', LoginController.login);

router.use(tokenValidation);

router.get('/validate', (req, res) => LoginController.loginValidation(req, res));

export default router;
