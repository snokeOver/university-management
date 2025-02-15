import express from "express";
import {
  createAcademicSemester,
  getAAcademicSemester,
  getAllAcademicSemester,
  updateAAcademicSemester,
} from "./academicSemester.controller";

import {
  academicSemesterValidationCreate,
  academicSemesterValidationUpdate,
} from "./academicSemester.validation";
import { validateRequest } from "../../middlewares/validateData";
import { auth } from "../../middlewares/auth";

const academicSemesterRoute = express.Router();

academicSemesterRoute.post(
  "/create-academic-semester",
  validateRequest(academicSemesterValidationCreate),
  createAcademicSemester
);

academicSemesterRoute.get("/", auth("Admin"), getAllAcademicSemester);

academicSemesterRoute.get("/:id", getAAcademicSemester);

academicSemesterRoute.patch(
  "/:id",
  validateRequest(academicSemesterValidationUpdate),
  updateAAcademicSemester
);

export default academicSemesterRoute;
