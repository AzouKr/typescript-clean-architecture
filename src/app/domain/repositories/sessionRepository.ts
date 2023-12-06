import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../entites/sessionEntities";
import { verifyJwt, signJwt } from "../../../infrastructure/jwt/jwt.utils";
import { UserRepository } from "./userRepository";

export class SessionRepository {

    constructor(private userRepository: UserRepository) {
        this.userRepository = userRepository
     }

    async createSession(userId: string, userAgent: string) {
        const session = await SessionModel.create({ user: userId, userAgent });
      
        return session.toJSON();
    }
      
    async findSessions(query: FilterQuery<SessionDocument>) {
        return SessionModel.find(query).lean();
    }
      
    async updateSession(
        query: FilterQuery<SessionDocument>,
        update: UpdateQuery<SessionDocument>
      ) {
        return SessionModel.updateOne(query, update);
    }
      
    async reIssueAccessToken({
        refreshToken,
      }: {
        refreshToken: string;
      }) {
        const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");
      
        if (!decoded || !get(decoded, "session")) return false;
      
        const session = await SessionModel.findById(get(decoded, "session"));
      
        if (!session || !session.valid) return false;
      
        const user = await this.userRepository.findUser({ _id: session.user });
      
        if (!user) return false;
      
        const accessToken = signJwt(
          { ...user, session: session._id },
          "accessTokenPrivateKey",
          { expiresIn: process.env.accessTokenTtl } // 15 minutes
        );
      
        return accessToken;
    }
}
