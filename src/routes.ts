import { Router } from 'express';
import UserController from './controllers/user.controller';
import { checkIfUserExists } from './middlewares/checkIfUserExists';
import { validateUserData } from './middlewares/validateUserData';

const router = Router();

router.get('/users', UserController.index);
router.post('/users', validateUserData, UserController.store);
router.put('/users/:id', checkIfUserExists, UserController.update);
router.delete('/users/:id', checkIfUserExists, UserController.delete);

export default router;
