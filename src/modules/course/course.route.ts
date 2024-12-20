import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import { courseValidation } from "./course.validation";
import {
  createCourse,
  deleteSingleCourse,
  getAllCourses,
  getSingleCourse,
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

courseRoute.patch(
  "/:id",
  validateRequest(courseValidation),
  updateSingleCourse
);

export default courseRoute;
