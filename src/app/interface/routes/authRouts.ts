import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/authControllers';
import { UserService } from '../../usecase/auth/signupUsecases';
import { UserRepository } from '../../domain/repositories/userRepository';
import { SessionRepository } from '../../domain/repositories/sessionRepository';
import { SessionUseCase } from '../../usecase/auth/sessionUseCases';
import { SessionController } from '../controllers/sessionControllers';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const sessionRepository = new SessionRepository(userRepository);
const sessionService = new SessionUseCase(userRepository, sessionRepository);
const sessionController = new SessionController(sessionService);

// Route for creating a new user
router.post('/users', userController.signUp.bind(userController));

// Route for creating a new session
router.post('/session', sessionController.signIn.bind(sessionController));

export default router;
