import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import logger from "../../infrastructure/logger/winston";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(errorMessage);
      res.status(400).json({ error: errorMessage });
    }
  };

export default validate;
