import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import {
  offeredCourseValidation,
  updateofferedCourseValidation,
} from "./offeredCourse.validation";
import {
  createOfferedCouse,
  getAllOfferedCouse,
  getSingleOfferedCouse,
  updateSingleOfferedCouse,
} from "./offeredCourse.controller";

const offeredCourseRoute = express.Router();

offeredCourseRoute.post(
  "/create-offered-course",
  validateRequest(offeredCourseValidation),
  createOfferedCouse
);

offeredCourseRoute.get("/", getAllOfferedCouse);

offeredCourseRoute.get("/:id", getSingleOfferedCouse);

offeredCourseRoute.patch(
  "/:id",
  validateRequest(updateofferedCourseValidation),
  updateSingleOfferedCouse
);

export default offeredCourseRoute;
