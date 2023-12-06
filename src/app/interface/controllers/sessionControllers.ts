import { Request, Response } from "express";
import { SessionUseCase } from "../../usecase/auth/sessionUseCases";

export class SessionController {
    constructor(private sessionUseCase: SessionUseCase) { }

    async signIn(req: Request, res: Response) {

        try {
            const session = await this.sessionUseCase.createUserSessionHandler(req,res);
            return res.send(session);
          } catch (e: any) {
            console.log(e);
            return res.status(409).send(e.message);
          }
    }
}
