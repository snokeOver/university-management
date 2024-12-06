//Controller will only handle the routes with the help of express route and call the controller function

import express, { NextFunction, Request, Response } from "express";
import { createStudent } from "./user.controller";
import { AnyZodObject } from "zod";
import { studentZodValidation } from "../student/student.zod";

const userRoute = express.Router();

const validateRequest = (validation: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validation.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

userRoute.post(
  "/create-student",
  validateRequest(studentZodValidation),
  createStudent
);

export default userRoute;
