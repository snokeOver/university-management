//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";
import {
  createAdmin,
  createStudent,
  deleteSingleStudent,
} from "./user.controller";

import { studentZodValidation } from "../student/student.zod";
import { validateRequest } from "../../middlewares/validateData";
import { adminZodValidation } from "../admin/admin.zod";

const userRoute = express.Router();

userRoute.post(
  "/create-student",
  validateRequest(studentZodValidation),
  createStudent
);

userRoute.post(
  "/create-admin",
  validateRequest(adminZodValidation),
  createAdmin
);

userRoute.delete("/delete-student/:id", deleteSingleStudent);

export default userRoute;
