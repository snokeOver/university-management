//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";
import {
  deleteAStudent,
  getAllStudents,
  getAStudent,
  updateAStudent,
} from "./student.controller";
import { validateRequest } from "../../middlewares/validateData";
import { updateStudentZodValidation } from "./student.zod";

const studentRoute = express.Router();

studentRoute.get("/get-all-students", getAllStudents);
studentRoute.get("/:id", getAStudent);
studentRoute.delete("/:id", deleteAStudent);
studentRoute.patch(
  "/:id",
  validateRequest(updateStudentZodValidation),
  updateAStudent
);

export default studentRoute;
