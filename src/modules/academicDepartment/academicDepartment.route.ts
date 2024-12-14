import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
} from "./academicDepartment.validation";
import {
  createAcademicDepartment,
  getAAcademicDepartment,
  getAllAcademicDepartment,
  updateAAcademicDepartment,
} from "./academicDepartment.controller";

const academicDepartmentRoute = express.Router();

academicDepartmentRoute.post(
  "/create-academic-department",
  validateRequest(createAcademicDepartmentValidation),
  createAcademicDepartment
);

academicDepartmentRoute.get("/", getAllAcademicDepartment);

academicDepartmentRoute.get("/:id", getAAcademicDepartment);

academicDepartmentRoute.patch(
  "/:id",
  validateRequest(updateAcademicDepartmentValidation),
  updateAAcademicDepartment
);

export default academicDepartmentRoute;
