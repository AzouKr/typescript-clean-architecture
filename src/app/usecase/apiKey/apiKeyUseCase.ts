import { Request, Response } from "express";
import {ApiKeyDocument } from "../../domain/entites/apiKeyEntities";
import { apiKeyRepository } from "../../domain/repositories/apiKeyRepository";

export class apiKeyUseCase {
    constructor(private apiKeyRepository: apiKeyRepository) { }

    async createApiKey(
        req: Request<{}, {},{}>,
        res: Response
      ){
        try {
            const userId = res.locals.user._id;
            const apiKey = await this.apiKeyRepository.createApiKey(userId);
            return res.send(apiKey);
          } catch (e: any) {
            return res.status(409).send(e.message);
          }
    }
}