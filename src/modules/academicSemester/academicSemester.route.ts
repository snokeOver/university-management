import express from "express";
import { createAcademicSemester } from "./academicSemester.controller";

import { academicSemesterValidation } from "./academicSemester.validation";
import { validateRequest } from "../../middlewares/validateData";

const academicSemesterRoute = express.Router();

academicSemesterRoute.post(
  "/create-academic-semester",
  validateRequest(academicSemesterValidation),
  createAcademicSemester
);

export default academicSemesterRoute;
