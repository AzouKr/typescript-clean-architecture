import { Request, Response } from "express";
import { CreateUserInput } from "../../domain/entites/userSchema";
import { UserService } from '../../usecase/auth/signupUsecases';
import { UserRepository } from '../../domain/repositories/userRepository';

export class UserController {
    constructor(private userService: UserService) { }

    async signUp(req: Request<{}, {}, CreateUserInput["body"]>,res: Response) {

        try {
            const user = await this.userService.signUpUser(req.body);
            return res.send(user);
          } catch (e: any) {
            console.log(e);
            return res.status(409).send(e.message);
          }
    }
}
