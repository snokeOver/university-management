import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import {
  semisterRegistrationValidation,
  updateSemisterRegistrationValidation,
} from "./semesterRegistration.validation";
import {
  createSemisterRegistration,
  getAllSemisterRegistration,
  getSingleSemisterRegistration,
  updateSingleSemisterRegistration,
} from "./semesterRegistration.controller";

const semesterRegistrationRoute = express.Router();

semesterRegistrationRoute.post(
  "/create-semister-registration",
  validateRequest(semisterRegistrationValidation),
  createSemisterRegistration
);

semesterRegistrationRoute.get("/", getAllSemisterRegistration);

semesterRegistrationRoute.get("/:id", getSingleSemisterRegistration);

semesterRegistrationRoute.patch(
  "/:id",
  validateRequest(updateSemisterRegistrationValidation),
  updateSingleSemisterRegistration
);

export default semesterRegistrationRoute;
