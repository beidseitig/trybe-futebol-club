import { Router } from 'express';
import LoginController from '../controllers/loginController';
import tokenValidation from '../middlewares/tokenMiddleware';

const router = Router();

router.post('/', LoginController.login);

router.use(tokenValidation);

router.get('/validate', LoginController.loginValidation);

export default router;
