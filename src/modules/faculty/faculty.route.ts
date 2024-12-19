//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import {
  deleteSingleFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
} from "./faculty.controller";
import { updatefacultyZodValidation } from "./faculty.zod";

const facultyRoute = express.Router();

facultyRoute.get("/get-all-faculties", getAllFaculties);
facultyRoute.get("/:id", getSingleFaculty);
facultyRoute.delete("/:id", deleteSingleFaculty);
facultyRoute.patch(
  "/:id",
  validateRequest(updatefacultyZodValidation),
  updateSingleFaculty
);

export default facultyRoute;
