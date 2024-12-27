import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (
  validation: AnyZodObject | ZodEffects<AnyZodObject>
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await validation.parseAsync(req.body);
    next();
  });
};

export const validateTokenRequest = (
  validation: AnyZodObject | ZodEffects<AnyZodObject>
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await validation.parseAsync(req.cookies);
    next();
  });
};
