import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

export const validateRequest = (
  validation: AnyZodObject | ZodEffects<AnyZodObject>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validation.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
