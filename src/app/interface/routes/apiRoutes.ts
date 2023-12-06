import { Router, Request, Response } from 'express';
import verifyToken from "./../../middleware/verifyToken";
import { apiKeyRepository } from '../../domain/repositories/apiKeyRepository';
import { apiKeyUseCase } from '../../usecase/apiKey/apiKeyUseCase';
import { apiKeyController } from '../controllers/apiKeyControllers';


const router = Router();

const apikeyRepository = new apiKeyRepository();
const apikeyUseCase = new apiKeyUseCase(apikeyRepository);
const apikeyController = new apiKeyController(apikeyUseCase);

// Route for creating a new user
router.get("/api/create_api_key", verifyToken, apikeyController.createApiKey.bind(apikeyController));


export default router;
