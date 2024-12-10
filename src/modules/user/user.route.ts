//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";
import { createStudent } from "./user.controller";

import { studentZodValidation } from "../student/student.zod";
import { validateRequest } from "../../middlewares/validateData";

const userRoute = express.Router();

userRoute.post(
  "/create-student",
  validateRequest(studentZodValidation),
  createStudent
);

export default userRoute;
