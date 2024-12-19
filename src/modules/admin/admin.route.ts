//Controller will only handle the routes with the help of express route and call the controller function

import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import {
  deleteSingleAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
} from "./admin.controller";
import { updateadminZodValidation } from "./admin.zod";

const adminRoute = express.Router();

adminRoute.get("/get-all-admins", getAllAdmins);
adminRoute.get("/:id", getSingleAdmin);
adminRoute.delete("/:id", deleteSingleAdmin);
adminRoute.patch(
  "/:id",
  validateRequest(updateadminZodValidation),
  updateSingleAdmin
);

export default adminRoute;
