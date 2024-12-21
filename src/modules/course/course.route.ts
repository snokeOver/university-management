import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import {
  assignFacultiesValidation,
  courseValidation,
  updateCourseValidation,
} from "./course.validation";
import {
  assignFacultiesWithCourse,
  createCourse,
  deleteSingleCourse,
  getAllCourses,
  getSingleCourse,
  removeFacultiesFromCourse,
  updateSingleCourse,
} from "./course.controller";

const courseRoute = express.Router();

courseRoute.post(
  "/create-course",
  validateRequest(courseValidation),
  createCourse
);

courseRoute.get("/", getAllCourses);

courseRoute.get("/:id", getSingleCourse);

courseRoute.delete("/:id", deleteSingleCourse);

courseRoute.put(
  "/assign-faculties/:id",
  validateRequest(assignFacultiesValidation),
  assignFacultiesWithCourse
);

courseRoute.delete(
  "/delete-faculties/:id",
  validateRequest(assignFacultiesValidation),
  removeFacultiesFromCourse
);

courseRoute.patch(
  "/:id",
  validateRequest(updateCourseValidation),
  updateSingleCourse
);

export default courseRoute;
