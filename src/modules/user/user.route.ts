//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";
import {
  createAdmin,
  createFaculty,
  createStudent,
  deleteSingleStudent,
} from "./user.controller";

import { studentZodValidation } from "../student/student.zod";
import { validateRequest } from "../../middlewares/validateData";
import { adminZodValidation } from "../admin/admin.zod";
import { facultyZodValidation } from "../faculty/faculty.zod";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const userRoute = express.Router();

userRoute.post(
  "/create-student",
  validateRequest(studentZodValidation),
  createStudent
);

userRoute.post(
  "/create-faculty",
  validateRequest(facultyZodValidation),
  createFaculty
);

userRoute.post(
  "/create-admin",
  auth(USER_ROLE.Admin),
  validateRequest(adminZodValidation),
  createAdmin
);

userRoute.delete("/delete-student/:id", deleteSingleStudent);

export default userRoute;
