import { Express, Request, Response } from "express";
import UserService from "../services/user.service";
import MongooseUserRepository from "../repositories/user.mongooseRepository";
import logger from "../../infrastructure/logger/winston";
const jwt = require("jsonwebtoken");
import * as dotenv from "dotenv";
import authenticateToken from "../middlewares/verifyToken";
dotenv.config();

const userRepository = new MongooseUserRepository();
const userService = new UserService(userRepository);

function userRoutes(app: Express) {
  app.post("/api/user", async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await userService.registerUser({ name, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(errorMessage);
      res.status(400).json({ error: errorMessage });
    }
  });

  app.post("/api/user/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await userService.loginUser({ email, password });
      const userHeader = { email: user };
      const token = jwt.sign(userHeader, process.env.secret);
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json(user);
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(errorMessage);
      res.status(400).json({ error: errorMessage });
    }
  });

  app.get(
    "/api/user/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        logger.error(errorMessage);
        res.status(400).json({ error: errorMessage });
      }
    }
  );

  app.get(
    "/api/users",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        logger.error(errorMessage);
        res.status(400).json({ error: errorMessage });
      }
    }
  );

  app.put(
    "/api/user",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        const { name, email, password } = req.body;
        await userService.updateUser({ name, email, password });
        res.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        logger.error(errorMessage);
        res.status(400).json({ error: errorMessage });
      }
    }
  );

  app.delete(
    "/api/user/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        logger.error(errorMessage);
        res.status(400).json({ error: errorMessage });
      }
    }
  );

  app.get(
    "/healthcheck",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        res.status(200).json("Your are authorized to use this endpoint");
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        logger.error(errorMessage);
        res.status(400).json({ error: errorMessage });
      }
    }
  );
}

export default userRoutes;
