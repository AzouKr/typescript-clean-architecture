import { Request, Response } from "express";
import { apiKeyUseCase } from "../../usecase/apiKey/apiKeyUseCase";

export class apiKeyController {
    constructor(private apikeyUseCase: apiKeyUseCase) { }

    async createApiKey(req: Request, res: Response) {

        try {
            const apiKey = await this.apikeyUseCase.createApiKey(req, res);
            return res.send(apiKey);
          } catch (e: any) {
            console.log(e);
            return res.status(409).send(e.message);
          }
    }
}
