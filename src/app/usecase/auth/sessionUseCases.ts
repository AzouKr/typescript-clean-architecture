import { Request, Response } from "express";
import config from "config";
import { createRedisClient } from "../../../infrastructure/redis/createRedisClient";
import { signJwt } from "../../../infrastructure/jwt/jwt.utils";
import { UserRepository } from "../../domain/repositories/userRepository";
import { SessionRepository } from "../../domain/repositories/sessionRepository";
  
export class SessionUseCase{

  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository
    ) { }

  async createUserSessionHandler(req: Request, res: Response) {
    // Validate the user's password
    const user = await this.userRepository.validatePassword(req.body);
  
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
  
    // create a session
    const session = await this.sessionRepository.createSession(user._id, req.get("user-agent") || "");
  
    // create an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      config.get<string>("secret"),
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );
  
    // return access & refresh tokens
    // set a cookie for the jwt
    // res.cookie("accessToken", accessToken, {
    //   maxAge: 3.154e10, // 1 year
    //   httpOnly: true,
    //   domain: "localhost",
    //   path: "/",
    //   sameSite: "strict",
    // });

    // set the token in redis
    const redisClient =  await createRedisClient();
    await redisClient.set('accessToken', accessToken);
    await redisClient.disconnect();
    return res.send(accessToken);
  }
  
  async getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
  
    const sessions = await this.sessionRepository.findSessions({ user: userId, valid: true });
  
    return res.send(sessions);
  }
  
  async deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;
  
    await this.sessionRepository.updateSession({ _id: sessionId }, { valid: false });
  
    res.cookie("accessToken", "", {
      maxAge: 0,
    });
  
    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  }
  
}