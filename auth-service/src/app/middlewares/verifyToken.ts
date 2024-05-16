import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface UserPayload {
  email: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  var token = req.cookies.accessToken;
  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }

  try {
    jwt.verify(token, <string>process.env.secret, (err: any, decoded: any) => {
      if (err) {
        res.sendStatus(403); // Forbidden
        return;
      }

      const user = decoded as UserPayload;

      req.user = user;
      next();
    });
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

export default authenticateToken;
