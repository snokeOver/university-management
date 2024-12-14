import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import { academicFacultyValidation } from "./academicFaculty.validation";
import {
  createAcademicFaculty,
  getAAcademicFaculty,
  getAllAcademicFaculty,
  updateAAcademicFaculty,
} from "./academicFaculty.controller";

const academicFacultyRoute = express.Router();

academicFacultyRoute.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidation),
  createAcademicFaculty
);

academicFacultyRoute.get("/", getAllAcademicFaculty);

academicFacultyRoute.get("/:id", getAAcademicFaculty);

academicFacultyRoute.patch(
  "/:id",
  validateRequest(academicFacultyValidation),
  updateAAcademicFaculty
);

export default academicFacultyRoute;
